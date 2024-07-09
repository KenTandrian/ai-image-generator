import type { Bucket, File } from "@google-cloud/storage";
import { logger as log } from "firebase-functions/v2";
import { onCall, type HttpsOptions } from "firebase-functions/v2/https";
import { GLOBAL_OPTIONS, IMAGE_FOLDER_NAME, PROJECT_NAME } from "../constants";
import { storage } from "../lib/firebase";
import { createPersistentDownloadUrl } from "../lib/storeImage";
import type { GCSImageMeta } from "../types";

const sortByTimeCreated = (a: File, b: File) => {
  const dateA = new Date(a.metadata.timeCreated!);
  const dateB = new Date(b.metadata.timeCreated!);
  return dateB.getTime() - dateA.getTime(); // descending
};

const prepareImage = (bucket: Bucket) => (x: File) => {
  const fileMeta: GCSImageMeta | undefined = x.metadata.metadata;
  const geo = fileMeta?.geo ? JSON.parse(fileMeta.geo) : undefined;

  return {
    url: createPersistentDownloadUrl(
      bucket.name,
      x.name,
      fileMeta?.firebaseStorageDownloadTokens ?? ""
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
