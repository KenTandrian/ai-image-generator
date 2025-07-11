"use client";

import fetchImages from "@/services/fetchImages";
import { cn } from "@/utils/classname";
import { TbHistory, TbLoader2, TbRefresh, TbStar } from "react-icons/tb";
import useSWR from "swr";
import AIImage from "./Image";

const Images = () => {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });
  const loading = !isLoading && isValidating;

  return (
    <div className="max-w-screen-3xl mx-auto mb-12">
      <button
        disabled={loading}
        onClick={() => refreshImages(images)}
        className="fixed right-4 bottom-4 z-20 flex items-center rounded-md bg-violet-400/90 px-4 py-2 font-medium text-white transition-colors hover:bg-violet-500 focus:ring-2 focus:ring-violet-400 focus:outline-none disabled:cursor-not-allowed md:right-8 md:bottom-8"
      >
        <TbRefresh className={cn("mr-2", loading && "animate-spin")} />
        {loading ? "Refreshing..." : "Refresh Images"}
      </button>
      {isLoading && (
        <div className="mb-7 text-center">
          <TbLoader2 className="mb-3 inline-block h-10 w-10 animate-spin text-violet-400" />
          <p className="animate-pulse font-extralight dark:text-white">
            Loading <span className="text-violet-400">AI</span> Generated
            Images...
          </p>
        </div>
      )}
      {!isLoading && (
        <div className="mx-6 text-2xl font-medium md:mx-10">
          <TbHistory className="mr-2 mb-1 inline-block h-8 w-8 text-violet-400" />
          Recent
        </div>
      )}
      <div className="mx-6 my-3 grid grid-cols-2 gap-4 md:mx-10 md:my-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {images?.imageUrls?.map((image, i) => (
          <AIImage key={i} isFirst={i === 0} image={image} />
        ))}
      </div>
      {!isLoading && (
        <div className="mx-6 mt-12 text-2xl font-medium md:mx-10">
          <TbStar className="mr-2 mb-1 inline-block h-8 w-8 text-violet-400" />
          Favorites
        </div>
      )}
      <div className="mx-6 my-3 grid grid-cols-2 gap-4 md:mx-10 md:my-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {images?.favorites?.map((image, i) => (
          <AIImage key={i} isFirst={i === 0} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Images;
