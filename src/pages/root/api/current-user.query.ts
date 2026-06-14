import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiClient } from "../../../shared/config/axios.api";
import { userSchema } from "../../../entities/user/model/userSchema";

const currentUserQueryOptions = () => queryOptions({
  queryKey: ['current-user'],
  queryFn: async () => {
    const response = await apiClient.get('/users/me');
    const { data } = response;
    const parsedData = userSchema.parse(data);

    return parsedData;
  },

  staleTime: 1000 * 60 * 5,
});

export const useCurrentUser = () => useQuery(currentUserQueryOptions());