import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  const req = await request.json();
  const prompt = req.prompt;

  const response = await fetch(`${process.env.API_URL}/generateImage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const textData = await response.text();
  return NextResponse.json(textData);
}
