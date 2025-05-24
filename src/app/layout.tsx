import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MessageSection from "@/components/MessageSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkUp | Social Media Platform",
  description: "Connect and share with friends on LinkUp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
         <div className="sticky   top-0 z-50 bg-white shadow-sm">
          <Navbar />
        </div>

         <div className="relative mt-20 flex min-h-[calc(100vh-64px)]">
           <main className="flex-1 px-4 md:px-8 pt-4">{children}</main>

           <MessageSection />
        </div>
      </body>
    </html>
  );
}
