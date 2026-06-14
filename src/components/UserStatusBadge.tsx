import type { UserStatus } from "@/models/user";
import { formatTitleCase } from "@/utils/formatTitleCase";
import classNames from "classnames";
import type { FC } from "react";

export const UserStatusBadge: FC<{
  status: UserStatus;
  className?: string;
}> = ({ status, className }) => {
  return (
    <span
      className={classNames("badge badge-sm font-medium", className, {
        "badge-success": status === "active",
        "badge-warning": status === "unverified",
        "badge-error": status === "blocked",
      })}
    >
      {formatTitleCase(status)}
    </span>
  );
};
