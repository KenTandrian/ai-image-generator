import { callableFn } from "@/services/firebase";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const prompt = req.prompt;

  const response = await callableFn("generateImage")({
    prompt,
    metadata: { ip: request.ip, geo: request.geo },
  });
  const textData = response.data;
  return NextResponse.json(textData);
}
