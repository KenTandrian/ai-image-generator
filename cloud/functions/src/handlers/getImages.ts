import type { File } from "@google-cloud/storage";
import { logger as log } from "firebase-functions/v2";
import { onCall, type HttpsOptions } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS, IMAGE_FOLDER_NAME, PROJECT_NAME } from "../constants";
import { storage } from "../lib/firebase";
import { prepareImage } from "../utils/prepareImage";

const sortByTimeCreated = (a: File, b: File) => {
  const dateA = new Date(a.metadata.timeCreated!);
  const dateB = new Date(b.metadata.timeCreated!);
  return dateB.getTime() - dateA.getTime(); // descending
};

const OPTIONS: HttpsOptions = {
  ...GLOBAL_OPTIONS,
  memory: "512MiB",
};

export const getImages = onCall(OPTIONS, async () => {
  try {
    const bucket = storage.bucket();
    const [files] = await bucket.getFiles({
      prefix: `${PROJECT_NAME}/${IMAGE_FOLDER_NAME}`,
    });
    log.info("All images retrieved.");

    const sorted = files.sort(sortByTimeCreated);
    const imageUrls = sorted.slice(0, 27).map(prepareImage(bucket));
    const favorites = sorted
      .filter((x) => x.metadata.metadata?.favorite === "true")
      .slice(0, 27)
      .map(prepareImage(bucket));
    return { imageUrls, favorites };
  } catch (err) {
    log.error(err);
    return err;
  }
});
