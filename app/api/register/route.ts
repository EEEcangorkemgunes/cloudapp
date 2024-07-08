import { users } from "@/data/user";
import { findUserByEmail } from "@/lib/user";
import { UserRegisterSchema } from "@/models/userzod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = UserRegisterSchema.safeParse(body);
  if (user.success) {
    const registeredUser = await findUserByEmail(user.data.email);
    if (!registeredUser) {
      users.push(user.data);
      return new NextResponse(null, {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }
  }
  return new NextResponse(JSON.stringify({ message: "Bad Request" }), {
    status: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
