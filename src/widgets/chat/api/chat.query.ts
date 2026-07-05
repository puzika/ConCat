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
        const responseData = error.response?.data;
        let errorMessage = responseData ? responseData.error : error.message;

        throw new Error(errorMessage);
      }

      if (error instanceof ZodError) {
        throw new Error(error.message);
      }

      throw error;
    }
  },

  throwOnError: false,
});

export const useChat = (chatId: number) => useQuery(chatQueryOptions(chatId));