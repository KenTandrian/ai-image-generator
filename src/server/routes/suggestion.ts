import { callableFn } from "@/services/firebase";
import { z } from "zod";
import { APIResp } from "../trpc";

export const suggestionInput = z.object({
  provider: z.enum(["gemini", "palm2"]),
});
export type SuggestionPayload = z.infer<typeof suggestionInput>;

type Return = {
  error: boolean;
  payload: string;
};

export async function suggestionFn(input: SuggestionPayload) {
  // Connect to Cloud Function
  const response = await callableFn<object, Return>("getPromptSuggestion")(
    input
  );
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
