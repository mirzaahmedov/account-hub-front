import { CheckCircleIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const EmailVerified = () => {
  return (
    <div className="h-full grid place-items-center">
      <div className="flex flex-col items-center gap-5">
        <div className="size-20 grid place-items-center text-success bg-success/20 rounded-full">
          <CheckCircleIcon className="text-4xl" weight="fill" />
        </div>

        <h1 className="w-full max-w-md text-4xl text-center">Email Verified</h1>

        <p className="w-full max-w-sm text-center opacity-70">
          Your email address has been successfully verified. You now have full access to your account and can continue using the application.
        </p>

        <Link to="/" className="btn btn-success">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default EmailVerified;
