import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Imperial Internet | Fast. Reliable. Local.",
  description:
    "Imperial Internet - Fiber internet provider for Cavite, Philippines. Fast, reliable, and locally supported internet for homes and businesses.",
  keywords: ["internet", "fiber", "ISP", "Cavite", "Philippines", "broadband"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
