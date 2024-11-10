import { generateObject } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { z } from 'zod';

export async function POST(req: Request) {
    const { prompt }: { prompt: { text: string } } = await req.json();

    const { text } = prompt;

    const groq = createGroq({
        baseURL: process.env.BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AI_API_KEY}`
        },
        apiKey: process.env.AI_API_KEY,
    });

    const model = groq('gemma2-9b-it');

    const { object } = await generateObject({
        model,
        schema: z.object({ 
            text: z.string().startsWith('q='),
            searchQuery: z.string(),
        }),
        system: `
            You are search query generator for brave.com search engine by question and for searching ONLY on habr.com
            Question: Tell us about React Fiber in Rect
            Search Query: q=react+fiber+site%3Ahabr.com&source=web&tf=py
            Question: What is the purpose of a bundler in frontend development?
            Search Query: q=бандлеры+site%3Ahabr.com&source=web&tf=py
            `,
        prompt: `Text: ${text}`,
    });

    return Response.json(object);
}
