import type { ReactNode } from "react";
import { useAppSelector } from "../../../shared/lib/store";
import { selectUsername } from "../../../entities/user";
import { useRealtimeConnection } from "./useRealtimeConnection";

type RealtimeProviderProps = {
  children: ReactNode | ReactNode[],
}

export const RealtimeProvider = ({ children }: RealtimeProviderProps) => {
  const username = useAppSelector(selectUsername);
  useRealtimeConnection(!!username);

  return (
    <>{children}</>
  )
}