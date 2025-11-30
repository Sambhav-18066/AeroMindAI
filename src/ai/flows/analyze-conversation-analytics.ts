'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing conversation analytics.
 *
 * - analyzeConversationAnalytics - An exported function that initiates the conversation analysis flow.
 * - AnalyzeConversationAnalyticsInput - The input type for the analyzeConversationAnalytics function.
 * - AnalyzeConversationAnalyticsOutput - The return type for the analyzeConversationAnalytics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeConversationAnalyticsInputSchema = z.object({
  sessionId: z.string().describe('The ID of the conversation session to analyze.'),
  messages: z.array(z.object({
    role: z.enum(['user', 'ai']).describe('The role of the message sender.'),
    content: z.string().describe('The content of the message.'),
  })).describe('The list of messages in the conversation session.'),
});
export type AnalyzeConversationAnalyticsInput = z.infer<typeof AnalyzeConversationAnalyticsInputSchema>;

const AnalyzeConversationAnalyticsOutputSchema = z.object({
  wordsPerMinute: z.number().describe('The average words per minute spoken by the user.'),
  lexicalRichness: z.number().describe('A measure of the diversity of words used in the conversation.'),
  emotionalDepth: z.number().describe('A measure of the emotional content of the conversation.'),
  pauseLength: z.number().describe('The average pause length in the conversation.'),
  responseLatency: z.number().describe('The average response latency in the conversation.'),
  aiVsUserTalkRatio: z.number().describe('The ratio of AI talk time vs user talk time.'),
  sentimentAnalysis: z.string().describe('Sentiment analysis of the conversation.'),
  narrativeContinuityScore: z.number().describe('A measure of how well the conversation flows.'),
  autobiographicalDepthScore: z.number().describe('A measure of the depth of personal information shared.'),
});
export type AnalyzeConversationAnalyticsOutput = z.infer<typeof AnalyzeConversationAnalyticsOutputSchema>;

export async function analyzeConversationAnalytics(input: AnalyzeConversationAnalyticsInput): Promise<AnalyzeConversationAnalyticsOutput> {
  return analyzeConversationAnalyticsFlow(input);
}

const analyzeConversationAnalyticsPrompt = ai.definePrompt({
  name: 'analyzeConversationAnalyticsPrompt',
  input: {schema: AnalyzeConversationAnalyticsInputSchema},
  output: {schema: AnalyzeConversationAnalyticsOutputSchema},
  prompt: `You are an AI conversation analyst. You will receive a conversation session consisting of messages between a user and an AI.

You will analyze the conversation for the following metrics:
- Words Per Minute (WPM) for the user
- Lexical Richness (unique word count / total word count) for the user
- Emotional Depth (measure of emotional content) for both user and AI
- Pause Length (average pause length) for the user
- Response Latency (average response latency) for the AI
- AI vs User talk ratio
- Sentiment analysis of the conversation
- Narrative Continuity Score
- Autobiographical Depth Score

Here is the conversation:
{{#each messages}}
  {{role}}: {{content}}
{{/each}}

Return the analysis in JSON format.
`,
});

const analyzeConversationAnalyticsFlow = ai.defineFlow(
  {
    name: 'analyzeConversationAnalyticsFlow',
    inputSchema: AnalyzeConversationAnalyticsInputSchema,
    outputSchema: AnalyzeConversationAnalyticsOutputSchema,
  },
  async input => {
    const {output} = await analyzeConversationAnalyticsPrompt(input);
    return output!;
  }
);
