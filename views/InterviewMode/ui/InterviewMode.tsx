'use client';

import topicsJunior from '@/entities/topics/junior.json';
import topicsMiddle from '@/entities/topics/middle.json';
import topicsSenior from '@/entities/topics/senior.json';
import { getQuesions } from '@/shared/lib';
import { TopicRow } from '@/shared/ui/TopicRow';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const InterviewModePage = () => {
    const [questions, setQuestions] = useState<Record<string, Array<{ id: number, question: string }>>>({});

    return <div>
        <h1>Topics</h1>
        <div>
            <h2>Junior</h2>
            {topicsJunior.map((t, i) => <TopicRow
                id={i}
                ru={t.topic.ru}
                en={t.topic.en}
                grade={t.grade}
                questions={questions}
                setQuestions={setQuestions}
                getQuesions={getQuesions}
                key={nanoid()}
            />)}
        </div>
        <hr />
        <div>
            <h2>Middle</h2>
            {topicsMiddle.map((t, i) => <TopicRow
                id={i}
                ru={t.topic.ru}
                en={t.topic.en}
                grade={t.grade}
                questions={questions}
                setQuestions={setQuestions}
                getQuesions={getQuesions}
                key={nanoid()}
            />)}
        </div>
        <hr />
        <div>
            <h2>Senior</h2>
            {topicsSenior.map((t, i) => <TopicRow
                id={i}
                ru={t.topic.ru}
                en={t.topic.en}
                grade={t.grade}
                questions={questions}
                setQuestions={setQuestions}
                getQuesions={getQuesions}
                key={nanoid()}
            />)}
        </div>
    </div>
}
