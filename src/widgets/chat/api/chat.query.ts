import { useQuery, queryOptions } from "@tanstack/react-query";
import { chatSchema } from "../model/chatSchema";
import { apiClient } from "../../../shared/config/axios.api";

const chatQueryOptions = (chatId: number) => queryOptions({
  queryKey: ['chat', { chatId }] as const,
  queryFn: async ({ queryKey }) => {
    const [_key, { chatId }] = queryKey;

    const response = await apiClient.get(`/chats/${chatId}`);
    const { data } = response;
    
    const chatData = chatSchema.parse(data);

    return chatData;
  },
});

export const useChat = (chatId: number) => useQuery(chatQueryOptions(chatId));