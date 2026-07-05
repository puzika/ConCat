import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../../shared/lib/store";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { type TSignUpSchema as SignupBody } from "../model/definitions";
import { userSchema } from "../../../entities/user/model/userSchema";
import { updateUserInfo } from "../../../entities/user";
import { apiClient } from "../../../shared/config/axios.api";
import { ZodError } from "zod";
import axios from "axios";

export const useSignup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignupBody) => {
      try {
        const response = await apiClient.post(`/auth/signup`, data, { withCredentials: true });
        const parsedData = userSchema.parse(response.data);

        return parsedData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const responseData = error.response?.data;
          let errorMessage = responseData ? responseData.error : error.message;

          throw new Error(errorMessage);
        }

        if (error instanceof ZodError) {
          throw new Error(error.message);
        }

        throw error;
      }
    },

    onSuccess(data) {
      dispatch(updateUserInfo(data));

      queryClient.setQueryData(['current-user'], data);

      navigate('/', { replace: true });
    },

    onError(error) {
      console.log("Error occurred during sign up: ", error.message);
    }
  });
}