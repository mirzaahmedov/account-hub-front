import { emitter } from "@/lib/emitter";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AppRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerifyEmail = () => {
      navigate("/verify-email");
    };

    emitter.on("auth:verify-email", handleVerifyEmail);

    return () => {
      emitter.off("auth:verify-email", handleVerifyEmail);
    };
  }, []);
  return <Outlet />;
};
