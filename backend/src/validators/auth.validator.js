
import { z } from "zod";

export const partnerTokenSchema = z.object({
    apiKey: z
        .string()
        .min(1, "API key is required")
        .max(200, "API key is too long"),
});


export const adminLoginSchema = z.object({
    email: z.string().trim().email().max(150),
    password: z.string().min(1).max(200),
});

