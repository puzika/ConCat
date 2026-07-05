import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../shared/config/axios.api";
import { createChatSchema, type TCreateChat } from "../model/createChatSchema";
import { ZodError } from "zod";
import axios from "axios";

export const useCreateChat = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: TCreateChat) => {
      try {
        const response = await apiClient.post(`/chats`, data);
        const parsedData = createChatSchema.parse(response.data);

        return parsedData;
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

    onSuccess(data) {
      const { id } = data;
      navigate(`/chat/${id}`, { replace: true });
    },

    onError(error) {
      console.log("Error occurred during sign in: ", error.message);
    }
  });
}