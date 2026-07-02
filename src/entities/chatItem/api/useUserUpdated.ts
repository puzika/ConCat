import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../../../shared/api/realtime/socket";
import { useAppSelector } from "../../../shared/lib/store";
import { selectUserId } from "../../user";
import { produce } from "immer";
import type { User } from "../../user/model/userSchema";
import type { ChatListItem } from "../../../widgets/sidebar/model/chatListSchema";

export const useUserUpdated = (id: number) => {
  const queryClient = useQueryClient();
  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    const handleUserUpdate = (updatedUser: User) => {
      queryClient.setQueryData(['chatList', { userId }], (chat?: ChatListItem[]) => {
        if (!chat) return;
        
        const updatedChatList = produce(chat, draft => {
          draft.forEach(chatItem => {
            if (chatItem.participant_one.id === id) {
              chatItem.participant_one = updatedUser;
            } else if (chatItem.participant_two.id === id) {
              chatItem.participant_two = updatedUser;
            }
          })
        })

        return updatedChatList;
      });
    }

    socket.on(`user:updated:${id}`, handleUserUpdate);

    return () => {
      socket.off(`user:updated:${id}`, handleUserUpdate);
    }
  }, []);
}