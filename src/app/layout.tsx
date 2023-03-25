import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ToastProvider from "@/components/ToastProvider";
import "../styles/globals.css";

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
    <html lang="en">
      <body>
        <ToastProvider>
          <Header />
          <PromptInput />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
