import { FcGoogle } from "react-icons/fc";
import { SiOpenai } from "react-icons/si";

const MODEL_STATUS = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE", // Only for allowed logged in users.
  DEPRECATED: "DEPRECATED",
} as const;

export const IMAGEN_MODELS: {
  name: string;
  value: string;
  aliases?: string[];
  vendor: keyof typeof VENDOR_LOGOS;
  status: (typeof MODEL_STATUS)[keyof typeof MODEL_STATUS];
}[] = [
  {
    name: "Imagen 3 Fast",
    value: "imagen-3.0-fast-generate-001",
    vendor: "Google",
    status: MODEL_STATUS.PUBLIC,
  },
  {
    name: "Imagen 3",
    value: "imagen-3.0-generate-002",
    aliases: ["imagen-3.0-generate-001"],
    vendor: "Google",
    status: MODEL_STATUS.PRIVATE,
  },
  {
    name: "Imagen 4 Fast",
    value: "imagen-4.0-fast-generate-001",
    aliases: ["imagen-4.0-fast-generate-preview-06-06"],
    vendor: "Google",
    status: MODEL_STATUS.PUBLIC,
  },
  {
    name: "Imagen 4",
    value: "imagen-4.0-generate-001",
    aliases: [
      "imagen-4.0-generate-preview-06-06",
      "imagen-4.0-generate-preview-05-20",
    ],
    vendor: "Google",
    status: MODEL_STATUS.PRIVATE,
  },
  {
    name: "Imagen 4 Ultra",
    value: "imagen-4.0-ultra-generate-001",
    aliases: [
      "imagen-4.0-ultra-generate-preview-06-06",
      "imagen-4.0-ultra-generate-exp-05-20",
    ],
    vendor: "Google",
    status: MODEL_STATUS.PRIVATE,
  },
  // Deprecated models
  {
    name: "Imagen 2",
    value: "imagegeneration@006",
    vendor: "Google",
    status: MODEL_STATUS.DEPRECATED,
  },
  {
    name: "DALL·E 2",
    value: "dall-e-2",
    vendor: "OpenAI",
    status: MODEL_STATUS.DEPRECATED,
  },
] as const;

const VENDOR_LOGOS = {
  Google: FcGoogle,
  OpenAI: SiOpenai,
};

export type ImagenModel = (typeof IMAGEN_MODELS)[number]["value"];

export function getModelName(model: ImagenModel) {
  return IMAGEN_MODELS.find((p) => p.value === model)?.name;
}

export function findModel(model: ImagenModel) {
  const m = IMAGEN_MODELS.find(
    (p) => p.value === model || p.aliases?.includes(model)
  );
  if (m) return { ...m, logo: VENDOR_LOGOS[m?.vendor] };
}
