// src/ai/flows/personalized-event-recommendations.ts
'use server';

/**
 * @fileOverview Personalized event recommendations flow.
 *
 * - generatePersonalizedEventRecommendations - A function that generates personalized event recommendations.
 * - PersonalizedEventRecommendationsInput - The input type for the generatePersonalizedEventRecommendations function.
 * - PersonalizedEventRecommendationsOutput - The return type for the generatePersonalizedEventRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedEventRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('A description of the user overall preferences.'),
  pastActivity: z
    .string()
    .describe('A description of the users past activity and event attendance.'),
  interests: z
    .string()
    .describe('A comma seperated list of event categories the user is interested in'),
  location: z.string().describe('The location of the user.'),
});
export type PersonalizedEventRecommendationsInput = z.infer<
  typeof PersonalizedEventRecommendationsInputSchema
>;

const PersonalizedEventRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of personalized event recommendations.'),
});
export type PersonalizedEventRecommendationsOutput = z.infer<
  typeof PersonalizedEventRecommendationsOutputSchema
>;

export async function generatePersonalizedEventRecommendations(
  input: PersonalizedEventRecommendationsInput
): Promise<PersonalizedEventRecommendationsOutput> {
  return personalizedEventRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedEventRecommendationsPrompt',
  input: {schema: PersonalizedEventRecommendationsInputSchema},
  output: {schema: PersonalizedEventRecommendationsOutputSchema},
  prompt: `You are an expert event recommender. Given the user's preferences, past activity, interests, and location, you will provide personalized event recommendations.

User Preferences: {{{userPreferences}}}
Past Activity: {{{pastActivity}}}
Interests: {{{interests}}}
Location: {{{location}}}

Based on this information, recommend events that the user would be interested in. Return a string of event names.`,
});

const personalizedEventRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedEventRecommendationsFlow',
    inputSchema: PersonalizedEventRecommendationsInputSchema,
    outputSchema: PersonalizedEventRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
