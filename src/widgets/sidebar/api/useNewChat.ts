import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../../shared/lib/store";
import { selectUserId } from "../../../entities/user";
import { socket } from "../../../shared/api/realtime/socket";

export const useNewChat = () => {
  const queryClient = useQueryClient();
  const id = useAppSelector(selectUserId);

  
  useEffect(() => {
    const handleNewChat = () => {
      queryClient.invalidateQueries({ queryKey: ['chatList']});
    }

    socket.on(`chat:created:${id}`, handleNewChat);

    return () => {
      socket.removeListener(`chat:created:${id}`, handleNewChat);
    }
  });
}