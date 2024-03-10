"use client";

import fetchImages from "@/services/fetchImages";
import { TbRefresh } from "react-icons/tb";
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
    <div>
      <button
        disabled={loading}
        onClick={() => refreshImages(images)}
        className="fixed bottom-4 right-4 z-20 flex items-center rounded-md bg-violet-400/90 px-4 py-2 font-medium text-white transition-colors
          hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:cursor-not-allowed md:bottom-8
          md:right-8"
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
          <AIImage key={i} isFirst={i === 0} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Images;
