import { https, logger } from "firebase-functions";
import openai from "./lib/openai";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const getChatGPTSuggestion = https.onRequest(
  async (request, response) => {
    if (request.method !== "GET") {
      response.status(405).send("Method not allowed");
      return;
    }

    try {
      const resp = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:
          "Write a random text prompt for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc. Do not wrap the answer in quotes",
        max_tokens: 100,
        temperature: 0.8,
      });

      logger.info(`HTTP Function processed request for URL ${request.url}`);
      const responseText = resp.data.choices[0].text;
      response.send(responseText);
    } catch (err) {
      logger.error(err, { structuredData: true });
      response.send(err);
    }
  }
);
