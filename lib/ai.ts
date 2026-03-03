import OpenAI from "openai";
import { AISummary } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAISummary(
  reviews: string[]
): Promise<AISummary> {
  const prompt = `
You are a movie sentiment analyst.

Based on these audience reviews:

${reviews.join("\n\n")}

Return ONLY valid JSON in this format:

{
  "summary": "3-4 sentence audience summary",
  "sentiment": "positive" | "mixed" | "negative"
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert film analyst." },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0].message.content;

  try {
    return JSON.parse(content || "{}");
  } catch {
    return {
      summary: "AI could not generate a proper summary.",
      sentiment: "mixed",
    };
  }
}