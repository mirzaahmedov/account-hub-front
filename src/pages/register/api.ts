import { publicApi } from "@/lib/http";
import type { UserCreateForm } from "./data";
import type { User } from "@/models/user";

export async function registerUser(payload: UserCreateForm) {
  const res = await publicApi.post<{
    user: User;
    access_token: string;
  }>("/auth/register", payload);
  return res.data;
}
