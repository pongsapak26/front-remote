/* eslint-disable @next/next/inline-script-id */
import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Vanta from "@/components/Vanta";
import Aos from "@/components/Aos";

export const metadata: Metadata = {
  title: "EA Key | ระบบจัดการคีย์ EA สำหรับเทรดเดอร์",
  description: "ระบบจัดการคีย์ EA สำหรับนักเทรด Forex ใช้งานง่าย ปลอดภัย และรองรับการใช้งานหลายระดับ",
  keywords: ["EA", "EA Key", "Forex", "ระบบจัดการ EA", "MetaTrader", "Forex Trading", "เทรดเดอร์"],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: "EA Key | ระบบจัดการคีย์ EA สำหรับเทรดเดอร์",
    description: "จัดการคีย์ EA ของคุณอย่างมืออาชีพ รองรับ MetaTrader และระบบตรวจสอบการใช้งาน",
    siteName: "EA Key",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg", // ใช้ภาพขนาด 1200x630px
        width: 1200,
        height: 630,
        alt: "EA Key OG Image",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EA Key | ระบบจัดการคีย์ EA สำหรับเทรดเดอร์",
    description: "ระบบบริหารจัดการคีย์ EA สำหรับนักเทรดแบบครบวงจร",
    images: ["https://your-domain.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="BGALL">
        <Vanta>
          <Aos>
            <div className="flex flex-col w-full h-screen text-white">
              <UserProvider>
                <>{children}</>
              </UserProvider>
            </div>
          </Aos>
        </Vanta>
      </body>
    </html>
  );
}
