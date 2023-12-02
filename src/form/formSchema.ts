import * as z from "zod";

export const registerSchema = z.object({
    username: z.string().min(2, ''),
    password: z.string().min(8, 'Password must be at least 8 characters long').regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'}
    ).refine((password) => password.trim().length === password.length, {
        message: 'Password cannot contain leading or trailing spaces',
    }),
    email: z.string().email('Please enter a valid email address'),

})

export const orderSchema = z.object({
    name: z.string().min(2, 'Order name should be at least 2 characters long'),
    weight: z.string()
        .min(3, 'Amount must be at least 3 characters long')
        .regex(/^\d+.*(pc|db|kg|l|ml|g|oz)$/, {
            message: 'Amount should start with a number and end with valid unit names like kg, l, ml, g, oz',
        }),
    amount: z.string().min(2, ''),
})

export const loginSchema = z.object({
    username: z.string().min(2, ''),
    password: z.string().min(2, ''),
})
