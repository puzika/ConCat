import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../shared/config/axios.api";
import { usersSchema } from "../../../entities/user/model/userSchema";
import axios from "axios";
import { ZodError } from "zod";

export const useUsers = (searchTerm: string) => {
  return useQuery({
    queryKey: ['users', { searchTerm }],
    queryFn: async () => {
      try {
        const response = await apiClient.get(`/users/find?search=${searchTerm}`);
        const parsedData = usersSchema.parse(response.data);

        return parsedData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error.response?.data ?? error;
        }

        if (error instanceof ZodError) {
          throw error.message
        }

        throw error;
      }
    },

    enabled: searchTerm.length > 0,
  });
}