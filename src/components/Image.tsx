import type { ImageType } from "@/types";
import { relative } from "@/utils/date-fns";
import Image from "next/image";
import { CircleFlag } from "react-circle-flags";

export default function AIImage({
  image,
  isFirst,
}: {
  image: ImageType;
  isFirst: boolean;
}) {
  return (
    <div
      className={`relative cursor-help ${
        isFirst && "col-span-2 row-span-2"
      } transition-transform duration-200 ease-in-out hover:scale-[102%]`}
    >
      <div className="absolute bottom-1 right-1 z-10 ml-1 flex max-w-[calc(100%-0.5rem)] items-center gap-1 rounded-md bg-black bg-opacity-50 px-1.5 py-1 text-xs font-light text-white">
        {image.metadata.createdAt
          ? relative(new Date(image.metadata.createdAt), true)
          : null}
        {image.metadata.geo?.country && (
          <CircleFlag
            className="inline-block h-3 w-3"
            countryCode={image.metadata.geo.country.toLowerCase()}
          />
        )}
        {image.metadata.geo?.city && (
          <span className="truncate">{image.metadata.geo?.city}</span>
        )}
      </div>
      <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white opacity-0 transition-opacity duration-200 hover:opacity-80 dark:bg-zinc-900">
        <p className="p-3 text-center text-sm font-light dark:text-white xs:text-base sm:p-5 sm:text-lg">
          {image.name
            .split("_")
            .shift()
            ?.toString()
            .replace(/\.[^/.]+$/, "")}
        </p>
      </div>
      <Image
        src={image.url}
        alt={image.name}
        height={800}
        width={800}
        className="-z-10 w-full rounded-sm shadow-2xl drop-shadow-lg"
        placeholder="blur"
        blurDataURL="/placeholder.jpg"
      />
    </div>
  );
}
