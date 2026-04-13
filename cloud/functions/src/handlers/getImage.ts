import { logger as log } from "firebase-functions/v2";
import { type HttpsOptions, onCall } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS, IMAGE_FOLDER_NAME, PROJECT_NAME } from "../constants";
import { storage } from "../lib/firebase";
import { prepareImage } from "../utils/prepareImage";
import { isValidImagePath } from "../utils/isValidImagePath";

const OPTIONS: HttpsOptions = {
  ...GLOBAL_OPTIONS,
  memory: "512MiB",
};

export const getImage = onCall(OPTIONS, async ({ data }) => {
  const path = data.path;

  if (!isValidImagePath(path)) {
    log.warn(`Suspicious path rejected: ${path}`);
    return { error: "Invalid path" };
  }

  try {
    const bucket = storage.bucket();
    const [file] = await bucket
      .file(`${PROJECT_NAME}/${IMAGE_FOLDER_NAME}/${path}`)
      .get();
    log.info(`Image ${path} retrieved.`);
    return prepareImage(bucket)(file);
  } catch (err) {
    log.error(err);
    return err;
  }
});
