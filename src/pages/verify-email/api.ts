import { privateApi } from "@/lib/http";

export async function sendVerificationEmail(): Promise<void> {
  const res = await privateApi.post("/users/send-verification-email");
  return res.data;
}
