import { Checkbox } from "@/components/Checkbox";
import { UserStatusBadge } from "@/components/UserStatusBadge";
import type { User } from "@/models/user";
import { formatDate } from "@/utils/formatDate";
import { SortAscendingIcon, SortDescendingIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import type { ButtonHTMLAttributes, FC } from "react";

export type UserTableSorting = Partial<Record<keyof User, "asc" | "desc">>;

export const UsersTable: FC<{
  isLoading: boolean;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  isError: boolean;
  errorMessage?: string;
  users: User[];
  selection: number[];
  sorting: UserTableSorting;
  onSelectRow: (row: User) => void;
  onSelectAll: () => void;
  onSort: (key: keyof User, value: "asc" | "desc" | undefined) => void;
}> = ({ isError, errorMessage, isLoading, isAllSelected, isPartiallySelected, users, selection, sorting, onSelectRow, onSelectAll, onSort }) => {
  return (
    <div className="flex-1 min-h-0 overflow-auto border border-base-content/5 bg-base-100">
      {isLoading ? (
        <div className="h-full grid place-items-center">
          <span className="loading loading-spinner"></span>
        </div>
      ) : isError ? (
        <div className="h-full grid place-items-center">
          <p className="text-error">{errorMessage}</p>
        </div>
      ) : (
        <table className="w-full table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th className="w-10">
                <label>
                  <Checkbox
                    className="checkbox checkbox-primary"
                    checked={isAllSelected}
                    isIndeterminate={isPartiallySelected}
                    onChange={onSelectAll}
                  />
                </label>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  Fullname <SortButton value={sorting["name"]} onClick={() => onSort("name", getNextSortValue(sorting["name"]))} />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  Email <SortButton value={sorting["email"]} onClick={() => onSort("email", getNextSortValue(sorting["email"]))} />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  Status <SortButton value={sorting["status"]} onClick={() => onSort("status", getNextSortValue(sorting["status"]))} />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  Last Login{" "}
                  <SortButton value={sorting["last_login_at"]} onClick={() => onSort("last_login_at", getNextSortValue(sorting["last_login_at"]))} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users)
              ? users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <label>
                        <Checkbox className="checkbox checkbox-primary" checked={selection.includes(user.id)} onChange={() => onSelectRow(user)} />
                      </label>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <UserStatusBadge status={user.status} />
                    </td>
                    <td>{user.last_login_at ? formatDate(user.last_login_at) : null}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      )}
    </div>
  );
};

const SortButton: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    value: undefined | "asc" | "desc";
  }
> = ({ value, ...props }) => {
  return (
    <button
      className={classNames("btn btn-circle btn-sm", {
        "btn-primary": value !== undefined,
        "btn-ghost": value === undefined,
      })}
      {...props}
    >
      {value === "asc" ? (
        <SortAscendingIcon className="size-5" />
      ) : value === "desc" ? (
        <SortDescendingIcon className="size-5" />
      ) : (
        <SortDescendingIcon className="size-5 opacity-50" />
      )}
    </button>
  );
};

function getNextSortValue(value: undefined | "asc" | "desc") {
  if (value === "asc") return undefined;
  if (value === "desc") return "asc";
  return "desc";
}
