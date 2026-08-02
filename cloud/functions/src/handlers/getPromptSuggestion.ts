import { logger as log } from "firebase-functions/v2";
import { onCall, type HttpsOptions } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS } from "../constants";
import VertexAIService from "../lib/vertexai";

const OPTIONS: HttpsOptions = {
  ...GLOBAL_OPTIONS,
  memory: "512MiB",
};

export const getPromptSuggestion = onCall(OPTIONS, async ({ data }) => {
  try {
    const vertexai = new VertexAIService();
    const responseText = await vertexai.suggestion({ modelId: data.provider });
    return { error: false, payload: responseText };
  } catch (err) {
    log.error(err);
    return {
      error: true,
      payload:
        err instanceof Error
          ? err.message
          : "Failed to generate prompt suggestion",
    };
  }
});
