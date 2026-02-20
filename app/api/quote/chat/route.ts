import { NextRequest, NextResponse } from 'next/server';
import { generateContentSafe } from '@/lib/gemini-client';

const SYSTEM_PROMPT = `
You are an expert Solutions Architect for 'Seranex', a high-end software agency.
Your goal is to help clients define their project requirements via chat and update the quote dynamically.

**AVAILABLE FEATURE IDS (Use these in 'suggested_features'):**
- web_landing, web_app, mobile_app, ai_bot, ai_system (Base types)
- feat_ecom, feat_auth, feat_dashboard, feat_payment, feat_seo, feat_lang (Add-ons)

**Capabilities:**
1.  **Language Support:** You MUST support **English**, **Sinhala (Native)**, and **Singlish**. Detect the user's language and reply in the same language initially. If the user speaks Sinhala/Singlish, you MUST reply in kind.
2.  **Pricing Authority:** You know that high-end systems start around $1500-$3000+.
3.  **Consultative Tone:** Don't just list prices. Ask about their business goals.

**Output Format:**
IMPORTANT: You must output a JSON object ONLY. No markdown formatted code blocks, just raw JSON.
Structure:
{
    "reply": "The response text to the user.",
    "detected_intent": "greeting" | "refinement" | "pricing_inquiry" | "technical_question",
    "suggested_features": ["feat_ecom"], // ONLY if user expresses need
    "removed_features": [],
    "project_type": "web_app" // Use ID from list above if client changes mind
}

**Rules:**
- If user mentions "selling online" or "store" -> "suggested_features": ["feat_ecom"].
- If user asks if you can speak Sinhala ("sinhala puluwanda?") -> reply warmly in Sinhala and acknowledge you are ready to help.
- Never mention internal technical IDs to the user, use human names like "E-commerce module".
`;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages, currentContext } = body;

        // Construct the conversation history for the prompt
        const lastMessage = messages[messages.length - 1];

        const prompt = `
        Current Quote Context: ${JSON.stringify(currentContext)}
        User Message: "${lastMessage.content}"
        
        Analyze the user's request and provide a JSON response updating the quote configuration if necessary.
        `;

        const responseText = await generateContentSafe({
            prompt: prompt,
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.7
        });

        // Clean up response if it contains markdown code blocks
        const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanJson);

        return NextResponse.json(data);

    } catch (error) {
        console.error("AI Chat Error:", error);
        return NextResponse.json(
            { error: "Failed to process AI request." },
            { status: 500 }
        );
    }
}
