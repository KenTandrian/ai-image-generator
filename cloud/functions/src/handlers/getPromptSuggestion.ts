import { logger as log } from "firebase-functions/v2";
import { onCall, type HttpsOptions } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS } from "../constants";
import GeminiService from "../lib/gemini";
import VertexAIService from "../lib/vertexai";

type Provider = "gemini" | "palm2" | "openai";

const OPTIONS: HttpsOptions = {
  ...GLOBAL_OPTIONS,
  memory: "512MiB",
};

export const getPromptSuggestion = onCall(OPTIONS, async ({ data }) => {
  try {
    // Default to PaLM 2
    const provider: Provider = data.provider ?? "palm2";

    let responseText = "";
    if (provider === "openai") {
      // ChatGPT is disabled for now due to billing changes.
      return { error: true, payload: "Sorry, OpenAI is not supported." };
    } else if (provider === "gemini") {
      // Gemini 1.0 Pro model
      const gemini = new GeminiService();
      responseText = await gemini.suggestion();
    } else if (provider === "palm2") {
      // PaLM 2 for Chat (chat-bison) model
      const vertexai = new VertexAIService();
      responseText = await vertexai.suggestion();
    } else {
      return { error: true, payload: "Invalid provider" };
    }
    return { error: false, payload: responseText };
  } catch (err) {
    log.error(err);
    return { error: true, payload: err };
  }
});
