'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const partners = [
  { name: 'Barco', category: 'Projection' },
  { name: 'Trinnov', category: 'Audio Processing' },
  { name: 'JBL Synthesis', category: 'Loudspeakers' },
  { name: 'Sony', category: 'Projection' },
  { name: 'Lutron', category: 'Lighting Control' },
  { name: 'Steinway Lyngdorf', category: 'High-End Audio' },
  { name: 'Datasat', category: 'Digital Cinema' },
  { name: 'Screen Research', category: 'Screens' },
  { name: 'Severtson', category: 'Projection Screens' },
  { name: 'Crestron', category: 'Control Systems' },
]

export default function TechPartners() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="technology" ref={ref} className="py-32 md:py-48 bg-[#0D0D0D]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="mb-20 md:mb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="inline-block w-8 h-px bg-[#B8975A]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
              Technology Partners
            </span>
            <span className="inline-block w-8 h-px bg-[#B8975A]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] leading-[1.1] mb-6"
          >
            Only the reference standard.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[15px] font-light text-[#F5F0E8]/50 max-w-xl mx-auto"
          >
            We partner exclusively with manufacturers whose products define the ceiling
            of performance in their category. Equipment chosen by merit, not margin.
          </motion.p>
        </div>

        {/* Partners grid — elegant text-based display */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#F5F0E8]/5">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 + 0.5 }}
              className="group bg-[#0D0D0D] px-6 py-10 flex flex-col items-center justify-center text-center hover:bg-[#1A1A1A] transition-colors duration-400"
            >
              <div className="font-serif text-lg md:text-xl text-[#F5F0E8]/40 group-hover:text-[#F5F0E8]/80 transition-colors duration-400 font-light mb-2 tracking-wide">
                {partner.name}
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#B8975A]/40 group-hover:text-[#B8975A]/70 transition-colors duration-400">
                {partner.category}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center text-[12px] text-[#F5F0E8]/25 mt-10 tracking-wide"
        >
          Specifications are tailored to each project. We specify what the space demands, not what a catalogue suggests.
        </motion.p>
      </div>
    </section>
  )
}
