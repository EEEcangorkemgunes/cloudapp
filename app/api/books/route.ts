import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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
