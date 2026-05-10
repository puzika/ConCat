import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../../shared/api/url";
import { type NewMessage } from "../model/messageListSchema";
import axios from "axios";

export const useCreateMessage = (chatId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMessage: NewMessage) => {
      const response = await axios.post(`${baseUrl}/chats/${chatId}/messages`, newMessage);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', { chatId }] });
    },
  });
};
