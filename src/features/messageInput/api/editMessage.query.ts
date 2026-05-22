import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../../shared/api/url";
import { type Message, type EditedMessage } from "../../../entities/message/model/messageSchema";
import axios from "axios";

type ChatCache = {
  messages: Message[],
  [key: string]: any,
}

export const useEditMessage = (chatId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, content}: EditedMessage) => {
      const response = await axios.patch(`${baseUrl}/chats/${chatId}/messages/${id}`, { content });
      return response.data;
    },

    onMutate: async ({ id, content }) => {
      await queryClient.cancelQueries({ queryKey: ["chat", { chatId }]});

      const previousChat = queryClient.getQueryData<ChatCache>(["chat", { chatId }]);

      if (!previousChat) return;

      const updatedChat: Message[] = previousChat?.messages.map(msg => {
        return msg.id === id ?
          { ...msg, content, id: -1 } :
          msg
      });
      
      queryClient.setQueryData(['chat', { chatId }], (chatData?: ChatCache): ChatCache | void => {
        if (!chatData) return chatData;

        return {
          ...chatData,
          messages: updatedChat,
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
