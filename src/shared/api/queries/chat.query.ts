import axios from "axios";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { baseUrl } from "../url";
import { chatSchema } from "../../model/chatSchema";

const chatQueryFunction = async (chatId: number) => {
  const response = await axios.get(`${baseUrl}/chats/${chatId}`);
  const { data } = response;
  
  const chatData = chatSchema.parse(data);

  return chatData;
}

const chatQueryOptions = (chatId: number) => queryOptions({
  queryKey: ['chat', chatId],
  queryFn: () => chatQueryFunction(chatId),
});

export const useChat = (chatId: number) => useQuery(chatQueryOptions(chatId));