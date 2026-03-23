'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const partners = [
  { name: 'Barco', cat: 'Projection' },
  { name: 'Trinnov', cat: 'Audio Processing' },
  { name: 'JBL Synthesis', cat: 'Loudspeakers' },
  { name: 'Sony', cat: 'Projection' },
  { name: 'Lutron', cat: 'Lighting Control' },
  { name: 'Steinway Lyngdorf', cat: 'High-End Audio' },
  { name: 'Datasat', cat: 'Digital Cinema' },
  { name: 'Screen Research', cat: 'Screens' },
  { name: 'Stewart Filmscreen', cat: 'Projection Screens' },
  { name: 'Control4', cat: 'Control Systems' },
]

export default function TechPartners() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="technology" ref={ref} className="bg-[#0F0F0F]">
      <div className="h-px bg-[#E8E4DC]/6" />
      <div className="max-w-[1520px] mx-auto px-8 md:px-14 py-36 md:py-52">

        <div className="grid md:grid-cols-2 gap-8 mb-24 items-end">
          <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Cormorant_Garamond'] font-light text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[1.06] text-[#E8E4DC]">
            Only the<br /><em className="text-[#9C8660]">reference standard.</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[15px] text-[#E8E4DC]/65 leading-loose font-light max-w-xs self-end">
            Equipment chosen by merit, not margin. We specify what the space demands.
          </motion.p>
        </div>

        {/* Partners — pure typography, horizontal scroll feel */}
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y divide-[#E8E4DC]/6">
          {partners.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.05 + 0.4 }}
              className="group px-7 py-9 hover:bg-[#141414] transition-colors duration-500">
              <div className="font-['Cormorant_Garamond'] text-lg text-[#E8E4DC]/60 group-hover:text-[#E8E4DC]/90 transition-colors duration-500 font-light tracking-wide mb-1.5">
                {p.name}
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#9C8660]/30 group-hover:text-[#9C8660]/60 transition-colors duration-500">
                {p.cat}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
