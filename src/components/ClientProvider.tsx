"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Toaster position="bottom-center" />
      {children}
    </SessionProvider>
  );
}
