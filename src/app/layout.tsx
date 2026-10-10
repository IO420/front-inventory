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
    icon: "/ctrlbys.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Header/>
        <main>{children}</main>
      </body>
    </html>
  );
}