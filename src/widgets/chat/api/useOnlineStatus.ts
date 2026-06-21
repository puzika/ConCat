import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { type Chat } from "../model/chatSchema";
import { type StatusUpdatedPayload } from "../../../shared/model/socketEventPayloadTypes";
import { socket } from "../../../shared/api/realtime/socket";
import { produce } from "immer";

export const useOnlineStatus = (chatId: number, targetUserId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStatusUpdated = ({ isOnline, lastSeen }: StatusUpdatedPayload) => {
      queryClient.setQueryData(['chat', { chatId }], (chat?: Chat): Chat | void => {
        if (!chat) return;


        return produce(chat, draft => {
          const { participant_one, participant_two } = draft;
          const targetParticipant = participant_one.id === targetUserId ? participant_one : participant_two;

          targetParticipant.is_online = isOnline;

          if (!lastSeen) return;

          targetParticipant.last_seen = lastSeen;
        });
      });
    }

    socket.on(`status:updated:${targetUserId}`, handleStatusUpdated);

    return () => {
      socket.removeListener(`status:updated:${targetUserId}`, handleStatusUpdated);
    }
  }, [targetUserId, chatId]);
}