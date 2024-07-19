import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

type User = {
  email: string;
  id: string;
  iat: bigint;
  exp: bigint;
};

/**
 * Below section is for GET responses
 * GET is to get members.json that belongs to requester
 */

export async function GET(req: NextRequest) {
  const token = headers().get("Authorization")?.split(" ")[1];
  if (!token) {
    return new Response(null, {
      status: 403,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  try {
    let user: any;
    let fl: any;
    jwt.verify(token, process.env.AUTH_SECRET!, (err, decoded) => {
      if (err) {
      }
      user = decoded;
    });
    console.log("user", user.id);
    const data = await fs.promises.readFile(
      path.join(process.cwd(), "data", `${user.id}.json`),
      "utf-8"
    );
    //console.log(data);
    //const jsonData = JSON.parse(data);
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err) {
    console.log("users token error:", err);
    if(err.code === "ENOENT"){
      return new Response( null,
                          {
                            status: 204,
                            headers: {
                              "Content-Type": "application/json",
                              "Access-Control-Allow-Origin": "*",
                              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                              "Access-Control-Allow-Headers": "Content-Type, Authorization",
                            },
                          });
    }
    
    return new Response(null, {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}

/**
 * Below section is for POST responses
 * What is POST request for?
 */

/*export async function POST(req: NextRequest) {
  const data = await req.json();
  fs.writeFile(
    path.join(process.cwd(), "data", `1.json`), //${data.fileName}
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) {
        return new NextResponse(JSON.stringify({ err: err }), {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }
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
}*/

// OPTIONS ?
/*export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}*/

/**
 * Below section is for PUT responses
 * PUT is to save members.json that belongs to requester
 */

export async function PUT(req: NextRequest) {
  const token = headers().get("Authorization")?.split(" ")[1];
  if (!token) {
    return new Response(null, {
      status: 403,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  try {
    let user: any;
    let fl: any;
    jwt.verify(token, process.env.AUTH_SECRET!, (err, decoded) => {
      if (err) {
      }
      user = decoded;
    });
    
    //console.log("user", user.id);
    
    /*const data = await fs.promises.readFile(
      path.join(process.cwd(), "data", `${user.id}.json`),
      "utf-8"
    );*/

    const new_data = await req.json();
    const filePath = path.join(process.cwd(), 'data', `${user.id}.json`);
    await fs.promises.writeFile(filePath,
                                JSON.stringify(new_data, null, 2),
                                'utf-8');
    
    return new Response(JSON.stringify({ message: "data updated" }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err) {
    console.log("users token error:", err);
    return new Response(null, {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}