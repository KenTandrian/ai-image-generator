import trpc from "@/server/client";

export default function fetchImages() {
  return trpc.getImages.query();
}
