'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex flex-col justify-end overflow-hidden">
      {/* Image — minimal overlay, let it breathe */}
      <div className="absolute inset-0">
        <Image src="/assets/images/cinema-s01.jpg" alt="LuxuryCine" fill priority quality={90}
          className="object-cover object-center scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
      </div>

      {/* Bottom content — architectural bottom-left positioning */}
      <div className="relative z-10 max-w-[1520px] mx-auto w-full px-8 md:px-14 pb-16 md:pb-20">

        {/* Top label — minimal */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[9px] tracking-[0.38em] uppercase text-[#9C8660] mb-10 font-normal">
          Private Cinema Atelier
        </motion.p>

        {/* Headline — Apple scale, B&O restraint */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Cormorant_Garamond'] font-light text-[clamp(3.2rem,8vw,7.5rem)] leading-[1.0] text-[#E8E4DC] mb-8 max-w-3xl">
          Where architecture<br />
          <em className="italic text-[#9C8660]">meets cinema.</em>
        </motion.h1>

        {/* Bottom row — copy + CTA separated */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="text-[13px] text-[#E8E4DC]/45 font-light leading-loose max-w-sm">
            We design and engineer bespoke private cinema spaces
            for those who understand the finest experiences are built — not bought.
          </p>
          <div className="flex items-center gap-8">
            <a href="#contact"
              className="text-[10px] tracking-[0.22em] uppercase text-[#E8E4DC]/90 hover:text-[#9C8660] transition-colors duration-500 border-b border-[#E8E4DC]/20 hover:border-[#9C8660] pb-0.5">
              Begin Your Project
            </a>
            <a href="#spaces"
              className="text-[10px] tracking-[0.22em] uppercase text-[#E8E4DC]/30 hover:text-[#E8E4DC]/60 transition-colors duration-500">
              Our Work
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute right-14 bottom-16 hidden md:flex flex-col items-center gap-4">
        <motion.div animate={{ scaleY: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="w-px h-14 bg-gradient-to-b from-[#9C8660]/60 to-transparent origin-top" />
      </motion.div>
    </section>
  )
}
