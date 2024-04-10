import axios from "axios";
import { logger as log } from "firebase-functions/v2";
import { onCall } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS, IMAGE_FOLDER_NAME, PROJECT_NAME } from "../constants";
import OpenAIService from "../lib/openai";
import { storeImage } from "../lib/storeImage";
import VertexAIService from "../lib/vertexai";
import type { ImageMeta } from "../types";

type RequestData = {
  prompt: string;
  metadata: ImageMeta;
};

export const generateImage = onCall<RequestData>(
  { ...GLOBAL_OPTIONS, timeoutSeconds: 540, memory: "4GiB" },
  async (request) => {
    try {
      const { prompt: rawPrompt, metadata } = request.data;
      const prompt = rawPrompt.replace(/(\r\n|\n|\r)/gm, "");
      log.info(`Prompt is "${prompt}", coming from ${metadata.geo?.city}`);

      // DALL·E is replaced by Imagen due to billing changes
      const imgBuffer = await generateWithImagen(prompt);

      const timeStamp = new Date().getTime();
      const fileName = `${prompt}_${timeStamp}.png`;
      await storeImage(
        PROJECT_NAME,
        IMAGE_FOLDER_NAME,
        imgBuffer,
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

/**
 * Generate image with DALL·E 2.0
 * @param {string} prompt Prompt
 * @return {Buffer} Buffer of the generated image
 */
export async function generateWithDalle(prompt: string) {
  const openai = new OpenAIService();
  const resp = await openai.images.generate({
    prompt,
    n: 1,
    size: "1024x1024",
  });
  log.info("Image generated!");

  const imageUrl = resp.data[0].url ?? "";
  const res = await axios.get<Buffer>(imageUrl, {
    responseType: "arraybuffer",
  });
  const arrayBuffer = res.data;
  log.info("Image file fetched!");

  return arrayBuffer;
}

/**
 * Generate image with Google Imagen
 * @param {string} prompt Prompt
 * @return {Buffer} Buffer of the generated image
 */
export async function generateWithImagen(prompt: string) {
  const vertexai = new VertexAIService();
  const resp = await vertexai.imagen({ prompt });
  if (!resp) throw new Error("Image generation failed");
  log.info("Image generated!");

  const arrayBuffer = Buffer.from(resp, "base64");
  log.info("Image file fetched!");

  return arrayBuffer;
}
