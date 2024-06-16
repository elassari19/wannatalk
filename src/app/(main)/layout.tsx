import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wanna Talk",
  description: "Wanna Talk is a simple app that allows you to record your voice and get a summary of what you said.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen w-screen`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
