import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  return NextResponse.json({message:"asdf"})
  //tokenı kontrol et
  //kullanıcının bu veriyi görmeye izni var mı
  //databaseden veriyi çek
  //Response.json(data);
}

export async function POST(req: NextRequest) {
  //tokenı kontrol et
  //verilen kitap bilgileri uygun mu
  //database'e kaydet
  //Response.json(savedBook);
}
