import { TypeOf, z } from 'zod';
import { Address, addressSchema } from "./address";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  passwords: z.object({
    password: z.string().min(6),
    confirmPassword: z.string(),
  }).refine(({password, confirmPassword}) => password === confirmPassword, {
    message: "Passwords should match",
    path: ['confirmPassword']
  }),
  address: addressSchema,
});

export type User = z.infer<typeof userSchema>;
