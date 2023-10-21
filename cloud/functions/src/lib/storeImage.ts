import { randomUUID } from "crypto";
import type { ImageMeta } from "../types";
import { storage } from "./firebase";

/**
 * Stores image into Firebase storage and returns path.
 * @param {string} projectName - Name of the project.
 * @param {string} folderName - Name of the bucket.
 * @param {Buffer} file - Image file in Buffer format.
 * @param {string} fileName - File name.
 * @param {ImageMeta} metadata - File name.
 * @return {Promise<string>} - File path or download url of stored image.
 */
export async function storeImage(
  projectName: string,
  folderName: string,
  file: Buffer,
  fileName: string,
  metadata: ImageMeta
): Promise<string> {
  const filePath = `${projectName}/${folderName}/${fileName}`;
  const uuid = randomUUID();

  const opts: Record<string, unknown> = {
    resumable: false,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuid,
        geo: JSON.stringify(metadata.geo),
        ip: metadata.ip,
      },
    },
  };

  const bucket = storage.bucket();
  await bucket.file(filePath).save(file, opts);
  return filePath;
}

/**
 * Create a persistent download URL for the given file path
 * @param {string} bucketName Name of the bucket
 * @param {string} pathToFile Path to the file to be accessed
 * @param {string} downloadToken The Firebase Storage Download Tokens
 * @return {string} A URL.
 */
export function createPersistentDownloadUrl(
  bucketName: string,
  pathToFile: string,
  downloadToken: string
): string {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(
    pathToFile
  )}?alt=media&token=${downloadToken}`;
}
