/* Villa & Vow planner backend — Cloudflare Worker, zero dependencies.
   Deploy by pasting this whole file into the Cloudflare dashboard's
   Worker editor (Workers & Pages → Create → paste → Deploy). No CLI,
   no login flow, no npm packages needed. */

const ALLOWED_EMAILS = ['yuvalsh99@gmail.com', 'yohan-levy@hotmail.fr'];
const FIREBASE_PROJECT_ID = 'villa-vow';

/* Double-check this is still a current model name at
   https://ai.google.dev/gemini-api/docs/models before deploying. */
const MODEL_NAME = 'gemini-2.0-flash';

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
