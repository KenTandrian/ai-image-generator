import type { ImagenModel } from "./data/imagen-models";

export type ImageType = {
  name: string;
  url: string;
  metadata: ImageMeta;
};

export type ImageMeta = {
  createdAt: string;
  geo?: {
    city?: string;
    country?: string;
  };
  model: ImagenModel;
};
