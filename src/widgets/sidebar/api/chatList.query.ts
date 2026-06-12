import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { chatListSchema } from "../model/chatListSchema";
import { apiClient } from "../../../shared/config/axios.api";

const chatListQueryOptions = (id: number) => queryOptions({
  queryKey: ['chatList', { userId: id }] as const,
  queryFn: async () => {
    const response = await apiClient.get(`/chats?user=${id}`);
    const { data } = response;

    const users = chatListSchema.parse(data);

    return users;
  },
});

export const useChatList = (id: number) => useSuspenseQuery(chatListQueryOptions(id));