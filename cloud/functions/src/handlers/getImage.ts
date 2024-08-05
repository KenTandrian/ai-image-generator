import { logger as log } from "firebase-functions/v2";
import { onCall } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS, IMAGE_FOLDER_NAME, PROJECT_NAME } from "../constants";
import { storage } from "../lib/firebase";
import { prepareImage } from "../utils/prepareImage";

export const getImage = onCall(GLOBAL_OPTIONS, async ({ data }) => {
  try {
    const path = data.path;
    const bucket = storage.bucket();
    const [file] = await bucket
      .file(`${PROJECT_NAME}/${IMAGE_FOLDER_NAME}/${path}`)
      .get();
    log.info("All images retrieved.");
    return prepareImage(bucket)(file);
  } catch (err) {
    log.error(err);
    return err;
  }
});
