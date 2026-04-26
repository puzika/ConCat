import axios from "axios";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { baseUrl } from "../url";
import { chatListSchema } from "../../model/chatListSchema";

const chatListQueryFunction = async (id: number) => {
  const response = await axios.get(`${baseUrl}/chats?user=${id}`);
  const { data } = response;

  const users = chatListSchema.parse(data);

  return users;
}

const chatListQueryOptions = (id: number) => queryOptions({
  queryKey: ['users'],
  queryFn: () => chatListQueryFunction(id),
});

export const useChatList = (id: number) => useSuspenseQuery(chatListQueryOptions(id));