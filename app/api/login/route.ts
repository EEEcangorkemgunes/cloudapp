import { findUserByEmail } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello World!" });
}
export async function POST(req: NextRequest) {
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
  //token üret

  return new NextResponse(JSON.stringify({ code: 1 }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
