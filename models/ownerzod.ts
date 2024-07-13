import z from "zod";

export const OwnerRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters!"),
});
