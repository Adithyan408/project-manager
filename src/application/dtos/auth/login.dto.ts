import { z } from "zod";

export const RegisterDtoSchema = z.object({
    fullName: z.string().trim().min(3).max(50),
    email: z.email().trim().toLowerCase().max(50),
    password: z.string().min(8).max(128),
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;