import z from "zod";

const schema = z.object({
  id: z.number(),
  client_id: z.string().nullable().optional(),
  type: z.enum(["text", "audio", "video"], "Invalid message type"),
  content: z.string().default(""),
  chat_id: z.number("Invalid chat id"),
  sender_id: z.number("Invalid sender id"),
  sender: z.object({
    id: z.number(),
    username: z.string(),
  }).nullable().optional(),
  parent_message_id: z.number().nullable().optional(),
  created_at: z.string(),
  modified_at: z.string(),
}).refine(data => (data.type !== "text") || (data.content.length > 0), {
  error: "Text messages must be at least one character long",
  path: ["content"]
});

export const messageSchema = schema.extend({
  parent_message: schema.nullable().optional(),
})

export type Message = z.infer<typeof messageSchema>;
export type NewMessage = Omit<Message, "id" | "created_at" | "modified_at">;
export type EditedMessage = Pick<Message, "id" | "content">;

export const messageListSchema = z.array(messageSchema);