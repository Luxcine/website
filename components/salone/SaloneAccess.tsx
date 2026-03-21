'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const BOOKING_URL = 'https://www.luxurycine.com/salone-2026'
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(BOOKING_URL)}&color=9C8660&bgcolor=080808&margin=14&qzone=1`
const WHATSAPP_URL = `https://wa.me/351289090900?text=${encodeURIComponent('Hello, I would like to book a session at Salone del Mobile 2026 with LuxuryCine.')}`

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
              Three ways<br />
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
          <div className="md:col-span-6 md:col-start-7 grid md:grid-cols-3 divide-x divide-[#E8E4DC]/6 border border-[#E8E4DC]/6">

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

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="p-7 flex flex-col items-center text-center group">
              <div className="text-[8px] tracking-[0.25em] uppercase text-[#9C8660]/60 mb-5">WhatsApp</div>
              <div className="w-[110px] h-[110px] mb-5 flex items-center justify-center border border-[#E8E4DC]/6 group-hover:border-[#9C8660]/20 transition-colors duration-500">
                {/* WhatsApp icon */}
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-[#9C8660]/40 group-hover:text-[#9C8660]/70 transition-colors duration-500">
                  <path d="M20.52 3.48A11.84 11.84 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.02L0 24l6.14-1.61A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52ZM12 22c-1.85 0-3.67-.5-5.25-1.44l-.38-.22-3.9 1.02 1.04-3.8-.24-.4A9.97 9.97 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.95 9.95 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.47-7.55c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47a8.94 8.94 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.2 3.05c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.11.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" fill="currentColor"/>
                </svg>
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="text-[10px] tracking-[0.2em] uppercase text-[#9C8660]/60 hover:text-[#9C8660] border-b border-[#9C8660]/20 hover:border-[#9C8660]/50 pb-0.5 transition-all duration-400">
                Message us directly
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
