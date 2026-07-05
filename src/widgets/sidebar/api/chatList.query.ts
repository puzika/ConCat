import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { chatListSchema } from "../model/chatListSchema";
import { apiClient } from "../../../shared/config/axios.api";
import axios from "axios";
import { ZodError } from "zod";

const chatListQueryOptions = (id: number) => queryOptions({
  queryKey: ['chatList', { userId: id }] as const,
  queryFn: async () => {
    try {
      const response = await apiClient.get(`/chats?user=${id}`);
      const { data } = response;

      const users = chatListSchema.parse(data);

      return users;
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
});

export const useChatList = (id: number) => useSuspenseQuery(chatListQueryOptions(id));