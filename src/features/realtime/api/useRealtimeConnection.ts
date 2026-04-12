import { useEffect } from "react";
import { socket } from "../../../shared/api/realtime/socket";
import { useAppDispatch } from "../../../shared/lib/store";
import { connected, disconnected } from "../model/realtimeSlice";

export const useRealtimeConnection = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      dispatch(connected(socket.id!));
    });

    socket.on('disconnect', () => {
      dispatch(disconnected());
    });

    return () => {
      socket.disconnect(),
      socket.removeAllListeners();
    }
  }, []);
};