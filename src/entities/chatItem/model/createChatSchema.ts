import z from "zod";

export const createChatSchema = z.object({
  id: z.number().optional().nullable(),
  participant_one_id: z.number('Invalid participant id'),
  participant_two_id: z.number('Invalid participant id'),
});

export type TCreateChat = z.infer<typeof createChatSchema>;