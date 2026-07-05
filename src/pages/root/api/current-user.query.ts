import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiClient } from "../../../shared/config/axios.api";
import { userSchema } from "../../../entities/user/model/userSchema";
import axios from "axios";
import { ZodError } from "zod";

const currentUserQueryOptions = () => queryOptions({
  queryKey: ['current-user'],
  queryFn: async () => {
    try {
      const response = await apiClient.get('/users/me');
      const { data } = response;
      const parsedData = userSchema.parse(data);

      return parsedData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || error.message;
        throw new Error(errorMessage);
      }

      if (error instanceof ZodError) {
        throw new Error(`Data validation failed: ${error.message}`);
      }

      throw error;
    }
  },

  throwOnError: false,
  staleTime: 1000 * 60 * 5,
});

export const useCurrentUser = () => useQuery(currentUserQueryOptions());