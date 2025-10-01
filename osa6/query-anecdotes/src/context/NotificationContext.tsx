import { createContext, type Dispatch } from "react";

export type NotificationAction =
  | { type: "SET"; payload: string }
  | { type: "CLEAR" };

const NotificationContext = createContext<
  [string, Dispatch<NotificationAction>]
>(["", () => {}]);
export default NotificationContext;
