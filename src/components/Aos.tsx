"use client";
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const Aos = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // animation only once on scroll
    });
  }, []);
  return <div>{children}</div>;
};

export default Aos;
