import * as functions from "firebase-functions";
import openai from "../lib/openai";
import axios from "axios";
import { storeImage } from "../lib/storeImage";
import { IMAGE_FOLDER_NAME, PROJECT_NAME } from "../constants";

const log = functions.logger;

export const generateImage = functions
  .runWith({ timeoutSeconds: 540, memory: "4GB" })
  .https.onRequest(async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method not allowed");
      return;
    }

    try {
      const { prompt } = request.body;
      log.info(`Prompt is ${prompt}`);

      const resp = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
      });
      log.info("Image generated!");

      const imageUrl = resp.data.data[0].url ?? "";
      const res = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const arrayBuffer = res.data;
      log.info("Image file fetched!");

      const timeStamp = new Date().getTime();
      const fileName = `${prompt}-${timeStamp}.png`;
      await storeImage(PROJECT_NAME, IMAGE_FOLDER_NAME, arrayBuffer, fileName);
      log.info("Image stored!");

      response.send("File uploaded successfully!");
    } catch (err) {
      log.error(err);
      response.send(err);
    }
  });
