import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is missing in environment variables." });
  }

  const { code } = req.body;

  if (!code || code.trim() === "") {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    // Initialize Gemini AI with your API key
    const genAI = new GoogleGenerativeAI(apiKey);

    // Select the model (use "gemini-1.5-pro" for better quality if supported)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare your content array
    const prompt = `
You are an expert code reviewer. Analyze the following code for:
1. Code quality
2. Performance issues
3. Best practices
4. Security vulnerabilities

Provide detailed feedback and suggestions for improvement.

Here is the code:
\`\`\`
${code}
\`\`\`
    `;

    // Gemini expects a "contents" array, not just a string
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const response = result.response;
    const text = response.text();
    // After: const text = response.text();

// 1. Generate a random score (for now)
const score = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Random score between 60 and 100

// 2. Send the score in the response
res.status(200).json({ 
  analysis: text,
  score: score,
});


    res.status(200).json({ analysis: text });
  } catch (error) {
    console.error("Gemini API error:", error);

    res.status(500).json({ error: "❗️ Error: Failed to analyze the code." });
  }
}
