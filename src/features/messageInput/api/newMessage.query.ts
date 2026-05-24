import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../../shared/api/url";
import { type NewMessage, type Message } from "../../../entities/message/model/messageSchema";
import axios from "axios";

type ChatCache = {
  messages: Message[],
  [key: string]: any,
}

export const useCreateMessage = (chatId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMessage: NewMessage) => {
      const response = await axios.post(`${baseUrl}/chats/${chatId}/messages`, newMessage);
      return response.data;
    },

    onMutate: async (newMessage) => {
      await queryClient.cancelQueries({ queryKey: ["chat", { chatId }]});

      const previousChat = queryClient.getQueryData<ChatCache>(["chat", { chatId }]);
      const date = new Date().toISOString();

      const optimisticMessage: Message = {
        ...newMessage,
        id: -1,
        created_at: date,
        modified_at: date,
      }

      if (newMessage.parent_message_id) {
        optimisticMessage.parent_message = previousChat?.messages.find(msg => optimisticMessage.parent_message_id === msg.id);
      }
      
      queryClient.setQueryData(['chat', { chatId }], (chatData?: ChatCache): ChatCache | void => {
        if (!chatData) return chatData;

        return {
          ...chatData,
          messages: [
            optimisticMessage,
            ...chatData.messages,
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
