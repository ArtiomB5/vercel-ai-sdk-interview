import { GradeType } from "@/shared/types";
import { Dispatch, SetStateAction } from "react";

export interface ITopicRowProps {
    id: number;
    ru: string;
    en: string;
    grade: string;
    questions: Record<string, {
        id: number;
        question: string;
    }[]>;
    getQuesions: (id: string, questionsTopic: string, grade: GradeType, setState: Dispatch<SetStateAction<Record<string, {
        id: number;
        question: string;
    }[]>>>) => Promise<void>;
    setQuestions: Dispatch<SetStateAction<Record<string, {
        id: number;
        question: string;
    }[]>>>;
}