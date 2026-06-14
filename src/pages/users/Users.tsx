import { BroomIcon, LockKeyIcon, LockKeyOpenIcon, MagnifyingGlassIcon, TrashIcon } from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteBatch, deleteBatchUnverified, fetchUsers, updateBatchStatus } from "./api";
import { UsersTable, type UserTableSorting } from "./UsersTable";
import { useDebounce } from "@uidotdev/usehooks";
import type { User } from "@/models/user";
import toast from "react-hot-toast";

function getSortParams(sorting: UserTableSorting) {
  const key = Object.keys(sorting)[0] as keyof User;
  const order = sorting[key];
  return {
    sortKey: key,
    sortOrder: order,
  };
}

const Users = () => {
  const [selection, setSelection] = useState<number[]>([]);
  const [sorting, setSorting] = useState<UserTableSorting>({
    last_login_at: "desc",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const sortParams = getSortParams(sorting);

  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", debouncedSearchQuery, sorting],
    queryFn: () =>
      fetchUsers({
        search: debouncedSearchQuery,
        sortKey: sortParams.sortKey,
        sortOrder: sortParams.sortOrder,
      }),
  });

  const deleteBatchMutation = useMutation({
    mutationFn: () => deleteBatch(selection),
  });
  const deleteBatchUnverifiedMutation = useMutation({
    mutationFn: () => deleteBatchUnverified(selection),
  });
  const updateBatchStatusMutation = useMutation({
    mutationFn: (status: "active" | "blocked") => updateBatchStatus(selection, status),
  });

  const isAllSelected = users?.every((user) => selection.includes(user.id)) || false;
  const isNoneSelected = users?.every((user) => !selection.includes(user.id)) || false;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelection((prev) => prev.filter((id) => users?.findIndex((user) => user.id === id) === -1));
    } else {
      setSelection((prev) => {
        const missing = users?.filter((user) => !prev.includes(user.id)) || [];
        const missingIds = missing.map((user) => user.id);
        return [...prev, ...missingIds];
      });
    }
  };

  const handleSort = (key: keyof User, value: "asc" | "desc" | undefined) => {
    setSorting({
      [key]: value,
    });
  };

  const handleDelete = (onlyUnverified: boolean) => {
    const handleSuccess = ({ deleteCount }: { deleteCount: number }) => {
      if (deleteCount > 0) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success(`Deleted ${deleteCount} users`);
      } else {
        toast.error("No users were deleted");
      }
    };
    if (onlyUnverified) {
      deleteBatchUnverifiedMutation.mutate(undefined, {
        onSuccess: handleSuccess,
        onError(error) {
          toast.error(error.message);
        },
      });
    } else {
      deleteBatchMutation.mutate(undefined, {
        onSuccess: handleSuccess,
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  };

  const handleUpdateStatus = (status: "active" | "blocked") => {
    updateBatchStatusMutation.mutate(status, {
      onSuccess: ({ updateCount }) => {
        if (updateCount > 0) {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          toast.success(`Updated ${updateCount} users`);
        } else {
          toast.error("No users were updated");
        }
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center py-2 pr-5">
        <ul className="menu menu-horizontal menu-sm gap-2 px-5">
          <li>
            <button disabled={!selection.length} title="block" className="btn btn-sm btn-primary" onClick={() => handleUpdateStatus("blocked")}>
              <LockKeyIcon className="size-4 shrink-0" />
              Block
            </button>
          </li>
          <li>
            <button
              disabled={!selection.length}
              title="unblock"
              className="btn btn-sm btn-primary btn-square"
              onClick={() => handleUpdateStatus("active")}
            >
              <LockKeyOpenIcon className="size-4 shrink-0" />
            </button>
          </li>
          <li>
            <button disabled={!selection.length} title="delete" className="btn btn-sm btn-secondary btn-square" onClick={() => handleDelete(false)}>
              <TrashIcon className="size-4 shrink-0" />
            </button>
          </li>
          <li>
            <button
              disabled={!selection.length}
              title="delete unverified"
              className="btn btn-sm btn-secondary btn-square"
              onClick={() => handleDelete(true)}
            >
              <BroomIcon className="size-4 shrink-0" />
            </button>
          </li>
        </ul>

        <span>
          <b>{selection.length}</b> selected
        </span>

        <label className="input ml-auto">
          <MagnifyingGlassIcon className="size-4" />
          <input type="search" required placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
      </div>
      <UsersTable
        isAllSelected={isAllSelected}
        isPartiallySelected={!isAllSelected && !isNoneSelected}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message}
        selection={selection}
        users={users ?? []}
        sorting={sorting}
        onSort={handleSort}
        onSelectAll={handleSelectAll}
        onSelectRow={(row) => {
          setSelection((prev) => {
            if (prev.includes(row.id)) {
              return prev.filter((id) => id !== row.id);
            } else {
              return [...prev, row.id];
            }
          });
        }}
      />
    </div>
  );
};

export default Users;
