import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

function isAllowedEmail(email: string | null | undefined) {
  return !!email && !!process.env.ALLOWED_EMAILS?.split(",").includes(email);
}

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized({ auth }) {
      return isAllowedEmail(auth?.user?.email);
    },
    signIn: ({ user }) => {
      return isAllowedEmail(user.email);
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
