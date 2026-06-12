import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Chat } from "../../../widgets/chat/model/chatSchema";
import { apiClient } from "../../../shared/config/axios.api";

export const useDeleteMessage = (chatId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: number) => {
      await apiClient.delete(`/chats/${chatId}/messages/${messageId}`);
    },

    onMutate: async (messageId) => {
      queryClient.cancelQueries({ queryKey: ["chat", { chatId }]});

      const previousChat = queryClient.getQueryData<Chat>(["chat", { chatId }]);

      queryClient.setQueryData(["chat", { chatId }], (oldChat?: Chat): Chat | void => {
        if (!oldChat) return oldChat;

        const { messages: prevMessages } = oldChat;
        const updatedMessages = prevMessages.filter(msg => msg.id !== messageId);

        return {
          ...oldChat,
          messages: updatedMessages,
        }
      });

      return { previousChat }
    },

    onError: (_err, _msgId, context) => {
      queryClient.setQueryData(["chat", { chatId }], () => {
        return context?.previousChat;
      });
    } 
  })
}