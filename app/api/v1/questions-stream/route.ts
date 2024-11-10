import { tools } from '@/ai/tools';
import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export async function POST(request: Request) {
    const { messages } = await request.json();

    const groq = createGroq({
        baseURL: process.env.BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AI_API_KEY}`
        },
        apiKey: process.env.AI_API_KEY,
    });

    const model = groq('gemma2-9b-it');

    const result = await streamText({
        model,
        system: 'You are a friendly assistant!',
        messages,
        maxSteps: 5,
        tools: tools,
    });

    return result.toDataStreamResponse();
}
