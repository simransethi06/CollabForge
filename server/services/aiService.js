import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const askAI = async (code, language, prompt) => {
  const fullPrompt = `You are an expert ${language} developer. Here is the code:\n\`\`\`${language}\n${code}\n\`\`\`\n\nTask: ${prompt}\n\nGive a clear, concise response.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Gemini API error");
  }

  return data.candidates[0].content.parts[0].text;
};