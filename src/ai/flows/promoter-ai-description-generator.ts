'use server';
/**
 * @fileOverview A Genkit flow for promoters to generate compelling deal descriptions using AI.
 *
 * - promoterAIDescriptionGenerator - A function that handles the generation of deal descriptions.
 * - PromoterAIDescriptionGeneratorInput - The input type for the promoterAIDescriptionGenerator function.
 * - PromoterAIDescriptionGeneratorOutput - The return type for the promoterAIDescriptionGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PromoterAIDescriptionGeneratorInputSchema = z.object({
  productName: z.string().describe('The name of the product or service for the deal.'),
  shortDescription: z
    .string()
    .optional()
    .describe('A brief, optional summary or tag-line for the deal.'),
  keyFeatures: z
    .array(z.string())
    .describe('A list of key features or selling points of the deal.'),
  originalPrice: z.number().optional().describe('The original price of the product or service.'),
  discountPercentage: z.number().optional().describe('The percentage discount offered.'),
  category: z.string().optional().describe('The category of the deal (e.g., Food, Auto, Home).'),
  targetAudience: z
    .string()
    .optional()
    .describe('An optional description of the target audience for this deal.'),
});
export type PromoterAIDescriptionGeneratorInput = z.infer<
  typeof PromoterAIDescriptionGeneratorInputSchema
>;

const PromoterAIDescriptionGeneratorOutputSchema = z.object({
  generatedDescription:
    z.string().describe('A compelling, AI-generated description for the deal.'),
});
export type PromoterAIDescriptionGeneratorOutput = z.infer<
  typeof PromoterAIDescriptionGeneratorOutputSchema
>;

export async function promoterAIDescriptionGenerator(
  input: PromoterAIDescriptionGeneratorInput
): Promise<PromoterAIDescriptionGeneratorOutput> {
  return promoterAIDescriptionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'promoterAIDescriptionGeneratorPrompt',
  input: {schema: PromoterAIDescriptionGeneratorInputSchema},
  output: {schema: PromoterAIDescriptionGeneratorOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in creating attractive and persuasive deal descriptions for online platforms like "MyOffers".

Your task is to generate a compelling and engaging description based on the provided details. Highlight the benefits, create urgency, and make the offer sound irresistible.

Input Details:
Product Name: {{{productName}}}
{{#if shortDescription}}Short Description: {{{shortDescription}}}{{/if}}
Key Features:
{{#each keyFeatures}}- {{{this}}}
{{/each}}
{{#if originalPrice}}Original Price: \${{{originalPrice}}}{{/if}}
{{#if discountPercentage}}Discount: {{discountPercentage}}%{{/if}}
{{#if category}}Category: {{{category}}}{{/if}}
{{#if targetAudience}}Target Audience: {{{targetAudience}}}{{/if}}

Guidelines:
- Write in a friendly, enthusiastic, and benefit-oriented tone.
- Start with a captivating hook.
- Elaborate on the key features, turning them into benefits for the customer.
- Clearly communicate the value proposition, especially if there's a discount.
- Include a subtle call to action to encourage engagement.
- The description should be engaging and concise, suitable for an online deal page.

Generate the description now:`,
});

const promoterAIDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'promoterAIDescriptionGeneratorFlow',
    inputSchema: PromoterAIDescriptionGeneratorInputSchema,
    outputSchema: PromoterAIDescriptionGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
