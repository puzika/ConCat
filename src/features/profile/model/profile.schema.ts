import z from "zod";

export const profileSchema = z.object({
  username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must not exceed 20 characters"),
    email: z
      .email("Please, enter a valid email"),
});

export type TProfileSchema = z.infer<typeof profileSchema>;