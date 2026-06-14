import { Link } from "react-router-dom";
import { ThemeSelector } from "./ThemeSelector";
import { SignOutIcon } from "@phosphor-icons/react";
import { useAuth } from "@/features/auth/useAuth";
import { UserStatusBadge } from "./UserStatusBadge";

export const AppHeader = () => {
  const { user, setUser } = useAuth();

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-300">
      <div className="navbar-start">
        <Link to="/" className="text-lg btn btn-ghost">
          AccountHub
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end gap-2">
        <ThemeSelector />
        {user ? (
          <div className="flex items-center gap-2.5">
            <div className="avatar avatar-placeholder">
              <div className="bg-primary text-neutral-content w-8 rounded-full">
                <span className="text-xs">
                  {user.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <UserStatusBadge status={user.status} className="badge-xs badge-soft" />
            </div>
          </div>
        ) : null}
        <button className="btn btn-ghost btn-circle" onClick={handleLogOut}>
          <SignOutIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};
