import z from "zod";

export const UserCreateSchema = z.object({
  name: z.string().nonempty("Required field"),
  email: z.email(),
  password: z.string().nonempty("Required field"),
});
export type UserCreateForm = z.infer<typeof UserCreateSchema>;
