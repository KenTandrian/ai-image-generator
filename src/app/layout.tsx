import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ToastProvider from "@/components/ToastProvider";
import "@/styles/globals.css";

export const metadata = {
  title: "AI Art Gallery",
  description:
    "AI image generator powered by Imagen, Vertex AI & Google Cloud Functions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <ToastProvider>
          <Header />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
