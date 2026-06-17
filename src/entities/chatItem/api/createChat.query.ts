import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../shared/config/axios.api";
import { createChatSchema, type TCreateChat } from "../model/createChatSchema";
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
          throw error.response?.data ?? error;
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