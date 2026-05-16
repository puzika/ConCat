import { useEffect } from "react";
import { socket } from "../../../shared/api/realtime/socket";
import { useAppDispatch } from "../../../shared/lib/store";
import { connected, disconnected } from "./realtime.slice";

export const useRealtimeConnection = (authenticated: boolean) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authenticated) return;

    socket.connect();

    socket.on('connect', () => {
      console.log(socket.id, 'successfully connected');
      dispatch(connected(socket.id!));
    }); 

    socket.on('disconnect', () => {
      dispatch(disconnected());
    });

    return () => {
      socket.disconnect(),
      socket.removeAllListeners();
    }
  }, [authenticated]);
};