export const PROVIDERS = [
  { name: "Gemini 2.0 Flash-Lite", value: "gemini-2.0-flash-lite" },
  { name: "Gemini 2.5 Flash-Lite", value: "gemini-2.5-flash-lite" },
] as const;

export type AIProvider = (typeof PROVIDERS)[number]["value"];

export function getProviderName(provider: AIProvider) {
  return PROVIDERS.find((p) => p.value === provider)?.name;
}
