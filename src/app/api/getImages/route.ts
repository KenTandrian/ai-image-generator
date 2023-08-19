import { callableFn } from "@/services/firebase";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const response = await callableFn("getImages")();
  const data = response.data;
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
