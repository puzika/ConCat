import z from "zod";
import { userSchema } from "../../../entities/user/model/userSchema";

export const chatListItemSchema = z.object({
  id: z.number(),
  participant_one: userSchema,
  participant_two: userSchema,
}).strict();

export type ChatListItem = z.infer<typeof chatListItemSchema>;

export const chatListSchema = z.array(chatListItemSchema);