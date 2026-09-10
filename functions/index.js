const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const geminiApiKey = defineSecret('GEMINI_API_KEY');

/* Mirrors the allowlist in firestore.rules — only the two wedding accounts
   may use the planner, so a stray signed-in account can't burn API quota. */
const ALLOWED_EMAILS = ['yuvalsh99@gmail.com', 'yohan-levy@hotmail.fr'];

/* Double-check this is still a current, free-tier-eligible model name at
   https://ai.google.dev/gemini-api/docs/models before deploying — Google
   updates these from time to time. */
const MODEL_NAME = 'gemini-2.0-flash';

exports.askPlanner = onCall({ secrets: [geminiApiKey], cors: true }, async (request) => {
  const email = request.auth && request.auth.token && request.auth.token.email;
  if (!email || !ALLOWED_EMAILS.includes(email)) {
    throw new HttpsError('permission-denied', 'Sign in with an authorized account to use the planner.');
  }

  const messages = request.data && request.data.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new HttpsError('invalid-argument', 'messages array is required.');
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey.value());
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  /* Gemini uses role "model" instead of "assistant"; everything else maps
     straight across. */
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  let result;
  try {
    result = await model.generateContent({ contents });
  } catch (err) {
    console.error('Gemini API error:', err);
    throw new HttpsError('internal', 'The planner assistant could not reach the model right now.');
  }

  const text = result.response.text();
  return { text };
});
