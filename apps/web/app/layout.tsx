import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Solana App",
  description: "Solana wallet integration with Next.js"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-screen flex flex-col items-center justify-center`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}