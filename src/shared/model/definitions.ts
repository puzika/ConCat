import z from "zod";

export const userSchema = z.object({
  id: z.coerce.string(),
  username: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;

export const userArraySchema = z.array(userSchema);