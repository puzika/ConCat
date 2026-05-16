import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../../shared/api/url";
import { type NewMessage, type Message } from "../model/messageListSchema";
import type { Chat } from "../model/chatSchema";
import axios from "axios";

export const useCreateMessage = (chatId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMessage: NewMessage) => {
      const response = await axios.post(`${baseUrl}/chats/${chatId}/messages`, newMessage);
      return response.data;
    },

    onMutate: async (newMessage) => {
      await queryClient.cancelQueries({ queryKey: ["chat", { chatId }]});

      const previousChat = queryClient.getQueryData<Message[]>(["chat", { chatId }]);

      const optimisticMessage: Message = {
        ...newMessage,
        id: -1,
        client_id: new Date().toISOString() + crypto.randomUUID(),
        created_at: new Date().toISOString(),
      }
      
      queryClient.setQueryData(['chat', { chatId }], (chatData?: Chat) => {
        if (!chatData) return chatData;

        return {
          ...chatData,
          messages: [
            ...chatData.messages,
            optimisticMessage,
          ],
        };
      });

      return { previousChat };
    },

    onError: (_err, _newMessage, context) => {
      queryClient.setQueryData(
        ['chat', { chatId }],
        context?.previousChat
      );
    },

    retry: 3,
  });
};
