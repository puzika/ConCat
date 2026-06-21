import z from "zod";

export const userSchema = z.object({
  id: z.number().nullable(),
  username: z.string(),
  email: z.email(),
  is_online: z.boolean().optional(),
});

export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;