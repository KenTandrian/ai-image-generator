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
        className="fixed bottom-10 right-10 bg-violet-400/90 text-white px-5 py-3 rounded-md 
        hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20
          disabled:cursor-not-allowed"
      >
        {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
      </button>
      {isLoading && (
        <p className="animate-pulse text-center pb-7 font-extralight dark:text-white">
          Loading <span className="text-violet-400">AI</span> Generated
          Images...
        </p>
      )}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 m-6 md:m-10">
        {images?.imageUrls?.map((image: ImageType, i: number) => (
          <div
            key={image.name}
            className={`relative cursor-help ${
              i === 0 && "col-span-2 row-span-2"
            } hover:scale-[102%] transition-transform duration-200 ease-in-out`}
          >
            <div
              className="absolute flex justify-center items-center w-full h-full bg-white dark:bg-zinc-900 opacity-0 
                hover:opacity-80 transition-opacity duration-200 z-10"
            >
              <p className="text-center font-light text-lg p-5 dark:text-white">
                {image.name.split("_").shift()?.toString().split(".").shift()}
              </p>
            </div>
            <Image
              src={image.url}
              alt={image.name}
              height={800}
              width={800}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
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
