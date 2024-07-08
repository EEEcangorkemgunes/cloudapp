"use server";
import { users } from "@/data/user";
import { revalidatePath } from "next/cache";

export const findUserByEmail = async (email: string) => {
  return users.find((user) => user.email === email);
};

export const getAllUsers = async () => {
  revalidatePath("/users");
  return users;
};
