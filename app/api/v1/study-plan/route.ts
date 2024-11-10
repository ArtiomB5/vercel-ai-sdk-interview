import { generateObject } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { z } from 'zod';

export async function POST(req: Request) {
    const { prompt }: { prompt: Array<{ id: number; topic: { ru: string, en: string }, grade: string }> } = await req.json();

    console.log('API_KEY', process.env.AI_API_KEY)
    const groq = createGroq({
        baseURL: 'https://api.groq.com/openai/v1', // Обратите внимание, что конечный путь до "chat/completions" убран
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AI_API_KEY}`
        },
        apiKey: process.env.AI_API_KEY,
    });

    const model = groq('gemma2-9b-it');

    const topics = prompt.map((t) => ({ id: t.id, topic: t.topic.en }));

    const { object: topicsWithTime } = await generateObject({
        model,
        schema: z.object({
            fullLearningPlan: z.array(z.object(
                {
                    id: z.string(),
                    topic: z.string(),
                    timeForLearning: z.number(),
                }
            )),
        }),
        system: 'You are an expert in planning the educational process in the field of information technology',
        prompt: `
        Topics to explore: ${JSON.stringify(topics)}
        Consider the topic to study and add the number of recommended hours for each topic to study`,
    });

    const { object: schedule } = await generateObject({
        model,
        schema: z.object({
            schedule: z.array(z.object(
                {
                    topicId: z.string(),
                    timeForLearning: z.number(),
                    weekDay: z.string(),
                    month: z.string(),
                }
            )),
        }),
        system: 'You are an expert in planning the educational process in the field of information technology',
        prompt: `
        Free time schedule
        Specifies the MAXIMUM number of hours that can be spent on studying
        A student can ONLY learn a topic when the hours are greater than 0
         ${JSON.stringify({
            Mon: {freeTime: 2},
            Tue: {freeTime: 2},
            Wed: {freeTime: 2},
            Thu: {freeTime: 0},
            Fri: {freeTime: 0},
            Sat: {freeTime: 3},
            Sun: {freeTime: 0},
        })}.
        Topics to study with a pre-planned time to study: ${JSON.stringify(topicsWithTime)}
        Use your free time schedule and make a plan to study all the topics
        timeForLearning can't be greated than freeTime
        If freeTime === 0 student cant't study in this day
        Student can learn topic during some days if it need
        In your schedule rest days with freeTime === 0, but use this day object: ${JSON.stringify({
            topicId: '-',
            timeForLearning: 0,
            weekDay: '<< day of the week >>',
            month: '<< month here >>',
        })}
        ALL TOPICS NEED TO BE STUDIED IN 3 months`,
    });

    return Response.json({ result: schedule });
}