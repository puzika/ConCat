import { useMutation } from "@tanstack/react-query";
import { type TSignInSchema as SigninBody } from "../model/definitions";
import { apiClient } from "../../../shared/config/axios.api";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../shared/lib/store";
import { userSchema } from "../../../entities/user/model/userSchema";
import { updateUserInfo } from "../../../entities/user";
import axios from "axios";

export const useSignin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SigninBody) => {
      try {
        const response = await apiClient.post(`/auth/signin`, data);
        const parsedData = userSchema.parse(response.data);

        return parsedData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error.response?.data ?? error;
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
      console.log("Error occurred during sign in: ", error.message);
    }
  });
}