import z from "zod";

const messageSchema = z.object({
  id: z.number(),
  type: z.enum(["text", "audio", "video"], "Invalid message type"),
  content: z.string().default(""),
  chat_id: z.number("Invalid chat id"),
  sender_id: z.number("Invalid sender id")
}).refine(data => (data.type !== "text") || (data.content.length > 0), {
  error: "Text messages must be at least one character long",
  path: ["content"]
});

export type Message = z.infer<typeof messageSchema>;

export const messageListSchema = z.array(messageSchema);