export const PROVIDERS = [
  { name: "Google VertexAI", value: "vertexai" },
  { name: "ChatGPT", value: "openai" },
] as const;

export type AIProvider = (typeof PROVIDERS)[number]["value"];

export function getProviderName(provider: AIProvider) {
  return PROVIDERS.find((p) => p.value === provider)?.name;
}
