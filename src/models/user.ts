export type UserStatus = "unverified" | "blocked" | "active";

export interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  is_email_verified: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}
