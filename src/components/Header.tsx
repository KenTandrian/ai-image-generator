import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
      <div className="flex space-x-2 items-center">
        <Image
          src="https://links.papareact.com/4t3"
          alt="Logo"
          height={30}
          width={30}
        />

        <div>
          <h1 className="font-bold">
            The <span className="text-violet-500">AI</span> Image Generator
          </h1>
          <h2 className="text-xs">
            Powered by DALL·E 2.0, ChatGPT & Google Cloud Functions!
          </h2>
        </div>
      </div>

      <div className="hidden sm:flex text-xl items-center gap-4">
        <Link
          href="https://www.linkedin.com/in/kenrick-tandrian"
          target="_blank"
        >
          <FaLinkedin className="text-gray-500 hover:text-gray-700" />
        </Link>
        <Link
          href="https://github.com/KenTandrian/ai-image-generator"
          target="_blank"
        >
          <FaGithub className="text-gray-500 hover:text-gray-700" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
