import { TrayIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { sendVerificationEmail } from "./api";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { useEffect } from "react";

const VerifyEmail = () => {
  const { state } = useLocation() as Location<{ from: "register" } | undefined>;

  const navigate = useNavigate();
  const sendVerificationEmailMutation = useMutation({
    mutationFn: sendVerificationEmail,
  });

  useEffect(() => {
    if (state?.from === "register") {
      navigate("", { replace: true, state: null });
      return;
    } else {
      sendVerificationEmailMutation.mutate();
    }
  }, [state, sendVerificationEmailMutation.mutate]);

  console.log({ state });

  return (
    <div className="h-full grid place-items-center">
      <div className="flex flex-col items-center gap-5">
        <div className="size-20 grid place-items-center text-primary bg-primary/20 rounded-full">
          <TrayIcon className="text-4xl" />
        </div>
        <h1 className="w-full max-w-md text-4xl text-center">Verify your email address</h1>
        <p className="w-full max-w-sm text-center opacity-70">
          please check your inbox for a verification link. If you don't see it, please check your spam folder or try resending the verification email.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            sendVerificationEmailMutation.mutate();
          }}
        >
          {sendVerificationEmailMutation.isPending ? <span className="loading loading-spinner"></span> : null} Resend Verification Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
