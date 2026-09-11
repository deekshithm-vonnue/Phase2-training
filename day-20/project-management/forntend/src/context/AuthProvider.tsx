import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/auth";
import { authApi } from "../apiclient/authapi";
import { AuthContext, type AuthContextType } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const logout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const initaializeAuth = async () => {
      try {
        const savedToken =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        if (savedToken) {
          const user = await authApi.me();
          setUser(user);
        }
      } catch (error) {
        console.log("failed to restore session", error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    initaializeAuth();
  }, []);

  const login = (userData: User, token: string, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem("token", token);
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", token);
      localStorage.removeItem("token");
    }
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
