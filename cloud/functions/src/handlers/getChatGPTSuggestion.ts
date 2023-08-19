import { onRequest } from "firebase-functions/v2/https";
import { logger as log } from "firebase-functions/v2";
import OpenAIService from "../lib/openai";
import { GLOBAL_OPTIONS } from "../constants";

export const getChatGPTSuggestion = onRequest(
  GLOBAL_OPTIONS,
  async (request, response) => {
    if (request.method !== "GET") {
      response.status(405).send("Method not allowed");
      return;
    }

    try {
      const openai = new OpenAIService();
      const resp = await openai.completions.create({
        model: "text-davinci-003",
        prompt:
          "Write a random text prompt for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc. Do not wrap the answer in quotes",
        max_tokens: 100,
        temperature: 0.8,
      });

      log.info(`HTTP Function processed request for URL ${request.url}`);
      const responseText = resp.choices[0].text;
      response.send({ error: false, payload: responseText });
    } catch (err) {
      log.error(err);
      response.send({ error: true, payload: err });
    }
  }
);
