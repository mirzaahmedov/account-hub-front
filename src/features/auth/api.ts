import { privateApi } from "@/lib/http";
import type { User } from "@/models/user";

export async function getMe() {
  const res = await privateApi.get<{ user: User }>("/auth/me");
  return res.data;
}
