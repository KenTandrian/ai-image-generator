export const PROVIDERS = [
  { name: "Google Gemini", value: "gemini" },
  { name: "Google PaLM 2", value: "palm2" },
  // { name: "ChatGPT", value: "openai" },
] as const;

export type AIProvider = (typeof PROVIDERS)[number]["value"];

export function getProviderName(provider: AIProvider) {
  return PROVIDERS.find((p) => p.value === provider)?.name;
}
