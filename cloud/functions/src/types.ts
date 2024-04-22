import type { UUID } from "crypto";

export type ImageMeta = {
  ip?: string;
  geo?: {
    city?: string;
    country?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
  };
};

export type GCSImageMeta = {
  ip?: string;
  geo?: string;
  firebaseStorageDownloadTokens?: UUID;
};
