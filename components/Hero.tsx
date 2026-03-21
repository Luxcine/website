'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/hero.jpg"
          alt="LuxuryCine — Private Cinema"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        {/* Multi-layer gradient overlay — cinematic dark luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#0D0D0D]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 md:px-16 pb-24 md:pb-32">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="inline-block w-8 h-px bg-[#B8975A]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A] font-light">
              Private Cinema Atelier
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] text-[#F5F0E8] mb-8"
          >
            Where Architecture
            <br />
            <em className="italic text-[#B8975A]">Meets Cinema</em>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[15px] font-light text-[#F5F0E8]/60 leading-relaxed max-w-xl mb-12 tracking-wide"
          >
            We design and engineer bespoke private cinema spaces for those who understand
            that the finest experiences are built — not bought.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-[#B8975A] text-[#0D0D0D] text-[11px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#D4AF72] transition-colors duration-300 font-medium"
            >
              Begin Your Project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#spaces"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition-colors duration-300 px-2 py-4"
            >
              Explore Our Work
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-16 flex flex-col items-center gap-3 hidden md:flex"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-[#B8975A] to-transparent"
        />
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#F5F0E8]/40 rotate-90 origin-center mt-4">
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
