/* Villa & Vow planner backend, Cloudflare Worker, zero dependencies.
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

/* Verifies a Firebase ID token using only the standard Web Crypto API ,
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
   protection (notably Safari's Intelligent Tracking Prevention on iOS) ,
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
     tracked share-link shape, /pin/<id>/sent/?invite_code=...&sender=...
    , on whichever regional subdomain (fr.pinterest.com, etc.) the visitor
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

/* YouTube and TikTok both run a free, public oEmbed endpoint that needs no
   API key or app registration, unlike Instagram or Google Drive, which
   require a registered app (and in practice a paid setup) to get a real
   thumbnail, so those aren't supported here. */
async function handleResolveEmbed(provider, rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return json({ error: 'Invalid URL' }, 400);
  }
  const host = url.hostname.toLowerCase();
  const browserHeaders = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
    'Accept': 'application/json',
  };
  let oembedEndpoint;
  if (provider === 'youtube') {
    if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(host)) {
      return json({ error: 'Not a YouTube link' }, 400);
    }
    oembedEndpoint = 'https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(url.toString());
  } else if (provider === 'tiktok') {
    if (!['tiktok.com', 'www.tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com'].includes(host)) {
      return json({ error: 'Not a TikTok link' }, 400);
    }
    let canonicalUrl = url.toString();
    if (host === 'vm.tiktok.com' || host === 'vt.tiktok.com') {
      try {
        const redirectResp = await fetch(canonicalUrl, { redirect: 'follow', method: 'GET', headers: browserHeaders });
        canonicalUrl = redirectResp.url;
      } catch (err) {
        return json({ error: 'Could not resolve TikTok short link', debug: String(err && err.message || err) }, 502);
      }
    }
    oembedEndpoint = 'https://www.tiktok.com/oembed?url=' + encodeURIComponent(canonicalUrl);
  } else {
    return json({ error: 'Unsupported provider' }, 400);
  }
  try {
    const resp = await fetch(oembedEndpoint, { headers: browserHeaders });
    const raw = await resp.text();
    if (!resp.ok) {
      return json({ error: 'oEmbed request failed', status: resp.status, bodySnippet: raw.slice(0, 300) }, 502);
    }
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return json({ error: 'oEmbed response was not JSON', bodySnippet: raw.slice(0, 300) }, 502);
    }
    if (!data.thumbnail_url) {
      return json({ error: 'oEmbed response had no thumbnail_url', data }, 502);
    }
    return json({
      url: url.toString(),
      title: data.title || '',
      thumbnailUrl: data.thumbnail_url,
    });
  } catch (err) {
    return json({ error: 'Could not fetch ' + provider + ' preview', debug: String(err && err.message || err) }, 502);
  }
}

/* Pinterest's public embed widget (pinit.js) only recognizes a whole board,
   a profile, or a single pin, there is no "section widget"; handing it a
   board-section URL just makes it silently resolve to the section's parent
   board, showing that board's general pins instead of the section's own.
   This works around that entirely by not using Pinterest's widget for
   sections at all: fetch the section's page HTML directly, pull out
   whatever /pin/<id>/ links appear in the raw markup, and resolve each
   one's thumbnail the same way an individual pin already is elsewhere in
   this file. Pinterest heavily client-renders its own site, so this only
   finds pins present in the initial HTML response, which can vary by
   User-Agent and change without notice on Pinterest's side. Best-effort,
   not guaranteed. */
async function handleResolveSection(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return json({ error: 'Invalid URL' }, 400);
  }
  const host = url.hostname.toLowerCase();
  if (host !== 'pinterest.com' && !host.endsWith('.pinterest.com')) {
    return json({ error: 'Not a Pinterest link' }, 400);
  }

  let html = null;
  let lastStatus = null;
  for (const userAgent of LINK_PREVIEW_USER_AGENTS) {
    let result;
    try {
      result = await fetchHtml(url, userAgent);
    } catch (err) {
      return json({ error: 'Could not fetch that section', debug: String(err && err.message || err) }, 502);
    }
    if (!result.ok) { lastStatus = result.status; continue; }
    html = result.html;
    break;
  }
  if (!html) {
    return json({ error: 'Could not fetch that section', status: lastStatus }, 502);
  }

  const ids = [];
  const seen = new Set();
  const pinIdRe = /\/pin\/(\d{6,})\//g;
  let match;
  while ((match = pinIdRe.exec(html)) && ids.length < 18) {
    if (!seen.has(match[1])) { seen.add(match[1]); ids.push(match[1]); }
  }
  if (!ids.length) {
    return json({
      error: "No pins found on that section's page. Pinterest may be serving a stripped-down page to this request, or the section/board may not be public.",
      bodySnippet: html.slice(0, 300),
    }, 404);
  }

  const browserHeaders = {
    'User-Agent': LINK_PREVIEW_USER_AGENTS[0],
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  };
  const settled = await Promise.allSettled(ids.map(async (id) => {
    const pinUrl = 'https://www.pinterest.com/pin/' + id + '/';
    const resp = await fetch('https://www.pinterest.com/oembed.json?url=' + encodeURIComponent(pinUrl), { headers: browserHeaders });
    if (!resp.ok) throw new Error('oEmbed failed for ' + id);
    const data = await resp.json();
    if (!data.thumbnail_url) throw new Error('No thumbnail for ' + id);
    return { id, url: pinUrl, title: data.title || '', thumbnailUrl: data.thumbnail_url };
  }));
  const pins = settled.filter((r) => r.status === 'fulfilled').map((r) => r.value);
  if (!pins.length) {
    return json({ error: 'Found pin links in that section but could not resolve any of their thumbnails.' }, 502);
  }
  return json({ pins, sourceUrl: url.toString() });
}

