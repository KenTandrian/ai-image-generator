import { logger as log } from "firebase-functions/v2";
import { onCall, type HttpsOptions } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS } from "../constants";
import GeminiService from "../lib/gemini";
import type { Model } from "../types";

const ALLOWED_MODELS: Model[] = [
  { id: "gemini-2.0-flash-lite", location: "us-central1" },
  { id: "gemini-2.5-flash-lite", location: "us-central1" },
];

const OPTIONS: HttpsOptions = {
  ...GLOBAL_OPTIONS,
  memory: "512MiB",
};

export const getPromptSuggestion = onCall(OPTIONS, async ({ data }) => {
  try {
    const model = ALLOWED_MODELS.find(({ id }) => id === data.provider);

    let responseText = "";
    if (model) {
      const gemini = new GeminiService(model);
      responseText = await gemini.suggestion();
    } else {
      log.error("Invalid model", model);
      return { error: true, payload: "Invalid model" };
    }
    return { error: false, payload: responseText };
  } catch (err) {
    log.error(err);
    return { error: true, payload: err };
  }
});
