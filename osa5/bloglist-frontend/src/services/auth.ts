import axios from "axios";
import type { UserLoginType } from "../types/user";
import { toast } from "react-toastify";

const login = async (data: UserLoginType) => {
  try {
    const result = await axios.post("/api/login", data);
    return result.data;
  } catch {
    toast.error(`wrong username or password`);
  }
};

export default { login };
