import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Message, type EditedMessage } from "../../../entities/message/model/messageSchema";
import { apiClient } from "../../../shared/config/axios.api";

type ChatCache = {
  messages: Message[],
  [key: string]: any,
}

export const useEditMessage = (chatId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, content}: EditedMessage) => {
      const response = await apiClient.patch(`/chats/${chatId}/messages/${id}`, { content });
      return response.data;
    },

    onMutate: async ({ id, content }) => {
      await queryClient.cancelQueries({ queryKey: ["chat", { chatId }]});

      const previousChat = queryClient.getQueryData<ChatCache>(["chat", { chatId }]);

      if (!previousChat) return;

      const updatedChat: Message[] = previousChat?.messages.map(msg => {
        return msg.id === id ?
          { ...msg, content, modified_at: new Date().toISOString(), id: -1 } :
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
