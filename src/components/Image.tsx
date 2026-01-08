import Image from "next/image";
import Link from "next/link";
import { CircleFlag } from "react-circle-flags";
import type { ImageType } from "@/types";
import { cn } from "@/utils/classname";
import { relative } from "@/utils/date-fns";

export default function AIImage({
  image,
  isFirst,
}: Readonly<{
  image: ImageType;
  isFirst: boolean;
}>) {
  const href = encodeURIComponent(image.name);
  return (
    <Link
      href={href}
      className={cn(
        "group relative transition-transform duration-200 ease-in-out hover:scale-[102%]",
        isFirst && "col-span-2 row-span-2"
      )}
    >
      <div className="absolute top-1.5 right-1.5 z-10 ml-1 flex max-w-[calc(100%-0.5rem)] items-center gap-1 rounded-md bg-black/50 px-1.5 py-1 text-xs font-light text-white">
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
      <div className="absolute bottom-0 left-0 z-10 flex h-[70px] w-full items-start justify-start rounded-tr-2xl rounded-b-md opacity-0 transition-opacity duration-200 group-hover:opacity-80 sm:h-[100px] dark:bg-gradient-to-tr dark:from-violet-950 dark:to-black/80">
        <p
          className="xs:text-base m-4 line-clamp-2 text-left text-sm font-light text-ellipsis sm:m-5 sm:text-lg dark:text-white"
          title={image.metadata.prompt}
        >
          {image.metadata.prompt}
        </p>
      </div>
      <Image
        src={image.url}
        alt={image.name}
        height={800}
        width={800}
        className="-z-10 w-full rounded-lg shadow-2xl drop-shadow-lg"
        placeholder="blur"
        blurDataURL="/placeholder.jpg"
      />
    </Link>
  );
}
