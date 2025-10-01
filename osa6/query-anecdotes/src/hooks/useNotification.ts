import { useContext, useRef } from "react";
import NotificationContext, {
  type NotificationAction,
} from "../context/NotificationContext";

let timeoutId: ReturnType<typeof setTimeout> | null = null;

export const useNotification = () => {
  const [_, dispatch] = useContext(NotificationContext);

  const showNotification = (message: string, time = 5) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    dispatch({ type: "SET", payload: message } as NotificationAction);

    timeoutId = setTimeout(() => {
      dispatch({ type: "CLEAR" } as NotificationAction);
      timeoutId = null;
    }, time * 1000);
  };

  return showNotification;
};
