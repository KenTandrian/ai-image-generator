import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const response = await fetch(`${process.env.API_URL}/getImages`, {
    cache: "no-cache",
  });
  const blob = await response.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
