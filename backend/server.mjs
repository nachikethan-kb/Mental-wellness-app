import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { TextServiceClient } from "@google/generative-ai";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Load Gemini API key from environment variable
const client = new TextServiceClient({
  apiKey: process.env.GEMINI_API_KEY, // Make sure you set GEMINI_API_KEY in your system
});

// API route for answering questions
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const [response] = await client.generateText({
      model: "gemini-1.5-flash",
      contents: [
        {
          parts: [
            {
              text: question,
            },
          ],
        },
      ],
    });

    // The answer text
    const answer = response?.candidates?.[0]?.content?.[0]?.text || "No response";

    res.json({ answer });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
});

// Start server
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
