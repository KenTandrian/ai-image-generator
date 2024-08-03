export const IMAGEN_MODELS = [
  { name: "Imagen 2", value: "imagegeneration@006" },
  { name: "Imagen 3 Fast", value: "imagen-3.0-fast-generate-001" },
  // { name: "Imagen 3", value: "imagen-3.0-generate-001" },
  // { name: "DALL·E", value: "dall-e" },
] as const;

export type ImagenModel = (typeof IMAGEN_MODELS)[number]["value"];

export function getModelName(provider: ImagenModel) {
  return IMAGEN_MODELS.find((p) => p.value === provider)?.name;
}
