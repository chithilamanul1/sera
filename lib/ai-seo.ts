export async function generateBlogSEO(title: string, content: string) {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            console.error("OPENROUTER_API_KEY is not defined in .env");
            return null;
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": "https://seranex.org", // Optional, for OpenRouter analytics
                "X-Title": "SeraNex AI CMS", // Optional, for OpenRouter analytics
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free", // High performance Free model
                "messages": [
                    {
                        "role": "system",
                        "content": "You are an elite SEO strategist for SeraNex AI. Respond only in raw JSON."
                    },
                    {
                        "role": "user",
                        "content": `
                            Analyze this blog post for a high-performance software website.
                            Title: ${title}
                            Content: ${content.substring(0, 3000)}
                            
                            Return a JSON object exactly with these fields:
                            - metaTitle: A title optimized for Google (under 60 chars).
                            - metaDescription: A compelling description for search results (under 160 chars).
                            - executiveSummary: A technical 2-3 sentence overview for AI scrapers (Generative Engine Optimization).
                            - faqs: An array of 3 objects with "question" and "answer" fields.
                            - tags: An array of 5 highly relevant keywords (comma separated).
                        `
                    }
                ],
                "response_format": { "type": "json_object" }
            })
        });

        const data = await response.json();
        const jsonText = data.choices[0].message.content;
        
        // Sanitize response (remove markdown code blocks if any)
        const sanitizedJson = jsonText.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(sanitizedJson);
    } catch (error) {
        console.error("OpenRouter AI SEO Generation Error:", error);
        return null;
    }
}

export async function generateProjectSEO(title: string, content: string) {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) return null;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are an elite software architect and marketer for SeraNex AI. Focus on technical authority and conversion."
                    },
                    {
                        "role": "user",
                        "content": `
                            Analyze this portfolio project/case study.
                            Project: ${title}
                            Data: ${content.substring(0, 3000)}
                            
                            Return a JSON object with:
                            - metaTitle: SEO title for portfolio (under 60 chars).
                            - metaDescription: High-converting description (under 160 chars).
                            - executiveSummary: A 2-sentence value proposition for high-level executives.
                            - techStack: Array of 4-6 most important technologies used (comma separated).
                            - category: Best category (Web, Mobile, AI, Enterprise, E-Commerce).
                        `
                    }
                ],
                "response_format": { "type": "json_object" }
            })
        });

        const data = await response.json();
        const jsonText = data.choices[0].message.content;
        const sanitizedJson = jsonText.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(sanitizedJson);
    } catch (error) {
        console.error("AI Project Generation Error:", error);
        return null;
    }
}
