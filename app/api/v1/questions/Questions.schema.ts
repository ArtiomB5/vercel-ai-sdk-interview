import { z } from "zod";

export const questionsSchema = z.object({
    questions: z.array(z.object({id: z.number(), question: z.string()})),
});
