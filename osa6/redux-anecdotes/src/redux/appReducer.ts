import { combineReducers } from "@reduxjs/toolkit";

import filter from "./slices/filterSlice";
import anecdotes from "./slices/anecdotesSlice";
import notification from "./slices/notificationSlice";

export default combineReducers({ anecdotes, filter, notification });
