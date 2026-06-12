import { useMutation } from "@tanstack/react-query";
import { type TSignUpSchema as SignupBody } from "../model/definitions";
import { apiClient } from "../../../shared/config/axios.api";

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: SignupBody) => {
      return await apiClient.post(`/auth/signup`, data, { withCredentials: true });
    },

    onError(error) {
      console.log("Error occurred during sign up: ", error.message);
    }
  });
}