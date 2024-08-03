import type { UUID } from "crypto";

export type ImageMeta = {
  geo?: {
    city?: string;
    country?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
  };
  ip?: string;
  model: string;
};

export type GCSImageMeta = {
  firebaseStorageDownloadTokens?: UUID;
  geo?: string;
  ip?: string;
};
