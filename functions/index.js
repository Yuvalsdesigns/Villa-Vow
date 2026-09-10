const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const Anthropic = require('@anthropic-ai/sdk');

const anthropicApiKey = defineSecret('ANTHROPIC_API_KEY');

/* Mirrors the allowlist in firestore.rules — only the two wedding accounts
   may use the planner, so a stray signed-in account can't burn API credits. */
const ALLOWED_EMAILS = ['yuvalsh99@gmail.com', 'yohan-levy@hotmail.fr'];

exports.askPlanner = onCall({ secrets: [anthropicApiKey], cors: true }, async (request) => {
  const email = request.auth && request.auth.token && request.auth.token.email;
  if (!email || !ALLOWED_EMAILS.includes(email)) {
    throw new HttpsError('permission-denied', 'Sign in with an authorized account to use the planner.');
  }

  const messages = request.data && request.data.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new HttpsError('invalid-argument', 'messages array is required.');
  }

  const client = new Anthropic({ apiKey: anthropicApiKey.value() });
  let response;
  try {
    response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });
  } catch (err) {
    console.error('Anthropic API error:', err);
    throw new HttpsError('internal', 'The planner assistant could not reach the model right now.');
  }

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');

  return { text };
});
