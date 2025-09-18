import { useCallback, useMemo, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { AuthContextType } from "../types/auth";
import { AuthContext } from "./AuthContext";
import type { UserDataType, UserLoginType } from "../types/user";

import authService from "../services/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<UserDataType | null>("user", null);
  const navigate = useNavigate();

  const login = useCallback(
    async (data: UserLoginType) => {
      const user = await authService.login(data);
      setUser(user);
      navigate("/");
    },
    [navigate, setUser],
  );

  const logout = useCallback(() => {
    setUser(null);
    navigate("/", { replace: true });
  }, [navigate, setUser]);
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
