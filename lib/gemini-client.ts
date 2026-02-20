import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Configuration ---
const API_KEY = process.env.GEMINI_API_KEY || '';
const MODEL_NAME = 'gemini-2.0-flash'; // Or 'gemini-pro' depending on availability

// --- Rate Limiter State ---
const REQUEST_QUEUE: (() => Promise<void>)[] = [];
let IS_PROCESSING_QUEUE = false;
let LAST_REQUEST_TIME = 0;
const MIN_REQUEST_INTERVAL_MS = 2000; // 2 seconds between requests (conservative)

// --- Cache ---
const CACHE = new Map<string, string>();

// --- Types ---
interface GenerateOptions {
    prompt: string;
    systemInstruction?: string;
    temperature?: number;
    useCache?: boolean;
}

/**
 * Initializes the Google Generative AI client.
 */
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Processes the request queue with rate limiting.
 */
async function processQueue() {
    if (IS_PROCESSING_QUEUE) return;
    IS_PROCESSING_QUEUE = true;

    while (REQUEST_QUEUE.length > 0) {
        const now = Date.now();
        const timeSinceLastRequest = now - LAST_REQUEST_TIME;

        if (timeSinceLastRequest < MIN_REQUEST_INTERVAL_MS) {
            await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL_MS - timeSinceLastRequest));
        }

        const task = REQUEST_QUEUE.shift();
        if (task) {
            try {
                await task();
            } catch (e) {
                console.error("Task failed in queue", e);
            }
            LAST_REQUEST_TIME = Date.now();
        }
    }

    IS_PROCESSING_QUEUE = false;
}

/**
 * Generates content using Gemini with automatic rate limiting, retries, and caching.
 */
export async function generateContentSafe(options: GenerateOptions): Promise<string> {
    const { prompt, systemInstruction, temperature = 0.7, useCache = true } = options;

    // 1. Check Cache
    const cacheKey = JSON.stringify({ prompt, systemInstruction, temperature });
    if (useCache && CACHE.has(cacheKey)) {
        console.log("⚡ Serving from cache:", prompt.substring(0, 30) + "...");
        return CACHE.get(cacheKey)!;
    }

    // 2. Queue Request
    return new Promise<string>((resolve, reject) => {
        REQUEST_QUEUE.push(async () => {
            try {
                const model = genAI.getGenerativeModel({
                    model: MODEL_NAME,
                    systemInstruction: systemInstruction
                });

                // Retry Logic (Exponential Backoff)
                let attempts = 0;
                const maxAttempts = 3;

                while (attempts < maxAttempts) {
                    try {
                        console.log(`🤖 Invoking Gemini (Attempt ${attempts + 1})...`);
                        const result = await model.generateContent({
                            contents: [{ role: 'user', parts: [{ text: prompt }] }],
                            generationConfig: { temperature }
                        });

                        const response = result.response.text();

                        // Update Cache
                        if (useCache) CACHE.set(cacheKey, response);

                        resolve(response);
                        return; // Success!

                    } catch (error: any) {
                        if (error.status === 429 || error.message?.includes('429')) {
                            console.warn(`⚠️ Rate Limit Hit. Retrying...`);
                            attempts++;
                            const waitTime = Math.pow(2, attempts) * 1000; // 2s, 4s, 8s...
                            await new Promise(r => setTimeout(r, waitTime));
                        } else {
                            throw error; // Non-retriable error
                        }
                    }
                }

                throw new Error("Max retries exceeded for Gemini API");

            } catch (error) {
                reject(error);
            }
        });

        processQueue();
    });
}
