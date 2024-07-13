"use server";
import { owners } from "@/data/owners";
import { revalidatePath } from "next/cache";

export const findUserByEmail = async (email: string) => {
  return owners.find((owner) => owner.email === email);
};

export const getAllUsers = async () => {
  revalidatePath("/users");
  return owners;
};
