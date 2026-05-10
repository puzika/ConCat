import axios from "axios";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { baseUrl } from "../../../shared/api/url";
import { chatListSchema } from "../../../shared/model/chatListSchema";

const chatListQueryOptions = (id: number) => queryOptions({
  queryKey: ['chatList', { userId: id }] as const,
  queryFn: async ({ queryKey }) => {
    const [_key, { userId }] = queryKey;

    const response = await axios.get(`${baseUrl}/chats?user=${userId}`);
    const { data } = response;

    const users = chatListSchema.parse(data);

    return users;
  },
});

export const useChatList = (id: number) => useSuspenseQuery(chatListQueryOptions(id));