"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar } from "next-nprogress-bar";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function ClientProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <Toaster position="bottom-center" />
      {children}
      <AppProgressBar
        color="#7c3aed"
        height="3px"
        options={{ showSpinner: false }}
      />
    </SessionProvider>
  );
}
