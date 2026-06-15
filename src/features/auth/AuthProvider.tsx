import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "@/models/user";
import { useMutation } from "@tanstack/react-query";
import { getMe } from "./api";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleSetUser = (user: User | null) => {
    if (user) {
      setIsAuthenticated(true);
      setUser(user);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const getMeMutation = useMutation({
    mutationFn: getMe,
    onSuccess: ({ user }) => {
      handleSetUser(user);
    },
    onError: () => {
      handleSetUser(null);
    },
  });

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname !== "/login" && pathname !== "/register") {
      getMeMutation.mutate();
    }
  }, [getMeMutation.mutate]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser: handleSetUser, isLoading: getMeMutation.isPending }}>
      {children}
    </AuthContext.Provider>
  );
};
