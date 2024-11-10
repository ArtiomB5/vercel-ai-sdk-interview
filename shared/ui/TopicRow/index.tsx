import { nanoid } from "nanoid"
import { FC } from "react"
import { ITopicRowProps } from "./TopicRow.type"
import { GradeType } from "@/shared/types"
import Link from "next/link"

export const TopicRow: FC<ITopicRowProps> = ({ id, ru, en, grade, questions, getQuesions, setQuestions }) => {
    return <div>
        <h3>{id}</h3>
        <div>{ru}</div>
        <div>{en}</div>
        <div>{questions[`${id}-${grade}`]?.map((q) => <div key={nanoid()} style={{ border: '1px solid red' }}>
            <Link href={`/topic-links?search=${q.question.split(' ').join('_')}`}>{q.question}</Link>
        </div>)}</div>
        <button onClick={() => getQuesions(`${id}-${grade}`, en, grade as GradeType, setQuestions)}>get questions</button>
    </div>
}
