'use server';
/**
 * @fileOverview A flow for generating chat responses.
 *
 * - generateChatResponse - A function that generates a response to a conversation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatHistorySchema = z.array(
  z.object({
    role: z.enum(['user', 'ai']),
    content: z.string(),
  })
);

export async function generateChatResponse(
  history: z.infer<typeof ChatHistorySchema>
): Promise<string> {
  return generateChatResponseFlow(history);
}

const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: ChatHistorySchema,
    outputSchema: z.string(),
  },
  async (history) => {
    const systemPrompt = `You are a helpful AI assistant. Your responses should be conversational and helpful.`;

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
