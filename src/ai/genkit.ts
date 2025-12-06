import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  // By default, Genkit uses the gemini-2.5-pro model.
  // You can specify a different model, for example:
  // model: 'googleai/gemini-1.0-pro-001',
});
