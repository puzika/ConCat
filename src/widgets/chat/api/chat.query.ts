import axios from "axios";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { baseUrl } from "../../../shared/api/url";
import { chatSchema } from "../model/chatSchema";

const chatQueryOptions = (chatId: number) => queryOptions({
  queryKey: ['chat', { chatId }] as const,
  queryFn: async ({ queryKey }) => {
    const [_key, { chatId }] = queryKey;

    const response = await axios.get(`${baseUrl}/chats/${chatId}`);
    const { data } = response;
    
    const chatData = chatSchema.parse(data);

    return chatData;
  },
});

export const useChat = (chatId: number) => useQuery(chatQueryOptions(chatId));