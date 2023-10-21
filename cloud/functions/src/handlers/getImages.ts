import type { File } from "firebase-admin/node_modules/@google-cloud/storage";
import { logger as log } from "firebase-functions/v2";
import { onCall } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS, IMAGE_FOLDER_NAME, PROJECT_NAME } from "../constants";
import { storage } from "../lib/firebase";
import { createPersistentDownloadUrl } from "../lib/storeImage";

const sortByTimeCreated = (a: File, b: File) => {
  const dateA = new Date(a.metadata.timeCreated);
  const dateB = new Date(b.metadata.timeCreated);
  return dateB.getTime() - dateA.getTime(); // descending
};

export const getImages = onCall(GLOBAL_OPTIONS, async () => {
  try {
    const bucket = storage.bucket();
    const [files] = await bucket.getFiles({
      prefix: `${PROJECT_NAME}/${IMAGE_FOLDER_NAME}`,
    });
    log.info("All images retrieved.");

    const sorted = files.sort(sortByTimeCreated).map((x) => {
      const geo = x.metadata.metadata?.geo
        ? JSON.parse(x.metadata.metadata.geo)
        : undefined;

      return {
        url: createPersistentDownloadUrl(
          bucket.name,
          x.name,
          x.metadata.metadata?.firebaseStorageDownloadTokens
        ),
        name: x.name.replace(`${PROJECT_NAME}/${IMAGE_FOLDER_NAME}/`, ""),
        metadata: {
          createdAt: x.metadata.timeCreated,
          geo: {
            city: geo?.city,
            country: geo?.country,
          },
        },
      };
    });
    return { imageUrls: sorted };
  } catch (err) {
    log.error(err);
    return err;
  }
});
