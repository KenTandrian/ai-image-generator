import { onCall } from "firebase-functions/v2/https";
import { logger as log } from "firebase-functions/v2";
import OpenAIService from "../lib/openai";
import axios from "axios";
import { storeImage } from "../lib/storeImage";
import { GLOBAL_OPTIONS, IMAGE_FOLDER_NAME, PROJECT_NAME } from "../constants";
import { ImageMeta } from "../types";

type RequestData = {
  prompt: string;
  metadata: ImageMeta;
};

export const generateImage = onCall<RequestData>(
  { ...GLOBAL_OPTIONS, timeoutSeconds: 540, memory: "4GiB" },
  async (request) => {
    try {
      const { prompt, metadata } = request.data;
      log.info(`Prompt is ${prompt}, coming from ${metadata.geo?.city}`);

      const openai = new OpenAIService();
      const resp = await openai.images.generate({
        prompt,
        n: 1,
        size: "1024x1024",
      });
      log.info("Image generated!");

      const imageUrl = resp.data[0].url ?? "";
      const res = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const arrayBuffer = res.data;
      log.info("Image file fetched!");

      const timeStamp = new Date().getTime();
      const fileName = `${prompt}_${timeStamp}.png`;
      await storeImage(
        PROJECT_NAME,
        IMAGE_FOLDER_NAME,
        arrayBuffer,
        fileName,
        metadata
      );
      log.info("Image stored!");

      return "File uploaded successfully!";
    } catch (err) {
      log.error(err);
      return err;
    }
  }
);
