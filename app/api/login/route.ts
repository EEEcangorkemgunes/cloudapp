import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {}
export async function POST(req: NextRequest) {
  const body = await req.json();
  //database bak
  //token üret

  return new NextResponse(JSON.stringify(body), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
