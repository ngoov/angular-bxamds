import { z } from 'zod';

export const personSchema = z.object({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string().refine(color => color !== 'blond', 'Hair color can not be blond'),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.string(),
  films: z.array(z.string()).min(1),
  species: z.array(z.string()).min(1),
  vehicles: z.array(z.string()),
  starships: z.array(z.string()),
  created: z.string().optional(),
  edited: z.string().optional(),
  url: z.string().optional(),
});

export type Person = z.infer<typeof personSchema>;
