import { callableFn } from "@/services/firebase";
import { APIResp } from "../trpc";

type Return = {
  error: boolean;
  payload: string;
};

export async function suggestionFn() {
  // Connect to Cloud Function
  const response = await callableFn<object, Return>("getChatGPTSuggestion")();
  const data = response.data;
  if (data.error) {
    return new APIResp("Sorry, I can't think of anything right now :(", false);
  }
  return new APIResp(
    // Remove leading dot if present and trim the string
    data.payload?.replace(/^\./, "").trim(),
    true
  );
}
