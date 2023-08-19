import { callableFn } from "@/services/firebase";
import { NextResponse } from "next/server";

export const runtime = "edge";

type Return = {
  error: boolean;
  payload: string;
};

export async function GET() {
  // Connect to Cloud Function
  const response = await callableFn<{}, Return>("getChatGPTSuggestion")();
  const data = response.data;
  if (data.error) {
    return new NextResponse(
      JSON.stringify("Sorry, I can't think of anything right now :("),
      { status: 500 }
    );
  }
  return new NextResponse(
    // Remove leading dot if present and trim the string
    JSON.stringify(data.payload?.replace(/^\./, "").trim()),
    { status: 200 }
  );
}
