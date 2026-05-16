import { useEffect } from "react";
import { socket } from "../../../shared/api/realtime/socket";
import { useAppDispatch } from "../../../shared/lib/store";
import { SOCKET_EVENTS } from "../../../shared/config/socket-event";
import { connected, disconnected } from "./realtime.slice";

export const useRealtimeConnection = (authenticated: boolean) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authenticated) return;

    socket.connect();

    socket.on(SOCKET_EVENTS.CONNECTED, () => {
      dispatch(connected(socket.id!));
    }); 

    socket.on(SOCKET_EVENTS.DISCONNECTED, () => {
      dispatch(disconnected());
    });

    return () => {
      socket.disconnect();
      socket.removeListener(SOCKET_EVENTS.CONNECTED);
      socket.removeListener(SOCKET_EVENTS.DISCONNECTED);
    }
  }, [authenticated]);
};