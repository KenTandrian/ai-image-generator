import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ToastProvider from "@/components/ToastProvider";
import "../styles/globals.css";
import Footer from "@/components/Footer";

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
      className={process.env.NODE_ENV === "development" ? "debug-screens" : ""}
      lang="en"
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
