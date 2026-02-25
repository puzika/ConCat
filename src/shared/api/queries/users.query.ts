import axios from "axios";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { baseUrl } from "../url";
import { userArraySchema, type User } from "../../model/definitions";

const usersQueryFunction = async () => {
  const response = await axios.get<{ users: User[] }>(`${baseUrl}/users`);
  const { data } = response;
  const users = userArraySchema.parse(data.users);

  return users;
}

const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: usersQueryFunction,
});

export const useUsers = () => {
  return useSuspenseQuery(usersQueryOptions);
}