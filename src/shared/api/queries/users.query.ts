import axios from "axios";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { baseUrl } from "../url";
import { userArraySchema } from "../../model/definitions";

const usersQueryFunction = async (id: number) => {
  const response = await axios.get(`${baseUrl}/users/${id}`);
  const { data } = response;
  const users = userArraySchema.parse(data);

  return users;
}

const usersQueryOptions = (id: number) => queryOptions({
  queryKey: ['users'],
  queryFn: () => usersQueryFunction(id),
});

export const useUsers = (id: number) => useSuspenseQuery(usersQueryOptions(id));