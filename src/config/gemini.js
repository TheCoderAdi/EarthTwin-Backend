import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent`;

export async function callGemini(prompt) {
    try {
        const response = await axios.post(GEMINI_URL, {
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": GEMINI_API_KEY
            }
        });

        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    } catch (err) {
        console.error("Gemini Error:", err);

        return null;
    }
}