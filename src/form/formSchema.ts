import * as z from "zod";

export const registerSchema = z.object({
    username: z.string().min(2, ''),
    password: z.string().min(2, ''),
    email: z.string().min(2, ''),
})

export const orderSchema = z.object({
    name: z.string().min(2, ''),
    amount: z.string().min(2, ''),
    weight: z.string().min(2, ''),
})

export const loginSchema = z.object({
    username: z.string().min(2, ''),
    password: z.string().min(2, ''),
})
