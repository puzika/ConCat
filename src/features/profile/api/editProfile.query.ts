import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../shared/config/axios.api";
import { useAppSelector, useAppDispatch } from "../../../shared/lib/store";
import { selectUserId, updateUserInfo } from "../../../entities/user";
import { type TProfileSchema } from "../model/profile.schema";
import { type User } from "../../../entities/user/model/userSchema";
import axios from "axios";

export const useEditProfile = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectUserId);

  return useMutation({
    mutationFn: async (profile: TProfileSchema) => {
      try {
        const response = await apiClient.patch<User>(`/users/${id}`, profile);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error.response?.data || error.message;
        }

        throw error;
      }
    },

    onSuccess(data) {
      dispatch(updateUserInfo(data));
    }
  });
}