import { useMutation } from "@tanstack/react-query";
import { type TSignInSchema as SigninBody } from "../model/definitions";
import { apiClient } from "../../../shared/config/axios.api";

export const useSignin = () => {
  return useMutation({
    mutationFn: async (data: SigninBody) => {
      return await apiClient.post(`/auth/signin`, data, { withCredentials: true });
    },

    onError(error) {
      console.log("Error occurred during sign in: ", error.message);
    }
  });
}