import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { CustomCursor } from "./components/custom-cursor";
import { ScrollProgressNav } from "./components/scroll-progress-nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanay — Software Engineer & Creative Developer",
  description:
    "Personal portfolio of Tanay. Building exceptional digital experiences at the intersection of design and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body>
        <CustomCursor />
        {children}
        <ScrollProgressNav />
      </body>
    </html>
  );
}
