import { useAuth } from "@/features/auth/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { VerifyEmailCallOut } from "./VerifyEmailCallout";

export const AuthLayout = () => {
  const { pathname } = useLocation();
  const { isLoading, user, isAuthenticated } = useAuth();

  return isLoading ? (
    <div className="h-full grid place-items-center">
      <span className="loading loading-spinner"></span>
    </div>
  ) : isAuthenticated ? (
    <div className="h-full flex flex-col">
      <AppHeader />
      {!user?.is_email_verified && !pathname.startsWith("/verify-email") && !pathname.startsWith("/email-verified") && <VerifyEmailCallOut />}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
