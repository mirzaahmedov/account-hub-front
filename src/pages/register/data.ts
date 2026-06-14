import z from "zod";

export const UserCreateSchema = z.object({
  name: z.string().nonempty("Required field"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type UserCreateForm = z.infer<typeof UserCreateSchema>;
