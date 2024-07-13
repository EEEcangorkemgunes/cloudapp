import { NextRequest, NextResponse } from "next/server";
import members from "@/data/members.json";
import fs from "fs";
import path from "path";

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

export async function POST(req: NextRequest) {
  const data = await req.json();
  fs.writeFile(
    path.join(process.cwd(), "data", `1.json`), //${data.fileName}
    JSON.stringify(data, null, 2),
    (err) => {
      console.log(err);
    }
  );

  return new NextResponse(JSON.stringify({ message: "ok" }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
