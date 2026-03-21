'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function SaloneCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-40 md:py-56 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/cinema-02.jpg"
          alt="LuxuryCine at Salone"
          fill
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="inline-block w-8 h-px bg-[#B8975A]" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
            Salone del Mobile.Milano 2026
          </span>
          <span className="inline-block w-8 h-px bg-[#B8975A]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-4xl md:text-6xl font-light text-[#F5F0E8] leading-[1.1] mb-8 max-w-3xl mx-auto"
        >
          Sessions are
          <br />
          <em className="italic text-[#B8975A]">filling quickly.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-[14px] font-light text-[#F5F0E8]/45 mb-12 max-w-md mx-auto"
        >
          Reserve your appointment now to secure your preferred date and time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-3 bg-[#B8975A] text-[#0D0D0D] text-[11px] tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#D4AF72] transition-colors duration-300 font-medium"
          >
            Reserve Your Session
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
