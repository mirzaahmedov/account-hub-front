import { useAuth } from "@/features/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export const AuthLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();

  return isLoading ? (
    <div className="h-full grid place-items-center">
      <span className="loading loading-spinner"></span>
    </div>
  ) : isAuthenticated ? (
    <div className="h-full flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
