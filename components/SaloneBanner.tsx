'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SaloneBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      className="fixed top-0 inset-x-0 z-[60] bg-[#9C8660]"
    >
      <Link href="/salone-2026" className="flex items-center justify-center gap-5 py-4 px-6 hover:bg-[#AA9268] transition-colors duration-300 group">
        <span className="w-2 h-2 rounded-full bg-[#080808]/70 animate-pulse flex-shrink-0" />
        <span className="text-[#080808] text-[11px] tracking-[0.28em] uppercase font-semibold">
          Now Booking — Salone del Mobile.Milano 2026
        </span>
        <span className="hidden md:block w-px h-3 bg-[#080808]/25 flex-shrink-0" />
        <span className="hidden md:block text-[#080808]/60 text-[10px] tracking-[0.2em] uppercase flex-shrink-0">
          21–26 April · Milan
        </span>
        <span className="ml-1 flex items-center gap-1.5 text-[#080808] text-[10px] tracking-[0.22em] uppercase font-medium border border-[#080808]/25 px-3 py-1 group-hover:bg-[#080808]/10 transition-colors duration-300 flex-shrink-0">
          Reserve your session
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </Link>
    </motion.div>
  )
}
