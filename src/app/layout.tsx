import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ToastProvider from "@/components/ToastProvider";
import "@/styles/globals.css";

export const metadata = {
  title: "AI Art Gallery",
  description: "Generated using DALL·E 2.0, ChatGPT & Google Cloud Functions",
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
          <PromptInput />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
