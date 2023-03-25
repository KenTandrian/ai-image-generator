import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md space-y-2">
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

      <div className="hidden sm:flex text-xs md:text-base divide-x items-center text-gray-500">
        <Link
          href="https://www.linkedin.com/in/kenrick-tandrian"
          className="px-2 font-light text-right"
          target="_blank"
        >
          Check out my LinkedIn!
        </Link>
        <Link
          href="https://github.com/KenTandrian/ai-image-generator"
          className="px-2 font-light"
          target="_blank"
        >
          Github Repo
        </Link>
      </div>
    </header>
  );
};

export default Header;
