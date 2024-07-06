import { users } from "@/data/user";

export const findUserByEmail = async (email: string) => {
  return users.find((user) => user.email === email);
};
