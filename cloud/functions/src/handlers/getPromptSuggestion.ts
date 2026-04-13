import { logger as log } from "firebase-functions/v2";
import { onCall, type HttpsOptions } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS, SUGGESTION_MODELS } from "../constants";
import VertexAIService from "../lib/vertexai";

const OPTIONS: HttpsOptions = {
  ...GLOBAL_OPTIONS,
  memory: "512MiB",
};

export const getPromptSuggestion = onCall(OPTIONS, async ({ data }) => {
  try {
    const model = SUGGESTION_MODELS.find(({ id }) => id === data.provider);

    let responseText = "";
    if (model) {
      const vertexai = new VertexAIService(model.location);
      responseText = await vertexai.suggestion({ modelId: model.id });
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
