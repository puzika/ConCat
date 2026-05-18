export const SOCKET_EVENTS = {
  CONNECTED: "connect",
  DISCONNECTED: "disconnect",
  MESSAGE_RECEIVED: "message:received",
  MESSAGE_DELETED: "message:deleted",
} as const;

export type SocketEvent = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];