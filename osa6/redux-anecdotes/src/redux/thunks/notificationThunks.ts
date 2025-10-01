import {
  clearNotification,
  setNotification,
} from "../slices/notificationSlice";
import type { AppDispatch } from "../store";

let timeoutId: ReturnType<typeof setTimeout> | null = null;

export const showNotification =
  (message: string, time = 5) =>
  (dispatch: AppDispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    dispatch(setNotification(message));
    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
      timeoutId = null;
    }, time * 1000);
  };
