import trpc from "@/server/client";

export default async function fetchSuggestion() {
  const res = await trpc.suggestion.query();
  return res.message;
}
