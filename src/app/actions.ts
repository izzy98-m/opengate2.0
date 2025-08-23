'use server';

import { generatePersonalizedEventRecommendations, PersonalizedEventRecommendationsInput } from "@/ai/flows/personalized-event-recommendations";

export async function getRecommendations(input: PersonalizedEventRecommendationsInput) {
    try {
        const result = await generatePersonalizedEventRecommendations(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error generating recommendations:", error);
        return { success: false, error: "Failed to generate recommendations. Please try again." };
    }
}
