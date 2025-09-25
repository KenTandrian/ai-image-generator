import type { GlobalOptions } from "firebase-functions/v2";

export const PROJECT_NAME = "ai-image-generator";
export const IMAGE_FOLDER_NAME = "images";

export const GLOBAL_OPTIONS: GlobalOptions = {
  maxInstances: 5,
  region: "asia-southeast1",
};

export const IMAGEN_MODELS = [
  { id: "imagen-3.0-fast-generate-001", location: "asia-southeast1" },
  { id: "imagen-3.0-generate-002", location: "asia-southeast1" },
  { id: "imagen-4.0-fast-generate-001", location: "us-central1" },
  { id: "imagen-4.0-generate-001", location: "us-central1" },
  { id: "imagen-4.0-ultra-generate-001", location: "us-central1" },
] as const;
