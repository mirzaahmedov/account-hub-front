import { sendVerificationEmail } from "@/pages/verify-email/api";
import { WarningIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const VerifyEmailCallOut = () => {
  const navigate = useNavigate();

  const sendVerificationEmailMutation = useMutation({
    mutationFn: sendVerificationEmail,
  });

  const handleVerify = () => {
    sendVerificationEmailMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/verify-email");
        toast.success("Verification email sent successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="p-2">
      <div role="alert" className="alert alert-warning alert-soft">
        <WarningIcon className="size-5" />

        <div>
          <strong className="text-sm">Email not verified</strong>
          <p className="text-xs">Please verify your email address to access all features.</p>
        </div>
        <button onClick={handleVerify} className="btn btn-warning">
          Verify now
        </button>
      </div>
    </div>
  );
};
