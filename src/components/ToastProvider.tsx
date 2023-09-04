"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="bottom-center" />
      {children}
    </>
  );
}
