import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    const { prompt, businessContext } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are a world-class digital growth consultant for the WINGS platform. 
The user is a business owner looking to grow.
Business Context: ${businessContext || "Unknown"}
Your goal is to give actionable, highly professional, and brief marketing advice. 
Also, recommend what type of digital freelancer they should hire (e.g., SEO expert, Meta Ads runner, Content Creator). 
Keep it concise and format nicely with bullet points.`;

    const result = await model.generateContent(`${systemPrompt}\n\nClient Request: ${prompt}`);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
  }
}
