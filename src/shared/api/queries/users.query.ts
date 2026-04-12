import axios from "axios";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { baseUrl } from "../url";
import { userArraySchema, type User } from "../../model/definitions";

const usersQueryFunction = async (id: string) => {
  const response = await axios.get<{ users: User[] }>(`${baseUrl}/users?connectedTo=${id}`);
  const { data } = response;
  const users = userArraySchema.parse(data);

  return users;
}

const usersQueryOptions = (id: string) => queryOptions({
  queryKey: ['users'],
  queryFn: () => usersQueryFunction(id),
});

export const useUsers = (id: string) => useSuspenseQuery(usersQueryOptions(id));