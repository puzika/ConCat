import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { type ChatListItem } from "../../../widgets/sidebar/model/chatListSchema";
import { type StatusUpdatedPayload } from "../../../shared/model/socketEventPayloadTypes";
import { socket } from "../../../shared/api/realtime/socket";
import { produce } from 'immer';

export const useItemOnline = (participants: {currUserId: number, targetUserId: number}) => {
  const { currUserId, targetUserId } = participants;
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStatusUpadated = ({ isOnline, lastSeen }: StatusUpdatedPayload) => {
      queryClient.setQueryData(['chatList', { userId: currUserId }], (currChatList?: ChatListItem[]) => {
        if (!currChatList) return;

        const updatedChatList = currChatList.map(chatItem => {
          const mutatedChatItem = produce(chatItem, draftState => {
            const { participant_one, participant_two } = draftState;
            const targetParticipant = 
              participant_one.id === targetUserId ? participant_one :
              participant_two.id === targetUserId ? participant_two :
              null;
            
            if (!targetParticipant) return;

            targetParticipant.is_online = isOnline;

            if (!lastSeen) return;

            targetParticipant.last_seen = lastSeen;
          });

          return mutatedChatItem;
        });

        return updatedChatList;
      });
    }

    socket.on(`status:updated:${targetUserId}`, handleStatusUpadated);

    return () => {
      socket.removeListener(`online:${targetUserId}`, handleStatusUpadated);
    }
  }, []);
}