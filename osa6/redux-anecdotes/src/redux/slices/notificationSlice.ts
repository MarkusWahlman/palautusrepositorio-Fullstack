import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = "You'll see notifications here.";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<string>) {
      return action.payload;
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
