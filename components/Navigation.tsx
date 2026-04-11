'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Philosophy', href: '#brand' },
  { label: 'Spaces', href: '#spaces' },
  { label: 'Process', href: '#process' },
  { label: 'Technology', href: '#technology' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-[48px] z-50 transition-colors duration-700 ${
          scrolled ? 'bg-[#080808]/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-8 md:px-14 h-[72px] flex items-center justify-between">

          <a href="/" className="flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-300">
            <Image src="/assets/logos/luxcine-white.svg" alt="LuxuryCine" width={200} height={84} priority />
          </a>

          {/* Centre nav — desktop */}
          <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}
                className="text-[11px] tracking-[0.22em] uppercase text-[#E8E4DC]/65 hover:text-[#E8E4DC] transition-colors duration-500 font-normal">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-7">
            <a href="#contact"
              className="hidden md:block text-[11px] tracking-[0.18em] uppercase text-[#B09A72] hover:text-[#C9AE84] transition-colors duration-300 font-normal">
              Begin a Project
            </a>
            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1.5" aria-label="Menu">
              <span className={`block w-5 h-px bg-[#E8E4DC]/60 transition-all duration-400 ${menuOpen ? 'rotate-45 translate-y-[3px]' : 'mb-[5px]'}`} />
              <span className={`block w-5 h-px bg-[#E8E4DC]/60 transition-all duration-400 ${menuOpen ? '-rotate-45' : ''}`} />
            </button>
          </div>
        </div>
        {/* Bottom rule — only when scrolled */}
        <div className={`h-px bg-[#E8E4DC]/5 transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col items-start justify-end pb-20 px-10"
          >
            <div className="space-y-6 mb-14">
              {navLinks.map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-['Cormorant_Garamond'] text-5xl font-light text-[#E8E4DC]/80 hover:text-[#E8E4DC] italic transition-colors duration-300">
                  {l.label}
                </motion.a>
              ))}
            </div>
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="text-[10px] tracking-[0.28em] uppercase text-[#9C8660]">
              Begin a Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
