// app/components/FadeInSection.tsx
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: React.ReactNode
}

export default function FadeInSection({ children }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 100%', // เมื่อส่วนนี้เข้า viewport 80% จากบน
            toggleActions: 'play none none none', // เล่นครั้งเดียว
          },
        }
      )
    }
  }, [])

  return (
    <div ref={sectionRef}>
      {children}
    </div>
  )
}
