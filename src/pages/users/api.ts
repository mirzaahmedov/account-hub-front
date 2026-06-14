import { privateApi } from "@/lib/http";
import type { User } from "@/models/user";

export async function fetchUsers({ search, sortKey, sortOrder }: { search: string; sortKey?: string; sortOrder?: string }) {
  const res = await privateApi.get<User[]>("/users", {
    params: {
      search,
      sort_key: sortKey,
      sort_order: sortOrder,
    },
  });
  return res.data;
}

export async function updateBatchStatus(ids: number[], status: "active" | "blocked") {
  const res = await privateApi.put<{ updateCount: number }>(`/users/update-batch/status`, {
    ids,
    status,
  });
  return res.data;
}

export async function deleteBatch(ids: number[]) {
  const res = await privateApi.delete<{
    deleteCount: number;
  }>("/users/delete-batch", {
    data: {
      ids,
    },
  });
  return res.data;
}

export async function deleteBatchUnverified(ids: number[]) {
  const res = await privateApi.delete<{
    deleteCount: number;
  }>("/users/delete-batch/unverified", {
    data: {
      ids,
    },
  });
  return res.data;
}
