import { generateObject } from 'ai';
import { ITranslatePropmp } from './Translate.type';
import { translateSchema } from './Translate.schema';
import { createGroq } from '@ai-sdk/groq';

export async function POST(req: Request) {
    const { prompt }: { prompt: ITranslatePropmp } = await req.json();

    const {
        from,
        into,
        text,
    } = prompt;

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
        schema: translateSchema,
        system: 'You are an expert in translating from Russian to English and from English to Russian',
        prompt: `Translate the text from ${from} into ${into}. Before returning the translation
        Check it for errors and compliance with the best translation practices
        ###
        The text: ${text}`,
    });

    return Response.json({ result: object });
}
