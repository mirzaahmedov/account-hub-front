import { publicApi } from "@/lib/http";
import type { UserLoginForm } from "./data";
import type { User } from "@/models/user";

export async function loginUser(payload: UserLoginForm) {
  const res = await publicApi.post<{
    user: User;
    access_token: string;
  }>("/auth/login", payload);
  return res.data;
}
