import { NextRequest, NextResponse } from "next/server";
import members from "@/data/members.json";

export async function GET(req: NextRequest) {
  return new NextResponse(JSON.stringify(members), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
