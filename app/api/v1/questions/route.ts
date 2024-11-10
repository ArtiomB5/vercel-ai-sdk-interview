import { generateObject } from 'ai';
import { IQuestionsPrompt } from './Questions.type';
import { questionsSchema } from './Questions.schema';
import { createGroq } from '@ai-sdk/groq';

export async function POST(req: Request) {
    const { prompt }: { prompt: IQuestionsPrompt } = await req.json();

    const {
        sphere,
        questionsTopic,
        grade,
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
        schema: questionsSchema,
        system: `You are an expert in writing interview questions on the topic of ${sphere}.`,
        prompt: `The questions should correspond to the level of ${grade} specialists. 
        Write a list of 5 questions on topic ${questionsTopic}.`,
    });

    return Response.json(object);
}
