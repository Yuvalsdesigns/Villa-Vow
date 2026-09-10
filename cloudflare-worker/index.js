import { jwtVerify, createRemoteJWKSet } from 'jose';

/* Mirrors the allowlist in firestore.rules — only the two wedding accounts
   may use the planner, so a stray signed-in account can't burn API quota. */
const ALLOWED_EMAILS = ['yuvalsh99@gmail.com', 'yohan-levy@hotmail.fr'];
const FIREBASE_PROJECT_ID = 'villa-vow';

/* Double-check this is still a current model name at
   https://ai.google.dev/gemini-api/docs/models before deploying. */
const MODEL_NAME = 'gemini-2.0-flash';

/* Only this origin may call the worker from a browser. */
const ALLOWED_ORIGIN = 'https://yuvalsdesigns.github.io';

const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
);

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

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    /* Verify the Firebase ID token the client sends, the same identity
       check Firebase's own callable functions do automatically — but this
       worker isn't a Firebase product, so it verifies the token itself
       against Google's public keys rather than trusting the caller. */
    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (!token) return json({ error: 'Missing auth token' }, 401);

    let email;
    try {
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
        audience: FIREBASE_PROJECT_ID,
      });
      email = payload.email;
    } catch (err) {
      return json({ error: 'Invalid or expired token' }, 401);
    }

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

    /* Gemini uses role "model" instead of "assistant"; everything else
       maps straight across. */
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${env.GEMINI_API_KEY}`;
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
      return json({ error: 'The planner assistant could not reach the model right now.' }, 502);
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
