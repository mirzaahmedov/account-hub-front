import { InputField } from "@/components/InputField";
import { useAuth } from "@/features/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./api";
import { UserLoginSchema, type UserLoginForm } from "./data";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies UserLoginForm,
    resolver: zodResolver(UserLoginSchema),
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
  });

  const handleSubmit = form.handleSubmit((payload) => {
    loginUserMutation.mutate(payload, {
      onSuccess({ user, access_token }) {
        localStorage.setItem("access_token", access_token);
        toast.success("Login successful");

        setUser(user || null);
        navigate("/users");
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  });

  const { errors } = form.formState;
  return (
    <div className="flex h-full prose">
      <div className="flex-1 h-full">
        <form onSubmit={handleSubmit} className="h-full flex flex-col gap-5 items-center justify-center">
          <h5 className="text-4xl font-semibold">Welcome back</h5>

          <fieldset className="fieldset w-full max-w-xs">
            <InputField {...form.register("email")} label="Email" type="email" error={Boolean(errors.email)} errorMessage={errors.email?.message} />
            <InputField
              {...form.register("password")}
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              error={Boolean(errors.password)}
              errorMessage={errors.password?.message}
              tracking={
                <button type="button" onClick={() => setIsPasswordVisible((prev) => !prev)} className="btn btn-sm btn-ghost btn-circle">
                  {isPasswordVisible ? <EyeSlashIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              }
            />
          </fieldset>
          <button type="submit" className="btn btn-primary">
            {loginUserMutation.isPending ? <span className="loading loadin-spinner"></span> : null}
            Login <ArrowRightIcon className="size-4" />
          </button>

          <div className="text-center text-sm">
            Do not have an account?{" "}
            <Link to="/register" className="link text-primary">
              Register
            </Link>
          </div>
        </form>
      </div>
      <div className="flex-1 h-full bg-base-300 vector-background"></div>
    </div>
  );
};

export default Login;
