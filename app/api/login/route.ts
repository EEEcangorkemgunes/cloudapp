import { findUserByEmail } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello World!" });
}
export async function POST(req: NextRequest) {
  const cks = cookies();
  const body = await req.json();
  if (!body.email || !body.password) {
    return new NextResponse(JSON.stringify({ code: 0 }), {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  //database bak
  const user = await findUserByEmail(body.email);
  if (!user) {
    return new NextResponse(JSON.stringify({ code: 2 }), {
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  if (body.password !== user.password) {
    return new NextResponse(JSON.stringify({ code: 3 }), {
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  const owner = {
    email: user.email,
    id: user.id,
  };
  const secret = process.env.AUTH_SECRET || "thismustbeasecret";
  const token = jwt.sign(owner, secret, { expiresIn: "12h" });
  console.log("token:", token);

  return Response.json(
    { code: 1, Authorization: token },
    {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `asd=white`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
