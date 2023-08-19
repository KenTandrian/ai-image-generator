import { callableFn } from "@/services/firebase";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  const req = await request.json();
  const prompt = req.prompt;

  const response = await callableFn("generateImage")({ prompt });
  const textData = response.data;
  return NextResponse.json(textData);
}
