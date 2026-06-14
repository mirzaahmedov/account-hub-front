import { WarningCircleIcon } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type { FC, InputHTMLAttributes, ReactNode } from "react";

const fieldVariants = cva("input", {
  variants: {
    error: { true: "input-error" },
  },
});

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof fieldVariants> {
  label: string;
  errorMessage?: string;
  leading?: ReactNode;
  tracking?: ReactNode;
}

export const InputField: FC<InputFieldProps> = ({ label, error, errorMessage, leading, tracking, ...props }) => {
  return (
    <>
      <span className="label">{label}</span>
      <label
        className={fieldVariants({
          error,
        })}
      >
        {leading}
        <input {...props} />
        {tracking}
      </label>
      {errorMessage ? (
        <p className="text-error">
          <WarningCircleIcon className="inline-block" /> <span className="align-middle">{errorMessage}</span>
        </p>
      ) : null}
    </>
  );
};
