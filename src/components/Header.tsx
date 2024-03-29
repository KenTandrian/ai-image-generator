import { VERSION } from "@/common";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white p-5 shadow-md dark:bg-zinc-900">
      <div className="max-w-screen-3xl mx-auto flex justify-between">
        <div className="flex items-center space-x-2 text-black dark:text-zinc-200">
          <Image
            src="/openai-b.png"
            alt="Logo"
            height={30}
            width={30}
            className="dark:invert"
          />
          <div>
            <h1 className="font-bold">
              The{" "}
              <span className="text-violet-500 dark:text-violet-400">AI</span>{" "}
              Image Generator
              <span className="ml-1 rounded bg-violet-100 px-1 py-0.5 align-middle text-[0.625rem] font-medium text-violet-800 dark:bg-violet-900 dark:text-violet-300">
                {VERSION}
              </span>
            </h1>
            <h2 className="text-xs">
              Powered by DALL·E 2.0, ChatGPT & Google Cloud Functions!
            </h2>
          </div>
        </div>

        <div className="hidden items-center gap-4 text-xl sm:flex">
          <Link
            href="https://www.linkedin.com/in/kenrick-tandrian"
            target="_blank"
          >
            <FaLinkedin className="text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-500" />
          </Link>
          <Link
            href="https://github.com/KenTandrian/ai-image-generator"
            target="_blank"
          >
            <FaGithub className="text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-500" />
          </Link>
        </div>
      </div>
    </header>
  );
}
