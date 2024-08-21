import ClientProvider from "@/components/ClientProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { auth } from "@/utils/auth";

export const metadata = {
  title: "AI Art Gallery",
  description:
    "AI image generator powered by Imagen, Vertex AI & Google Cloud Functions",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html
      className={
        "dark " +
        (process.env.NODE_ENV === "development" ? "debug-screens" : "")
      }
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
