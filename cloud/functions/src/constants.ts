import { GlobalOptions } from "firebase-functions/v2";

export const PROJECT_NAME = "ai-image-generator";
export const IMAGE_FOLDER_NAME = "images";

export const GLOBAL_OPTIONS: GlobalOptions = {
  maxInstances: 10,
  region: "asia-southeast1",
};
