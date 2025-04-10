import {number, z} from "zod"

export const createTodoTypes = z.object({
    title:z.string(),
    description:z.string(),
    status:z.boolean().optional(),
})