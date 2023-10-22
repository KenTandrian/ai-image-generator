import trpc from "@/server/client";
import type { SuggestionPayload } from "@/server/routes/suggestion";

export default async function fetchSuggestion(input: SuggestionPayload) {
  const res = await trpc.suggestion.query(input);
  return res.message;
}
