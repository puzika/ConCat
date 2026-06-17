import { useQuery, queryOptions } from "@tanstack/react-query";
import { chatSchema } from "../model/chatSchema";
import { apiClient } from "../../../shared/config/axios.api";
import axios from "axios";
import { ZodError } from "zod";

const chatQueryOptions = (chatId: number) => queryOptions({
  queryKey: ['chat', { chatId }] as const,
  queryFn: async ({ queryKey }) => {
    try {
      const [_key, { chatId }] = queryKey;

      const response = await apiClient.get(`/chats/${chatId}`);
      const { data } = response;
      
      const chatData = chatSchema.parse(data);

      return chatData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data ?? error;
      }

      if (error instanceof ZodError) {
        throw error.message;
      }

      throw error;
    }
  },
});

export const useChat = (chatId: number) => useQuery(chatQueryOptions(chatId));