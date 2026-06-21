import z from "zod";

export const userSchema = z.object({
  id: z.number().nullable(),
  username: z.string(),
  email: z.email(),
  is_online: z.boolean(),
  last_seen: z.string().optional().nullable(),
});

export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;