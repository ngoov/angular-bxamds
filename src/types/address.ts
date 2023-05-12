import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string(),
  number: z.string().optional(),
  city: z.string().optional(),
  zipcode: z.string().optional(),
  country: z.string().optional(),
});
export type Address = z.infer<typeof addressSchema>;
