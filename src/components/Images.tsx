"use client";

import fetchImages from "@/services/fetchImages";
import Image from "next/image";
import useSWR from "swr";

type ImageType = {
  name: string;
  url: string;
};

const Images = () => {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  return (
    <div>
      <button
        disabled={!isLoading && isValidating}
        onClick={() => refreshImages(images)}
        className="fixed bottom-10 right-10 z-20 rounded-md bg-violet-400/90 px-5 py-3 
        font-bold text-white hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400
          disabled:cursor-not-allowed"
      >
        {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
      </button>
      {isLoading && (
        <p className="animate-pulse pb-7 text-center font-extralight dark:text-white">
          Loading <span className="text-violet-400">AI</span> Generated
          Images...
        </p>
      )}
      <div className="m-6 grid grid-cols-2 gap-4 md:m-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images?.imageUrls?.map((image: ImageType, i: number) => (
          <div
            key={image.name}
            className={`relative cursor-help ${
              i === 0 && "col-span-2 row-span-2"
            } transition-transform duration-200 ease-in-out hover:scale-[102%]`}
          >
            <div
              className="absolute z-10 flex h-full w-full items-center justify-center bg-white opacity-0 
                transition-opacity duration-200 hover:opacity-80 dark:bg-zinc-900"
            >
              <p className="p-3 sm:p-5 text-center text-sm xs:text-base sm:text-lg font-light dark:text-white">
                {image.name.split("_").shift()?.toString().split(".").shift()}
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
