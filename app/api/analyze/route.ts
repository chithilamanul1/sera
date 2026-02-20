import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { budget, features, projectType, description } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY;

        // Fallback Mock Response if no Key
        if (!apiKey) {
            console.warn("GEMINI_API_KEY not found, using mock response.");
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
            return NextResponse.json({
                technicalAnalysis: "Based on the requirements, a highly scalable architecture using Next.js 14 and Server Actions is recommended. The selected budget aligns with a mid-tier enterprise solution.",
                suggestedStack: ["Next.js 14", "Tailwind CSS", "PostgreSQL", "Prisma ORM"],
                estimatedTimeline: "4-6 Weeks",
                strategicInsight: "Focusing on a 'Mobile-First' approach will yield higher user retention for this specific market segment."
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are an elite Senior Solutions Architect at Seranex (Sri Lanka's premier digital agency).
      Analyze the project request and generate a structure quote and technical breakdown.

      **PRICING RULES (STRICT):**
      1. **Web Development:**
         - Local Clients (Sri Lanka): Starts from **15,000 LKR**.
         - International Clients: Starts from **45,000 LKR** (convert to their currency approx $150 USD).
      2. **Mobile App Development:**
         - Local Clients: Starts from **100,000 LKR**.
         - International Clients: Starts from **150,000 LKR** (approx $500 USD).
      3. **Custom AI Solutions:** 
         - Must recommend 3 Tiers: 'Starter AI', 'Pro Intelligence', 'Enterprise Neural'.
         - Pricing should be custom but follow the premium market rates (Local: 200k+, Int: $1000+).

      **Project Details:**
      Project Type: ${projectType}
      Budget Range: ${budget}
      Key Features: ${features.join(", ")}
      Description: ${description || "No specific description provided."}

      Output MUST be a valid JSON object with these exact keys:
      {
        "technicalAnalysis": "A 2-3 sentence executive summary.",
        "suggestedStack": ["Array", "of", "4-5", "key", "technologies"],
        "estimatedTimeline": "e.g. 4-6 Weeks",
        "strategicInsight": "One high-value business insight related to their project type.",
        "pricingEstimate": "A text string with the estimated price range based on the Rules above (e.g. 'Starting from 15,000 LKR' or '$500 - $800 USD')."
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown formatting in the response (e.g. ```json ... ```)
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const jsonResponse = JSON.parse(cleanedText);
            return NextResponse.json(jsonResponse);
        } catch (e) {
            console.error("Failed to parse AI response:", text);
            // Fallback to a safe response if AI returns invalid JSON
            return NextResponse.json({
                technicalAnalysis: "AI Analysis unavailable. Recommended stack based on standard best practices.",
                suggestedStack: ["React", "Express", "Node.js", "MongoDB"],
                estimatedTimeline: "Standard Delivery",
                strategicInsight: "Please contact our architects for a detailed manual review."
            });
        }

    } catch (error) {
        console.error("AI Analysis Error:", error);
        return NextResponse.json(
            { error: "Failed to process analysis" },
            { status: 500 }
        );
    }
}
