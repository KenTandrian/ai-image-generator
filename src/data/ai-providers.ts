export const PROVIDERS = [
  { name: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
  { name: "Gemini 2.0 Flash-Lite", value: "gemini-2.0-flash-lite" },
] as const;

export type AIProvider = (typeof PROVIDERS)[number]["value"];

export function getProviderName(provider: AIProvider) {
  return PROVIDERS.find((p) => p.value === provider)?.name;
}
