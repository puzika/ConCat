import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../shared/config/axios.api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      try {
        return await apiClient.post('/auth/logout');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error.response?.data || error.message;
        }

        throw error;
      }
    },

    onSuccess() {
      navigate('/auth/signin', { replace: true });
    }
  });
}