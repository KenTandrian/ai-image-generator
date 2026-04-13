export const PROVIDERS = [
  { name: "Gemini 2.5 Flash-Lite", value: "gemini-2.5-flash-lite" },
  { name: "Gemini 3.1 Flash-Lite", value: "gemini-3.1-flash-lite-preview" },
] as const;

export type AIProvider = (typeof PROVIDERS)[number]["value"];

export function getProviderName(provider: AIProvider) {
  return PROVIDERS.find((p) => p.value === provider)?.name;
}