/* Generic Open Graph image lookup for the Wedding d.i.y tab. Most sites set
   og:image (or twitter:image) for social-share previews, so fetching the
   page HTML server-side and reading that tag gives a real thumbnail for
   almost any link, no per-site API needed. Only reads up to ~60KB and
   stops at </head> since those tags are always near the top, so this
   can't be used to pull down a whole arbitrary page. */
/* Some sites block generic scraping but still special-case the crawler
   user-agents used by Facebook/Twitter/Slack link previews, since they
   want their links to look good when shared. Try a normal browser first,
   then fall back to those, since they succeed on a lot of shops/blogs
   that a plain fetch gets blocked or served a stub page on. */
const LINK_PREVIEW_USER_AGENTS = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  'Twitterbot/1.0',
];

async function fetchHtml(url, userAgent) {
  const resp = await fetch(url.toString(), {
    redirect: 'follow',
    method: 'GET',
    headers: {
      'User-Agent': userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });
  if (!resp.ok) return { ok: false, status: resp.status };
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let text = '';
  while (text.length < 250000) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }
  try { reader.cancel(); } catch {}
  return { ok: true, html: text };
}

function extractPreview(html, baseUrl) {
  function metaContent(prop) {
    const escaped = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let m = html.match(new RegExp('<meta[^>]+(?:property|name|itemprop)=["\']' + escaped + '["\'][^>]+content=["\']([^"\']+)["\']', 'i'));
    if (!m) m = html.match(new RegExp('<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name|itemprop)=["\']' + escaped + '["\']', 'i'));
    return m ? m[1] : null;
  }
  let image = metaContent('og:image') || metaContent('og:image:secure_url') || metaContent('twitter:image') || metaContent('twitter:image:src') || metaContent('image');
  if (!image) {
    const linkImg = html.match(/<link[^>]+rel=["\']image_src["\'][^>]+href=["\']([^"\']+)["\']/i);
    if (linkImg) image = linkImg[1];
  }
  if (!image) {
    /* Last resort: first reasonably-sized <img> in the page, skipping
       obvious tracking pixels, icons and inline data URIs. */
    const imgTags = html.match(/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/gi) || [];
    for (const tag of imgTags) {
      const srcMatch = tag.match(/src=["\']([^"\']+)["\']/i);
      if (!srcMatch) continue;
      const src = srcMatch[1];
      if (!src || src.startsWith('data:')) continue;
      if (/\b(1x1|pixel|spacer|blank|tracking|icon|logo|sprite)\b/i.test(src)) continue;
      image = src;
      break;
    }
  }
  const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = metaContent('og:title') || (titleTag ? titleTag[1] : null);
  if (!image) return null;
  let absoluteImage;
  try {
    absoluteImage = new URL(image, baseUrl).toString();
  } catch {
    absoluteImage = image;
  }
  return { title: title ? title.trim() : '', thumbnailUrl: absoluteImage };
}

/* Crude tag-stripping to get a rough plain-text version of a page, for
   feeding a venue's own brochure/listing page into the same keyword
   auto-fill used for pasted PDF/email text. No real HTML parser in a
   Worker, so this is good enough for pulling a price or guest count out
   of body copy, not meant to reproduce the page's layout or reading
   order perfectly. Capped at 20,000 characters, plenty for this. */
function htmlToRoughText(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(br|p|div|li|h[1-6]|tr)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/gi, '"')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();
  return text.slice(0, 20000);
}
async function handleResolvePageText(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return json({ error: 'Invalid URL' }, 400);
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return json({ error: 'Only http(s) links are supported' }, 400);
  }
  let lastStatus = null;
  for (const userAgent of LINK_PREVIEW_USER_AGENTS) {
    let result;
    try {
      result = await fetchHtml(url, userAgent);
    } catch (err) {
      return json({ error: 'Could not fetch that page', debug: String(err && err.message || err) }, 502);
    }
    if (!result.ok) {
      lastStatus = result.status;
      continue;
    }
    const text = htmlToRoughText(result.html);
    if (text) {
      const titleTag = result.html.match(/<title[^>]*>([^<]+)<\/title>/i);
      return json({ url: url.toString(), title: titleTag ? titleTag[1].trim() : '', text });
    }
  }
  if (lastStatus) return json({ error: 'Could not fetch that page', status: lastStatus }, 502);
  return json({ error: 'No readable text found on that page' }, 404);
}

async function handleResolveLinkPreview(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return json({ error: 'Invalid URL' }, 400);
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return json({ error: 'Only http(s) links are supported' }, 400);
  }
  let lastStatus = null;
  for (const userAgent of LINK_PREVIEW_USER_AGENTS) {
    let result;
    try {
      result = await fetchHtml(url, userAgent);
    } catch (err) {
      return json({ error: 'Could not fetch that page', debug: String(err && err.message || err) }, 502);
    }
    if (!result.ok) {
      lastStatus = result.status;
      continue;
    }
    const preview = extractPreview(result.html, url);
    if (preview) {
      return json({ url: url.toString(), title: preview.title, thumbnailUrl: preview.thumbnailUrl });
    }
  }
  if (lastStatus) return json({ error: 'Could not fetch that page', status: lastStatus }, 502);
  return json({ error: 'No preview image found on that page' }, 404);
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
    if (body && body.action === 'resolveEmbed') {
      return handleResolveEmbed(body.provider, body.url);
    }
    if (body && body.action === 'resolveSection') {
      return handleResolveSection(body.url);
    }
    if (body && body.action === 'resolveLinkPreview') {
      return handleResolveLinkPreview(body.url);
    }
    if (body && body.action === 'resolvePageText') {
      return handleResolvePageText(body.url);
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
