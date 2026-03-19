import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { authApi } from "./api";

export type UserRole = "tenant" | "landlord" | "admin";

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (data: { fullName: string; phone: string; email: string; password: string; role: UserRole }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const data = await authApi.getProfile();
          setUser({
            id: data.id,
            fullName: data.fullName,
            phone: data.phone,
            email: data.email,
            role: data.role,
          });
        } catch (error) {
          console.error("Failed to load user:", error);
          localStorage.removeItem("auth_token");
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      const data = await authApi.login(phone, password);
      localStorage.setItem("auth_token", data.token);
      setUser({
        id: data.user.id,
        fullName: data.user.fullName,
        phone: data.user.phone,
        email: data.user.email,
        role: data.user.role,
      });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (data: { fullName: string; phone: string; email: string; password: string; role: UserRole }): Promise<boolean> => {
    try {
      const result = await authApi.register(data);
      localStorage.setItem("auth_token", result.token);
      setUser({
        id: result.user.id,
        fullName: result.user.fullName,
        phone: result.user.phone,
        email: result.user.email,
        role: result.user.role,
      });
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
