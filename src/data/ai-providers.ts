export const PROVIDERS = [
  { name: "PaLM 2", value: "palm2" },
  { name: "Gemini 1.5 Flash", value: "gemini" },
  // { name: "ChatGPT", value: "openai" },
] as const;

export type AIProvider = (typeof PROVIDERS)[number]["value"];

export function getProviderName(provider: AIProvider) {
  return PROVIDERS.find((p) => p.value === provider)?.name;
}
