/* eslint-disable @next/next/inline-script-id */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Vanta from "@/components/Vanta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EA Key",
  description: "EA Key Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="BGALL"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Vanta>
          <div className="flex flex-col w-full h-screen text-white">
            <UserProvider>
              <div className="container mx-auto mt-10">{children}</div>
            </UserProvider>
          </div>
        </Vanta>
      </body>
    </html>
  );
}
