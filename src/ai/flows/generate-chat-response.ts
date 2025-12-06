'use server';
/**
 * @fileOverview A flow for generating chat responses.
 *
 * - generateChatResponse - A function that generates a response to a conversation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { AI_PERSONALITIES } from '@/lib/data';

const ChatHistorySchema = z.array(
  z.object({
    role: z.enum(['user', 'ai']),
    content: z.string(),
  })
);

const GenerateChatResponseInputSchema = z.object({
  history: ChatHistorySchema,
  personalityId: z.string().optional(),
  answerLength: z.enum(['short', 'long']).optional(),
});


export async function generateChatResponse(
  input: z.infer<typeof GenerateChatResponseInputSchema>
): Promise<string> {
  return generateChatResponseFlow(input);
}

const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatResponseInputSchema,
    outputSchema: z.string(),
  },
  async ({history, personalityId, answerLength}) => {
    const personality = AI_PERSONALITIES.find(p => p.id === personalityId) ?? AI_PERSONALITIES[0];

    const lengthInstruction = answerLength === 'short' 
      ? 'Please provide a short, concise answer.' 
      : 'Please provide a detailed, long answer.';

    const systemPrompt = `${personality.systemPrompt} ${lengthInstruction}`;

    const response = await ai.generate({
      prompt: [
        {
          text: systemPrompt,
          role: 'system',
        },
        ...history.map((msg) => ({
          text: msg.content,
          role: msg.role === 'ai' ? 'model' : 'user',
        })),
      ],
      config: {
        // Adjust temperature for more creative or deterministic responses
        temperature: 0.7,
      },
    });

    return response.text;
  }
);
