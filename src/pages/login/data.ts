import z from "zod";

export const UserLoginSchema = z.object({
  email: z.email().nonempty("Required field"),
  password: z.string().nonempty("Required field"),
});
export type UserLoginForm = z.infer<typeof UserLoginSchema>;
