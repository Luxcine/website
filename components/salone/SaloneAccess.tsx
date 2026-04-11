'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const BOOKING_URL = 'https://luxurycine.com/salone-2026'
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(BOOKING_URL)}&color=9C8660&bgcolor=080808&margin=14&qzone=1`

export default function SaloneAccess() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-[#080808]">
      <div className="h-px bg-[#E8E4DC]/6" />
      <div className="max-w-[1520px] mx-auto px-8 md:px-14 py-24 md:py-36">

        <div className="grid md:grid-cols-12 gap-12 items-center">

          {/* Left — header */}
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="text-[9px] tracking-[0.38em] uppercase text-[#9C8660] mb-5">
              Book Your Session
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-['Cormorant_Garamond'] font-light text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.08] text-[#E8E4DC] mb-6">
              Two ways<br />
              <em className="text-[#9C8660]">to reserve.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-[13px] text-[#E8E4DC]/35 leading-loose font-light max-w-xs">
              Choose the method most convenient for you. All sessions are by appointment only — limited to 12 guests per slot.
            </motion.p>
          </div>

          {/* Right — options */}
          <div className="md:col-span-6 md:col-start-7 grid md:grid-cols-2 divide-x divide-[#E8E4DC]/6 border border-[#E8E4DC]/6">

            {/* QR Code */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="p-7 flex flex-col items-center text-center">
              <div className="text-[8px] tracking-[0.25em] uppercase text-[#9C8660]/60 mb-5">Scan & Book</div>
              <div className="relative w-[110px] h-[110px] mb-5 border border-[#E8E4DC]/6">
                {/* Corner marks */}
                <div className="absolute -top-px -left-px w-3 h-px bg-[#9C8660]/50" />
                <div className="absolute -top-px -left-px w-px h-3 bg-[#9C8660]/50" />
                <div className="absolute -top-px -right-px w-3 h-px bg-[#9C8660]/50" />
                <div className="absolute -top-px -right-px w-px h-3 bg-[#9C8660]/50" />
                <div className="absolute -bottom-px -left-px w-3 h-px bg-[#9C8660]/50" />
                <div className="absolute -bottom-px -left-px w-px h-3 bg-[#9C8660]/50" />
                <div className="absolute -bottom-px -right-px w-3 h-px bg-[#9C8660]/50" />
                <div className="absolute -bottom-px -right-px w-px h-3 bg-[#9C8660]/50" />
                <Image
                  src={QR_URL}
                  alt="Scan to book your Salone session"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <p className="text-[10px] text-[#E8E4DC]/25 leading-relaxed">
                Point your camera<br />at the code
              </p>
            </motion.div>

            {/* Online */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="p-7 flex flex-col items-center text-center group">
              <div className="text-[8px] tracking-[0.25em] uppercase text-[#9C8660]/60 mb-5">Book Online</div>
              <div className="w-[110px] h-[110px] mb-5 flex items-center justify-center border border-[#E8E4DC]/6 group-hover:border-[#9C8660]/20 transition-colors duration-500">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#9C8660]/40 group-hover:text-[#9C8660]/70 transition-colors duration-500">
                  <rect x="4" y="4" width="24" height="24" rx="1" stroke="currentColor" strokeWidth="1"/>
                  <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </div>
              <a href="#booking"
                className="text-[10px] tracking-[0.2em] uppercase text-[#9C8660]/60 hover:text-[#9C8660] border-b border-[#9C8660]/20 hover:border-[#9C8660]/50 pb-0.5 transition-all duration-400">
                Use the form above
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
