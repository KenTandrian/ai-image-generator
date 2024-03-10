import { callableFn } from "@/services/firebase";
import type { ImageType } from "@/types";

type Return = {
  imageUrls: ImageType[];
  favorites: ImageType[];
};

export async function getImagesFn() {
  const response = await callableFn<undefined, Return>("getImages")();
  return response.data;
}
