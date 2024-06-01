import type { ImageType } from "@/types";
import { relative } from "@/utils/date-fns";
import Image from "next/image";
import Link from "next/link";
import { CircleFlag } from "react-circle-flags";

export default function AIImage({
  image,
  isFirst,
}: {
  image: ImageType;
  isFirst: boolean;
}) {
  const prompt = image.name
    .split("_")
    .shift()
    ?.toString()
    .replace(/\.[^/.]+$/, "");
  return (
    <Link
      href={`/${Buffer.from(image.name, "utf-8").toString("hex")}`}
      className={`relative ${
        isFirst && "col-span-2 row-span-2"
      } group transition-transform duration-200 ease-in-out hover:scale-[102%]`}
    >
      <div className="absolute right-1.5 top-1.5 z-10 ml-1 flex max-w-[calc(100%-0.5rem)] items-center gap-1 rounded-md bg-black bg-opacity-50 px-1.5 py-1 text-xs font-light text-white">
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
      <div className="absolute bottom-0 left-0 z-10 flex h-[70px] w-full items-start justify-start rounded-tr-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-80 dark:bg-gradient-to-tr dark:from-violet-950 dark:to-black/80 sm:h-[100px]">
        <p
          className="m-4 line-clamp-2 text-ellipsis text-left text-sm font-light dark:text-white xs:text-base sm:m-5 sm:text-lg"
          title={prompt}
        >
          {prompt}
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
    </Link>
  );
}
