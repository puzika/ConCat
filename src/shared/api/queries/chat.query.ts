import axios from "axios";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { baseUrl } from "../url";
import { messageListSchema } from "../../model/messagesSchema";

const messagesQueryFunction = async (chatId: number) => {
  const response = await axios.get(`${baseUrl}/chats/${chatId}/messages`);
  const { data } = response;

  const messages = messageListSchema.parse(data);

  return  messages;
}

const messagesQueryOptions = (chatId: number) => queryOptions({
  queryKey: ['chat', chatId],
  queryFn: () => messagesQueryFunction(chatId),
});

export const useMessages = (chatId: number) => useQuery(messagesQueryOptions(chatId));