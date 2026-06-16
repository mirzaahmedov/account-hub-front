import { useAuth } from "@/features/auth/useAuth";
import { emitter } from "@/lib/emitter";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AppRoot = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  useEffect(() => {
    const handleVerifyEmail = () => navigate("/verify-email");
    const handleLogOut = () => {
      setUser(null);
      localStorage.removeItem("access_token");
    };

    emitter.on("auth:verify-email", handleVerifyEmail);
    emitter.on("auth:logout", handleLogOut);

    return () => {
      emitter.off("auth:verify-email", handleVerifyEmail);
      emitter.off("auth:logout", handleLogOut);
    };
  }, []);
  return <Outlet />;
};
