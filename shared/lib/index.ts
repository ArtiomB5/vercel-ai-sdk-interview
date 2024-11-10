import { Dispatch, SetStateAction } from "react";
import { GradeType } from "../types";

export const getQuesions = async (id: string, questionsTopic: string, grade: GradeType, setState: Dispatch<SetStateAction<Record<string, {
    id: number;
    question: string;
}[]>>>) => {
    const resp = await fetch('/api/v1/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: {
                sphere: 'Frontend Development',
                questionsTopic,
                grade,
            }
        }),
    });

    if (!resp.ok) {
        throw new Error(`Ошибка: ${resp.status}`);
    }

    const data = await resp.json();

    setState((pv) => {
        const pvArr = pv[id];

        if (pvArr) {
            return { ...pv, [id]: [...pvArr, ...data.questions] }
        } else {
            return { ...pv, [id]: [...data.questions] }
        }
    })
}
