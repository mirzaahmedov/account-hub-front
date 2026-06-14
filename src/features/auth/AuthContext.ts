import type { User } from "@/models/user";
import { createContext } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: true,
  isLoading: true,
  user: null,
  setUser() {},
});
