import { type ReactNode } from "react";

export type MessageAction = {
  icon: ReactNode,
  desc: string,
  actionHandler: () => void,
}