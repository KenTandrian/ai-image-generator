import { onRequest } from "firebase-functions/v2/https";
import { logger as log } from "firebase-functions/v2";
import { storage } from "../lib/firebase";
import { GLOBAL_OPTIONS, IMAGE_FOLDER_NAME, PROJECT_NAME } from "../constants";
import { createPersistentDownloadUrl } from "../lib/storeImage";
import { File } from "firebase-admin/node_modules/@google-cloud/storage";

const sortByTimeCreated = (a: File, b: File) => {
  const dateA = new Date(a.metadata.timeCreated);
  const dateB = new Date(b.metadata.timeCreated);
  return dateB.getTime() - dateA.getTime(); // descending
};

export const getImages = onRequest(GLOBAL_OPTIONS, async (req, res) => {
  try {
    const bucket = storage.bucket();
    const [files] = await bucket.getFiles({
      prefix: `${PROJECT_NAME}/${IMAGE_FOLDER_NAME}`,
    });
    log.info("All images retrieved.");

    const sorted = files.sort(sortByTimeCreated).map((x) => ({
      url: createPersistentDownloadUrl(
        bucket.name,
        x.name,
        x.metadata.metadata?.firebaseStorageDownloadTokens
      ),
      name: x.name.replace(`${PROJECT_NAME}/${IMAGE_FOLDER_NAME}/`, ""),
    }));
    log.info(`HTTP Function processed request for url ${req.url}`);

    res.json({ imageUrls: sorted });
  } catch (err) {
    log.error(err);
    res.json(err);
  }
});
