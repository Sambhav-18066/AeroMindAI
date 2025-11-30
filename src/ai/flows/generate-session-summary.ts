'use server';

/**
 * @fileOverview A flow to generate a summary of a conversation session.
 *
 * - generateSessionSummary - A function that generates a summary of a conversation session.
 * - GenerateSessionSummaryInput - The input type for the generateSessionSummary function.
 * - GenerateSessionSummaryOutput - The return type for the generateSessionSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSessionSummaryInputSchema = z.object({
  sessionId: z.string().describe('The ID of the session to summarize.'),
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'ai']).describe('The role of the speaker.'),
      content: z.string().describe('The content of the message.'),
    })
  ).describe('The conversation history to summarize.'),
});

export type GenerateSessionSummaryInput = z.infer<typeof GenerateSessionSummaryInputSchema>;

const GenerateSessionSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the conversation session.'),
  keyDiscussionPoints: z.array(z.string()).describe('Key discussion points from the conversation.'),
  emotionalCues: z.array(z.string()).describe('Emotional cues observed in the conversation.'),
  strengths: z.array(z.string()).describe('Strengths demonstrated in the conversation.'),
  weaknesses: z.array(z.string()).describe('Weaknesses identified in the conversation.'),
  improvementSuggestions: z.array(z.string()).describe('Personalized improvement suggestions.'),
  suggestedNextTopics: z.array(z.string()).describe('Suggested next topics for conversation.'),
  confidenceRating: z.number().describe('A confidence rating for the summary (0-1).'),
});

export type GenerateSessionSummaryOutput = z.infer<typeof GenerateSessionSummaryOutputSchema>;

export async function generateSessionSummary(input: GenerateSessionSummaryInput): Promise<GenerateSessionSummaryOutput> {
  return generateSessionSummaryFlow(input);
}

const generateSessionSummaryPrompt = ai.definePrompt({
  name: 'generateSessionSummaryPrompt',
  input: {schema: GenerateSessionSummaryInputSchema},
  output: {schema: GenerateSessionSummaryOutputSchema},
  prompt: `You are an AI conversation summarizer.  You will take the conversation history
  and generate a summary, highlighting key discussion points, emotional cues, strengths,
  weaknesses, and personalized improvement suggestions. You will also suggest next topics
  for conversation and provide a confidence rating for the summary.

  Conversation History:
  {{#each conversationHistory}}
  {{role}}: {{content}}
  {{/each}}

  Summary:
  {{summary}}

  Key Discussion Points:
  {{#each keyDiscussionPoints}}
  - {{this}}
  {{/each}}

  Emotional Cues:
  {{#each emotionalCues}}
  - {{this}}
  {{/each}}

  Strengths:
  {{#each strengths}}
  - {{this}}
  {{/each}}

  Weaknesses:
  {{#each weaknesses}}
  - {{this}}
  {{/each}}

  Improvement Suggestions:
  {{#each improvementSuggestions}}
  - {{this}}
  {{/each}}

  Suggested Next Topics:
  {{#each suggestedNextTopics}}
  - {{this}}
  {{/each}}

  Confidence Rating: {{confidenceRating}}`, // Handlebars
});

const generateSessionSummaryFlow = ai.defineFlow(
  {
    name: 'generateSessionSummaryFlow',
    inputSchema: GenerateSessionSummaryInputSchema,
    outputSchema: GenerateSessionSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateSessionSummaryPrompt(input);
    return output!;
  }
);
