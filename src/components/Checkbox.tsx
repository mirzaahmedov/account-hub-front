import { useEffect, useRef, type FC, type InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  isIndeterminate?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({ isIndeterminate, ...props }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = isIndeterminate || false;
    }
  }, [isIndeterminate]);

  return <input ref={ref} type="checkbox" {...props} />;
};
