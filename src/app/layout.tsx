import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventory",
  description: "get your products",
  icons: {
    icon: [
      { url: "/ctrlbyz.svg", type: "image/svg+xml" },
      { url: "/ctrlbyz-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/ctrlbyz-192.png",
    apple: [{ url: "/ctrlbyz-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
