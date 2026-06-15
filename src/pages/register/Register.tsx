import { InputField } from "@/components/InputField";
import { useAuth } from "@/features/auth/useAuth";
import { emitter } from "@/lib/emitter";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { registerUser } from "./api";
import { UserCreateSchema, type UserCreateForm } from "./data";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { setUser } = useAuth();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } satisfies UserCreateForm,
    resolver: zodResolver(UserCreateSchema),
  });

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
  });

  const handleSubmit = form.handleSubmit((payload) => {
    registerUserMutation.mutate(payload, {
      onSuccess({ user, access_token }) {
        setUser(user || null);
        localStorage.setItem("access_token", access_token);

        toast.success("Registration was successful! Please verify your email.");

        emitter.emit("auth:verify-email");
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
          <h5 className="text-4xl font-semibold">Get Started</h5>

          <fieldset className="fieldset w-full max-w-xs">
            <InputField {...form.register("email")} label="Email" type="text" error={Boolean(errors.email)} errorMessage={errors.email?.message} />
            <InputField {...form.register("name")} label="Fullname" type="text" error={Boolean(errors.name)} errorMessage={errors.name?.message} />
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
            {registerUserMutation.isPending ? <span className="loading loadin-spinner"></span> : null}
            Register <ArrowRightIcon className="size-4" />
          </button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link text-primary">
              Login
            </Link>
          </div>
        </form>
      </div>
      <div className="flex-1 h-full bg-base-300 vector-background"></div>
    </div>
  );
};

export default Register;
