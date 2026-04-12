import z from "zod";

export const userSchema = z.object({
  userId: z.number(),
  chatId: z.number(),
  username: z.string().min(1),
}).strict();

export type User = z.infer<typeof userSchema>;

export const userArraySchema = z.array(userSchema);