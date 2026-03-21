'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SaloneBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-[#080808]">
      <div className="h-px bg-[#E8E4DC]/6" />

      {/* Full-bleed event banner */}
      <div className="relative overflow-hidden h-[70vh] min-h-[500px] max-h-[760px]">
        <Image
          src="/assets/images/cinema-05.jpg"
          alt="LuxuryCine at Salone del Mobile 2026"
          fill
          quality={85}
          className="object-cover object-center"
        />
        {/* Dark overlay — heavier on left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/60 to-[#080808]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-[#080808]/30" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1520px] mx-auto px-8 md:px-14 w-full">
            <div className="max-w-2xl">

              {/* Live badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 border border-[#9C8660]/30 px-4 py-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9C8660] animate-pulse" />
                <span className="text-[9px] tracking-[0.35em] uppercase text-[#9C8660]">
                  Now Booking · Salone del Mobile.Milano 2026
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Cormorant_Garamond'] font-light text-[clamp(2.4rem,5vw,5rem)] leading-[1.04] text-[#E8E4DC] mb-6">
                A private cinema<br />
                <em className="text-[#9C8660]">in the heart of Milan.</em>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.35 }}
                className="text-[14px] text-[#E8E4DC]/45 leading-loose font-light max-w-md mb-10">
                21–26 April 2026, Fiera Milano. A 25-minute private screening experience
                by invitation — designed to show what is possible when architecture,
                acoustics and cinema converge at the highest level.
              </motion.p>

              {/* Details row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-wrap gap-6 mb-10">
                {[
                  { label: 'Dates', value: '21 – 26 April' },
                  { label: 'Sessions', value: '25 min · Private' },
                  { label: 'Capacity', value: 'Limited availability' },
                ].map(d => (
                  <div key={d.label}>
                    <div className="text-[8px] tracking-[0.25em] uppercase text-[#9C8660]/60 mb-0.5">{d.label}</div>
                    <div className="text-[12px] text-[#E8E4DC]/55">{d.value}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="flex flex-wrap items-center gap-5">
                <Link href="/salone-2026"
                  className="inline-flex items-center gap-3 bg-[#9C8660] text-[#080808] text-[10px] tracking-[0.28em] uppercase px-10 py-4 hover:bg-[#B09A72] transition-colors duration-400 font-medium">
                  Book Your Session
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/salone-2026"
                  className="text-[10px] tracking-[0.22em] uppercase text-[#E8E4DC]/35 hover:text-[#E8E4DC]/70 border-b border-transparent hover:border-[#E8E4DC]/30 pb-0.5 transition-all duration-400">
                  Discover the Experience
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
