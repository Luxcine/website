'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function SaloneHero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/cinema-04.jpg"
          alt="LuxuryCine — Salone del Mobile 2026"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-[#0D0D0D]/20" />
        <div className="absolute inset-0 bg-[#0D0D0D]/30" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 md:px-16 pb-24 md:pb-36">
        {/* Event badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-3 border border-[#B8975A]/30 px-5 py-2.5 mb-10"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#B8975A]">
            Salone del Mobile.Milano 2026 — April 21–26
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] text-[#F5F0E8] mb-8 max-w-4xl"
        >
          A private cinema,
          <br />
          <em className="italic text-[#B8975A]">in the heart of Milan.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[15px] font-light text-[#F5F0E8]/55 leading-relaxed max-w-xl mb-12"
        >
          LuxuryCine invites you to a 25-minute private screening experience —
          designed to show what is possible when architecture, acoustics and
          cinema converge at the highest level.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#experience"
            className="inline-flex items-center gap-3 border border-[#B8975A] text-[#B8975A] text-[11px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#B8975A]/10 transition-colors duration-300 font-medium"
          >
            Discover the Experience
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Event details bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-0 left-0 right-0 border-t border-[#F5F0E8]/8 bg-[#0D0D0D]/60 backdrop-blur-sm"
      >
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Dates', value: 'April 21 – 26, 2026' },
            { label: 'Hours', value: '10:00 – 18:00' },
            { label: 'Duration', value: '25 min per session' },
            { label: 'Location', value: 'Milan, Italy' },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-[9px] tracking-[0.25em] uppercase text-[#B8975A] mb-1">{item.label}</div>
              <div className="text-[12px] text-[#F5F0E8]/60 font-light">{item.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
