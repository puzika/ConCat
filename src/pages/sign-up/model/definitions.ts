import z from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must not exceed 20 characters"),
  email: z
    .email("Please, enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z
    .string()
}).refine(data => data.password === data.confirmPassword, {
  error: "Passwords must match",
  path: ["confirmPassword"],
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;