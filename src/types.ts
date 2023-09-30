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
    region?: string;
    latitude?: string;
    longitude?: string;
  };
};
