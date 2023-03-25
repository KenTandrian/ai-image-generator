import { randomUUID } from "crypto";
import { storage } from "./firebase";

/**
 * Stores image into Firebase storage and returns path.
 * @param {string} projectName - Name of the project.
 * @param {string} folderName - Name of the bucket.
 * @param {Buffer} file - Image file in Buffer format.
 * @param {string} fileName - File name.
 * @param {boolean} returnDownloadURL - If true, returns download url.
 * @return {Promise<string>} - File path or download url of stored image.
 */
export async function storeImage(
  projectName: string,
  folderName: string,
  file: Buffer,
  fileName: string,
  returnDownloadURL?: boolean
): Promise<string> {
  const filePath = `${projectName}/${folderName}/${fileName}`;
  const uuid = randomUUID();

  const opts: Record<string, unknown> = { resumable: false };
  if (returnDownloadURL) {
    opts.metadata = { metadata: { firebaseStorageDownloadTokens: uuid } };
  }

  const bucket = storage.bucket();
  await bucket.file(filePath).save(file, opts);

  if (returnDownloadURL) {
    return createPersistentDownloadUrl(bucket.name, filePath, uuid);
  }
  return filePath;
}

/**
 * Create a persistent download URL for the given file path
 * @param bucketName Name of the bucket
 * @param pathToFile Path to the file to be accessed
 * @param downloadToken The Firebase Storage Download Tokens
 * @returns A URL.
 */
function createPersistentDownloadUrl(
  bucketName: string,
  pathToFile: string,
  downloadToken: string
) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(
    pathToFile
  )}?alt=media&token=${downloadToken}`;
}
