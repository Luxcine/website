'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function BrochureQR() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const BROCHURE_URL = 'https://www.luxurycine.com/brochure'
  const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(BROCHURE_URL)}&format=png&margin=2&qzone=2&ecc=H`

  return (
    <section ref={ref} className="relative py-32 md:py-40 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="inline-block w-8 h-px bg-[#B8975A]" />
              <span className="text-[11px] tracking-[0.30em] uppercase text-[#C9AE84]">
                Brochure
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] leading-[1.1] mb-8">
              Discover the full <em className="italic text-[#B8975A]">LuxuryCine</em> story
            </h2>
            <p className="text-[15px] font-light text-[#F5F0E8]/70 leading-relaxed mb-10 max-w-md">
              A curated publication — spaces, partners, process.
              Download directly, or scan the code with your phone.
            </p>
            <a
              href={BROCHURE_URL}
              className="inline-flex items-center gap-3 bg-[#B8975A] text-[#0D0D0D] text-[11px] tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#D4AF72] transition-colors duration-300 font-medium"
            >
              Download Brochure
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V11M8 11L4 7M8 11L12 7M3 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          {/* Right: QR Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative bg-[#F5F0E8] p-10 md:p-12 shadow-2xl border border-[#B8975A]/30 max-w-[480px] w-full">
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#B8975A]" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#B8975A]" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#B8975A]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#B8975A]" />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={QR_SRC}
                alt="Scan QR to download LuxuryCine brochure"
                className="w-full h-auto block"
                width={600}
                height={600}
              />
              <p className="text-[10px] tracking-[0.25em] uppercase text-center text-[#0D0D0D] mt-6 font-medium">
                Scan to download
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
