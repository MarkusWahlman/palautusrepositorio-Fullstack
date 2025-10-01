import { useContext, useReducer } from "react";
import { useSelector } from "react-redux";
import NotificationContext from "../context/NotificationContext";

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification} </div>;
};

export default Notification;
