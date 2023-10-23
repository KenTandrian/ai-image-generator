"use client";

import fetchImages from "@/services/fetchImages";
import type { ImageType } from "@/types";
import { relative } from "@/utils/date-fns";
import Image from "next/image";
import { CircleFlag } from "react-circle-flags";
import { TbRefresh } from "react-icons/tb";
import useSWR from "swr";

const Images = () => {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR<{ imageUrls: ImageType[] }>("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });
  const loading = !isLoading && isValidating;

  return (
    <div>
      <button
        disabled={loading}
        onClick={() => refreshImages(images)}
        className="fixed bottom-8 right-8 z-20 flex items-center rounded-md bg-violet-400/90 px-4 py-2 font-medium
          text-white transition-colors hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400
          disabled:cursor-not-allowed"
      >
        <TbRefresh className={"mr-2" + (loading ? " animate-spin" : "")} />
        {loading ? "Refreshing..." : "Refresh Images"}
      </button>
      {isLoading && (
        <p className="animate-pulse pb-7 text-center font-extralight dark:text-white">
          Loading <span className="text-violet-400">AI</span> Generated
          Images...
        </p>
      )}
      <div className="m-6 grid grid-cols-2 gap-4 md:m-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images?.imageUrls?.map((image, i) => (
          <div
            key={image.name}
            className={`relative cursor-help ${
              i === 0 && "col-span-2 row-span-2"
            } transition-transform duration-200 ease-in-out hover:scale-[102%]`}
          >
            <div className="absolute bottom-1 right-1 z-10 flex items-center gap-1 rounded-md bg-black bg-opacity-50 px-1.5 py-1 text-xs font-light text-white">
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
                <span>{image.metadata.geo?.city}</span>
              )}
            </div>
            <div
              className="absolute z-10 flex h-full w-full items-center justify-center bg-white opacity-0 
                transition-opacity duration-200 hover:opacity-80 dark:bg-zinc-900"
            >
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
        ))}
      </div>
    </div>
  );
};

export default Images;
