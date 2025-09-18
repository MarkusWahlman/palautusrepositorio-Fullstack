import type { UserDataType, UserLoginType } from "./user";

export interface AuthContextType {
  user: UserDataType | null;
  login: (data: UserLoginType) => Promise<void>;
  logout: () => void;
}
