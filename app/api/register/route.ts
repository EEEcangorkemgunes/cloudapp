import { owners } from "@/data/owners";
import { findUserByEmail } from "@/lib/user";
import { OwnerRegisterSchema } from "@/models/ownerzod";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = OwnerRegisterSchema.safeParse(body);
  if (user.success) {
    const registeredUser = await findUserByEmail(user.data.email);
    if (!registeredUser) {
      owners.push({ ...user.data, id: crypto.randomUUID() });
      return new NextResponse(null, {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }
  }
  return new NextResponse(JSON.stringify({ code: 0 }), {
    status: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
