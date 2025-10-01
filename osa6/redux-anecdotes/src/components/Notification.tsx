import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification} </div>;
};

export default Notification;
