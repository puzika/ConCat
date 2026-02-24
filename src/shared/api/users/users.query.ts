import axios from "axios";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { baseUrl } from "../url";
import { userSchema, type User } from "../../model/definitions";

const usersQueryFunction = async () => {
  const response = await axios.get<{ users: User[] }>(`${baseUrl}/users`);
  const { data } = response;
  userSchema.parse(data.users[0]);

  return data.users;
}

const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: usersQueryFunction,
});

export const useUsers = () => {
  return useSuspenseQuery(usersQueryOptions);
}