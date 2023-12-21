import { z } from 'zod';

export const createSchema = z.object({
    title: z.string({
        required_error: "title i required"
    }),
    asunto: z.string({
        required_error: "asunto i required"
    }),
    description: z.string({
        required_error: 'Description must be a string'
    }).optional(),
    date: z.string().datetime().optional()
})