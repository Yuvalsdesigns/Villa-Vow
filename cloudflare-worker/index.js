/* Villa & Vow planner backend — Cloudflare Worker, zero dependencies.
   Deploy by pasting this whole file into the Cloudflare dashboard's
   Worker editor (Workers & Pages → Create → paste → Deploy). No CLI,
   no login flow, no npm packages needed. */

const ALLOWED_EMAILS = ['yuvalsh99@gmail.com', 'yohan-levy@hotmail.fr'];
const FIREBASE_PROJECT_ID = 'villa-vow';

/* Double-check this is still a current model name at
   https://ai.google.dev/gemini-api/docs/models before deploying. */
const MODEL_NAME = 'gemini-3.6-flash';

/* Only this origin may call the worker from a browser. */
const ALLOWED_ORIGIN = 'https://yuvalsdesigns.github.io';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

function base64UrlToUint8Array(base64Url) {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  const binary = atob(base64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlToJson(base64Url) {
  return JSON.parse(new TextDecoder().decode(base64UrlToUint8Array(base64Url)));
}

let cachedKeys = null;
let cachedKeysExpiry = 0;
async function getGoogleJWKS() {
  if (cachedKeys && Date.now() < cachedKeysExpiry) return cachedKeys;
  const resp = await fetch(
    'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
  );
  const data = await resp.json();
  cachedKeys = data.keys;
  cachedKeysExpiry = Date.now() + 3600 * 1000;
  return cachedKeys;
}

/* Verifies a Firebase ID token using only the standard Web Crypto API —
   no external JWT library needed. This is what lets the worker trust
   who's calling it without being a Firebase product itself. */
async function verifyFirebaseIdToken(token) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Malformed token');
  const [headerB64, payloadB64, sigB64] = parts;
  const header = base64UrlToJson(headerB64);
  const payload = base64UrlToJson(payloadB64);

  if (header.alg !== 'RS256') throw new Error('Unexpected alg');
  const now = Math.floor(Date.now() / 1000);
  if (!payload.exp || payload.exp < now) throw new Error('Token expired');
  if (payload.iss !== `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`) throw new Error('Bad issuer');
  if (payload.aud !== FIREBASE_PROJECT_ID) throw new Error('Bad audience');

  const keys = await getGoogleJWKS();
  const jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) throw new Error('Signing key not found');

  const cryptoKey = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );
  const signedData = new TextEncoder().encode(headerB64 + '.' + payloadB64);
  const signature = base64UrlToUint8Array(sigB64);
  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', cryptoKey, signature, signedData);
  if (!valid) throw new Error('Invalid signature');

  return payload;
}

/* Pinterest's own embed widget (pinit.js) is a well-known third-party
   tracker and is routinely blocked by ad blockers and browser tracking
   protection (notably Safari's Intelligent Tracking Prevention on iOS) —
   which is why pins could silently fail to show a picture on some
   devices/browsers even when added correctly. Fetching the pin's oEmbed
   data server-side sidesteps that entirely: this Worker (not the user's
   browser) resolves the pin.it redirect if needed and asks Pinterest's
   oEmbed endpoint for a real thumbnail image URL, which the page then
   renders as a plain <img>, no third-party script required. Restricted
   to Pinterest hosts so this can't be used as an open URL-follower. */
