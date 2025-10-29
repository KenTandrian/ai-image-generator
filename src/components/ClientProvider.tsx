"use client";

import { AppProgressProvider } from "@bprogress/next";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type React from "react";
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
      <AppProgressProvider
        color="#7c3aed"
        height="3px"
        options={{ showSpinner: false }}
      >
        {children}
      </AppProgressProvider>
    </SessionProvider>
  );
}
