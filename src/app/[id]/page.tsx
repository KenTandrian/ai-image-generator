import Image from "next/image";
import Link from "next/link";
import { CircleFlag } from "react-circle-flags";
import { FcGoogle } from "react-icons/fc";
import { LuChevronLeft } from "react-icons/lu";
import { findModel } from "@/data/imagen-models";
import { callableFn } from "@/services/firebase";
import type { ImageType } from "@/types";

async function fetchData(path: string) {
  const fn = callableFn<{ path: string }, ImageType>("getImage");
  const resp = await fn({ path });
  return resp.data;
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const imgName = decodeURIComponent(id);

  // Fetch image data
  const image = await fetchData(imgName);
  const model = findModel(image.metadata.model);
  const Logo = model?.logo ?? FcGoogle;

  return (
    <div className="max-w-screen-3xl mx-auto my-6 px-6 md:my-10 md:px-10">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <Image
            src={image.url}
            alt={image.name}
            height={800}
            width={800}
            className="-z-10 w-full rounded-lg shadow-2xl drop-shadow-lg"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            draggable={false}
          />
        </div>
        <div className="mx-6 my-4 flex flex-col gap-8 lg:mx-10 lg:my-5">
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 transition-colors hover:bg-zinc-800"
            >
              <LuChevronLeft className="mr-1 -ml-1 inline-block h-5 w-5" />
              Back
            </Link>
          </div>
          <div>
            <p className="text-sm tracking-wider text-violet-500 uppercase">
              Prompt
            </p>
            <h1
              className="mt-2 line-clamp-[8] text-2xl lg:text-3xl"
              title={image.metadata.prompt}
            >
              {image.metadata.prompt}
            </h1>
          </div>
          <div>
            <p className="text-sm tracking-wider text-violet-500 uppercase">
              Image Generator
            </p>
            <h1 className="mt-2 flex items-center text-xl lg:text-2xl">
              <Logo className="mr-2.5 inline-block" />
              {model?.vendor} {model?.name}
            </h1>
          </div>
          <div>
            <p className="text-sm tracking-wider text-violet-500 uppercase">
              Created at
            </p>
            <h1 className="mt-2 text-xl lg:text-2xl">
              {Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
                timeStyle: "medium",
              }).format(new Date(image.metadata.createdAt))}
            </h1>
          </div>
          <div>
            <p className="text-sm tracking-wider text-violet-500 uppercase">
              Location
            </p>
            <h1 className="mt-2 flex items-center text-xl lg:text-2xl">
              {image.metadata.geo?.country && (
                <CircleFlag
                  className="mr-2.5 inline-block h-5 w-5"
                  countryCode={image.metadata.geo.country.toLowerCase()}
                />
              )}
              {image.metadata.geo
                ? `${image.metadata.geo?.city}, ${image.metadata.geo?.country}`
                : "Unknown"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
