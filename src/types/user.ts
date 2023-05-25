import { z } from 'zod';
import { addressSchema } from "./address";

export const userSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string(),
  passwords: z.object({
    password: z.string().min(6).optional(),
    confirmPassword: z.string().optional(),
  }).refine(({password, confirmPassword}) => password === confirmPassword, {
    message: "Passwords should match",
    path: ['confirmPassword']
  }),
  address: addressSchema,
});

export type User = z.infer<typeof userSchema>;
