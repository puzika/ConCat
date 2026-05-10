import z from "zod";
import { messageListSchema } from "./messageListSchema";
import { userSchema } from "../../../entities/user/model/userSchema";

export const chatSchema = z.object({
  id: z.number(),
  messages: messageListSchema,
  participant_one: userSchema,
  participant_two: userSchema,
});

export type Chat = z.infer<typeof chatSchema>;