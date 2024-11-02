import ClientProvider from "@/components/ClientProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { auth } from "@/utils/auth";
import { cn } from "@/utils/classname";
import { Plus_Jakarta_Sans } from "next/font/google";

import "@/styles/globals.css";

export const metadata = {
  title: "AI Art Gallery",
  description:
    "AI image generator powered by Imagen, Vertex AI & Google Cloud Functions",
};

const pjs = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-pjs",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html
      className={cn(
        pjs.variable,
        "dark",
        process.env.NODE_ENV === "development" ? "debug-screens" : ""
      )}
      lang="en"
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-white dark:bg-zinc-950">
        <ClientProvider session={session}>
          <Header />
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
