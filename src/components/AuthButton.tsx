"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const CLASSNAMES =
  "text-violet-500 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-500";

export default function AuthButton() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <button>
      {isLoggedIn ? (
        <FaSignOutAlt className={CLASSNAMES} onClick={() => signOut()} />
      ) : (
        <FaSignInAlt className={CLASSNAMES} onClick={() => signIn()} />
      )}
    </button>
  );
}
