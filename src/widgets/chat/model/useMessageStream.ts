import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../../../shared/api/realtime/socket";
import { SOCKET_EVENTS } from "../../../shared/config/socket-event";
import { type Chat } from "./chatSchema";
import { messageSchema } from "./messageListSchema";
import z from "zod";

export const useMessageStream = () => {
  const queryClient = useQueryClient();
  const { chatId: unformattedChatId } = useParams();
  const chatId = Number(unformattedChatId);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.MESSAGE_RECEIVED, data => {
      const message = messageSchema.parse(data);
      
      queryClient.setQueryData(['chat', { chatId }], (chatData?: Chat): Chat | void => {
        if (!chatData) return chatData;

        const { messages: prevMessages } = chatData;
        
        let foundOptimistic = false;
        let updatedMessages = prevMessages.map(msg => {
          foundOptimistic = msg.client_id === message.client_id;

          return foundOptimistic ? message : msg;
        });

        if (!foundOptimistic) {
          updatedMessages = [...updatedMessages, message];
        }

        return {
          ...chatData,
          messages: updatedMessages
        }
      })
    })

    socket.on(SOCKET_EVENTS.MESSAGE_DELETED, data => {
      const schema = z.number();
      const messageId = schema.parse(data);

      queryClient.setQueryData(['chat', { chatId }], (chatData?: Chat): Chat | void => {
        if (!chatData) return chatData;

        const { messages: prevMessages } = chatData;
        const updatedMessages = prevMessages.filter(msg => msg.id !== messageId);

        return {
          ...chatData,
          messages: updatedMessages
        }
      })
    })

    return () => {
      socket.removeListener(SOCKET_EVENTS.MESSAGE_RECEIVED);
      socket.removeListener(SOCKET_EVENTS.MESSAGE_DELETED);
    }
  }, []);
}