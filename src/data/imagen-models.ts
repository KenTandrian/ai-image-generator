const MODEL_STATUS = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE", // Only for allowed logged in users.
  DEPRECATED: "DEPRECATED",
} as const;

export const IMAGEN_MODELS = [
  {
    name: "Imagen 2",
    value: "imagegeneration@006",
    vendor: "Google",
    status: MODEL_STATUS.PUBLIC,
  },
  {
    name: "Imagen 3 Fast",
    value: "imagen-3.0-fast-generate-001",
    vendor: "Google",
    status: MODEL_STATUS.PUBLIC,
  },
  {
    name: "Imagen 3",
    value: "imagen-3.0-generate-001",
    vendor: "Google",
    status: MODEL_STATUS.PRIVATE,
  },
  {
    name: "DALL·E 2",
    value: "dall-e-2",
    vendor: "OpenAI",
    status: MODEL_STATUS.DEPRECATED,
  },
] as const;

export type ImagenModel = (typeof IMAGEN_MODELS)[number]["value"];

export function getModelName(model: ImagenModel) {
  return IMAGEN_MODELS.find((p) => p.value === model)?.name;
}

export function findModel(model: ImagenModel) {
  return IMAGEN_MODELS.find((p) => p.value === model);
}