async function handleResolvePin(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return json({ error: 'Invalid URL' }, 400);
  }
  const host = url.hostname.toLowerCase();
  const isPinit = host === 'pin.it' || host === 'www.pin.it';
  const isPinterest = host === 'pinterest.com' || host.endsWith('.pinterest.com');
  if (!isPinit && !isPinterest) {
    return json({ error: 'Not a Pinterest link' }, 400);
  }
  /* Pinterest actively distinguishes bot/server traffic from real
     browsers and can respond with a login-wall page instead of the real
     redirect/JSON if the request doesn't look like one, so both fetches
     below send a realistic browser User-Agent and Accept header. */
  const browserHeaders = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  };
  let canonicalUrl = url.toString();
  if (isPinit) {
    try {
      const redirectResp = await fetch(canonicalUrl, { redirect: 'follow', method: 'GET', headers: browserHeaders });
      canonicalUrl = redirectResp.url;
    } catch (err) {
      return json({ error: 'Could not resolve pin.it link', debug: String(err && err.message || err) }, 502);
    }
  }
  /* A resolved pin.it link (and some copied share links) lands on the
     tracked share-link shape — /pin/<id>/sent/?invite_code=...&sender=...
     — on whichever regional subdomain (fr.pinterest.com, etc.) the visitor
     who shared it was on. Pinterest's oEmbed endpoint rejects that shape
     outright ("Url was not found"); it only recognizes the bare canonical
     pin URL, so normalize down to just the numeric pin ID before asking. */
  const pinIdMatch = canonicalUrl.match(/\/pin\/(\d+)/);
  if (pinIdMatch) {
    canonicalUrl = 'https://www.pinterest.com/pin/' + pinIdMatch[1] + '/';
  }
  try {
    const oembedResp = await fetch(
      'https://www.pinterest.com/oembed.json?url=' + encodeURIComponent(canonicalUrl),
      { headers: browserHeaders }
    );
    const raw = await oembedResp.text();
    if (!oembedResp.ok) {
      return json({ error: 'oEmbed request failed', status: oembedResp.status, canonicalUrl, bodySnippet: raw.slice(0, 300) }, 502);
    }
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return json({ error: 'oEmbed response was not JSON (likely blocked/login-walled)', canonicalUrl, bodySnippet: raw.slice(0, 300) }, 502);
    }
    if (!data.thumbnail_url) {
      return json({ error: 'oEmbed response had no thumbnail_url', canonicalUrl, data }, 502);
    }
    return json({
      url: canonicalUrl,
      title: data.title || '',
      thumbnailUrl: data.thumbnail_url,
    });
  } catch (err) {
    return json({ error: 'Could not fetch Pinterest preview', url: canonicalUrl, debug: String(err && err.message || err) }, 502);
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (!token) return json({ error: 'Missing auth token' }, 401);

    let payload;
    try {
      payload = await verifyFirebaseIdToken(token);
    } catch (err) {
      return json({ error: 'Invalid or expired token' }, 401);
    }

    const email = payload.email;
    if (!email || !ALLOWED_EMAILS.includes(email)) {
      return json({ error: 'Not authorized' }, 403);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400);
    }

    if (body && body.action === 'resolvePin') {
      return handleResolvePin(body.url);
    }

    const messages = body && body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: 'messages array is required' }, 400);
    }

    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    if (!env.GEMINI_API_KEY) {
      return json({ error: 'The planner assistant could not reach the model right now.', debug: 'GEMINI_API_KEY is not set on this Worker. Bindings this Worker actually sees: [' + Object.keys(env).join(', ') + ']' }, 502);
    }
    /* Secrets Store bindings are objects with a .get() method rather than
       plain strings, unlike classic Worker secrets. Support both. */
    const geminiApiKey = typeof env.GEMINI_API_KEY.get === 'function'
      ? await env.GEMINI_API_KEY.get()
      : env.GEMINI_API_KEY;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${geminiApiKey}`;
    let geminiData;
    try {
      const r = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });
      geminiData = await r.json();
      if (!r.ok) throw new Error(JSON.stringify(geminiData));
    } catch (err) {
      console.error('Gemini API error:', err);
      return json({ error: 'The planner assistant could not reach the model right now.', debug: String(err && err.message || err) }, 502);
    }

    const text =
      (geminiData.candidates &&
        geminiData.candidates[0] &&
        geminiData.candidates[0].content &&
        geminiData.candidates[0].content.parts &&
        geminiData.candidates[0].content.parts.map((p) => p.text).join('')) ||
      '';
    return json({ text });
  },
};
