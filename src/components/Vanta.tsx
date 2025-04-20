/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Script from "next/script";
import React, { useEffect, useRef } from "react";

const Vanta = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  let vantaEffect: any = null;

  useEffect(() => {
    // ทำงานเมื่อ window พร้อม
    if (
      typeof window !== "undefined" &&
      (window as any).VANTA &&
      vantaRef.current
    ) {
      vantaEffect = (window as any).VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x410000,
        backgroundColor: 0x0,
        points: 11.00,
        maxDistance: 24.00,
        spacing: 16.00
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
        strategy="beforeInteractive"
      />

      <div
        ref={vantaRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Vanta;
