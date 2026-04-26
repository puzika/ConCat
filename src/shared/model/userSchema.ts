import z from "zod";

export const userSchema = z.object({
  id: z.number().nullable(),
  username: z.string(),
});

export type User = z.infer<typeof userSchema>;