import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { auth, signIn, signOut } from "@/utils/auth";

const CLASSNAMES =
  "text-violet-500 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-500";

export default async function AuthButton() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <form
      action={async () => {
        "use server";
        if (isLoggedIn) await signOut();
        else await signIn();
      }}
      className="h-5"
    >
      <button type="submit">
        {isLoggedIn ? (
          <FaSignOutAlt className={CLASSNAMES} />
        ) : (
          <FaSignInAlt className={CLASSNAMES} />
        )}
      </button>
    </form>
  );
}
