export const lifestylePrompt = (input) => `
You are an environmental AI.

Convert the user's lifestyle into structured JSON.

Return ONLY JSON:
{
  "carbon_score": number (0-100),
  "water_usage": number (0-100),
  "waste_index": number (0-100),
  "summary": "short explanation"
}

User input:
"${input}"
`;

export const futurePrompt = (carbonScore) => `
Based on a carbon score of ${carbonScore}, describe environmental conditions in 2035.

Keep it short and impactful. 
`;

export const coachPrompt = (data) => `
User lifestyle:
${data}

Suggest 3 ways to reduce environmental impact.

Return JSON:
{
  "suggestions": []
}
`;