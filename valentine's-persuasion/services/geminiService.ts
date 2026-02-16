
import { GoogleGenAI } from "@google/genai";

// Function to generate a romantic message after a "YES" response using Gemini
export const generateRomanticMessage = async (request: string) => {
  // Creating a new instance right before making an API call ensures it uses the latest environment configuration
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The person just said YES to this request: "${request}". Write a very short, playful, and charming romantic message (max 20 words) celebrating this. Be a bit cheeky but very sweet.`,
      config: {
        systemInstruction: "You are a charming Valentine's Day cupid assistant. You speak with wit, romance, and a bit of playful humor.",
        temperature: 0.9,
      },
    });
    // Accessing the text property directly from the GenerateContentResponse object
    return response.text || "You're the best! My heart is yours forever! ❤️";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "You're the best! My heart is yours forever! ❤️";
  }
};
