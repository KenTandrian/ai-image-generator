import { logger as log } from "firebase-functions/v2";
import { onCall } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS } from "../constants";
import OpenAIService from "../lib/openai";
import VertexAIService from "../lib/vertexai";

type Provider = "openai" | "vertexai";

export const getPromptSuggestion = onCall(GLOBAL_OPTIONS, async ({ data }) => {
  try {
    // Default to Vertex AI
    const provider: Provider = data.provider ?? "vertexai";

    let responseText = "";
    if (provider === "openai") {
      const openai = new OpenAIService();
      const resp = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt:
          "Write a random text prompt under 30 words for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc.",
        max_tokens: 100,
        temperature: 0.8,
      });
      responseText = resp.choices[0].text.trim().replace(/"/g, "");
    } else if (provider === "vertexai") {
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
