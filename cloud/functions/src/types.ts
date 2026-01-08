import type { UUID } from "node:crypto";

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
  prompt: string;
};

export type GCSImageMeta = {
  firebaseStorageDownloadTokens?: UUID;
  geo?: string;
  ip?: string;
  model?: string;
  prompt?: string;
};

export type Model = {
  id: string;
  location: string;
};
