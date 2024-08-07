import type { Bucket, File } from "@google-cloud/storage";
import { IMAGE_FOLDER_NAME, PROJECT_NAME } from "../constants";
import { createPersistentDownloadUrl } from "../lib/storeImage";
import type { GCSImageMeta } from "../types";

export const prepareImage = (bucket: Bucket) => (x: File) => {
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
      model: fileMeta?.model ?? "imagegeneration@006",
    },
  };
};
