import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar, SiteFooter } from "@/components/core";
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
  title: "Solbase",
  description: "A basic prediction marketplace on Solana"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen w-full flex-col bg-background text-foreground antialiased`}
      >
        <Providers>
          <NavBar />
          <main className="flex w-full flex-1 items-center justify-center px-4 py-8">
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
