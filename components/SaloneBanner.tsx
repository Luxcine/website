'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SaloneBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.2 }}
      className="fixed top-0 inset-x-0 z-[60] bg-[#9C8660] text-[#080808]"
    >
      <Link href="/salone-2026" className="flex items-center justify-center gap-4 py-2.5 px-6 hover:bg-[#B09A72] transition-colors duration-300 group">
        <span className="w-1.5 h-1.5 rounded-full bg-[#080808]/60 animate-pulse flex-shrink-0" />
        <span className="text-[9px] tracking-[0.32em] uppercase font-medium">
          Now Booking · Salone del Mobile.Milano 2026 · 21–26 April · Milan
        </span>
        <span className="text-[9px] tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
          Reserve →
        </span>
      </Link>
    </motion.div>
  )
}
