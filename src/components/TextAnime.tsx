"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
interface Props {
  text: string;
}
export default function TextAnime({ text }: Props) {
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    gsap.from(lettersRef.current, {
        duration: 0.5, 
        x: 300, 
        autoAlpha: 0, 
        ease: "elastic", 
        stagger: 0.05
    });
  }, []);

  return (
    <div className="text-4xl font-bold flex justify-center mt-10">
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) lettersRef.current[i] = el;
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
