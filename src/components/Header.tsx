import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import AuthButton from "@/components/AuthButton";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="flex items-center h-16 border-b border-border justify-between">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2" />
        <div>Image Gallery</div>
      </div>

      <div className="hidden items-center gap-4 text-xl sm:flex px-4">
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
        <AuthButton />
      </div>
    </header>
  );
}
