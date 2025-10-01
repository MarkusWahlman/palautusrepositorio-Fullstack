import { useReducer } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import NotificationContext, {
  type NotificationAction,
} from "./context/NotificationContext";

const notificationReducer = (
  state: string,
  action: NotificationAction,
): string => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return "You'll see notifications here.";
    default:
      return state;
  }
};

const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "You'll see notifications here.",
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h2>Anecdotes</h2>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
