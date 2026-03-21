'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function SaloneBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-[#080808]">
      <div className="h-px bg-[#E8E4DC]/6" />

      <div className="max-w-[1520px] mx-auto px-8 md:px-14 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="relative border border-[#9C8660]/20 p-10 md:p-16">

          {/* Corner marks */}
          <div className="absolute top-0 left-0 w-6 h-px bg-[#9C8660]/60" />
          <div className="absolute top-0 left-0 w-px h-6 bg-[#9C8660]/60" />
          <div className="absolute top-0 right-0 w-6 h-px bg-[#9C8660]/60" />
          <div className="absolute top-0 right-0 w-px h-6 bg-[#9C8660]/60" />
          <div className="absolute bottom-0 left-0 w-6 h-px bg-[#9C8660]/60" />
          <div className="absolute bottom-0 left-0 w-px h-6 bg-[#9C8660]/60" />
          <div className="absolute bottom-0 right-0 w-6 h-px bg-[#9C8660]/60" />
          <div className="absolute bottom-0 right-0 w-px h-6 bg-[#9C8660]/60" />

          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left */}
            <div className="md:col-span-7">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-[9px] tracking-[0.38em] uppercase text-[#9C8660] mb-5">
                Milano · April 2026
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Cormorant_Garamond'] font-light text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.08] text-[#E8E4DC] mb-6">
                LuxuryCine at<br />
                <em className="text-[#9C8660]">Salone del Mobile.Milano 2026</em>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-[13px] text-[#E8E4DC]/40 leading-loose font-light max-w-md">
                21–26 April, Fiera Milano. A private showcase of our latest cinema spaces
                — by invitation only. Reserve your place for an exclusive presentation.
              </motion.p>
            </div>

            {/* Right — CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
              className="md:col-span-4 md:col-start-9 flex flex-col gap-5 md:items-end">

              <div className="space-y-2 md:text-right">
                <div className="flex md:justify-end items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9C8660]/70" />
                  <span className="text-[11px] tracking-[0.15em] uppercase text-[#E8E4DC]/50">6 days</span>
                </div>
                <div className="flex md:justify-end items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9C8660]/70" />
                  <span className="text-[11px] tracking-[0.15em] uppercase text-[#E8E4DC]/50">Private sessions</span>
                </div>
                <div className="flex md:justify-end items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9C8660]/70" />
                  <span className="text-[11px] tracking-[0.15em] uppercase text-[#E8E4DC]/50">Limited availability</span>
                </div>
              </div>

              <Link href="/salone-2026"
                className="inline-block mt-4 text-[10px] tracking-[0.28em] uppercase text-[#9C8660] border-b border-[#9C8660]/40 pb-0.5 hover:border-[#9C8660] transition-colors duration-400">
                Reserve your session →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
