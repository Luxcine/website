'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const spaces = [
  { label: 'Private Cinema · Quinta do Lago', title: 'Lote 11 — Quinta do Lago', image: '/assets/images/cinema-qdl-01.jpg', desc: 'Reference-class projection, enveloping sound, bespoke seating — calibrated to perfection.' },
  { label: 'Private Cinema · Algarve', title: 'Lt. 23 — Private Villa', image: '/assets/images/cinema-lt23-01.jpg', desc: 'Intimate settings with the precision of a professional screening room.' },
  { label: 'Cinema Lounge · Algarve', title: 'Villa Screening Room', image: '/assets/images/cinema-s07.jpg', desc: 'Where architecture and acoustics combine to create an extraordinary experience.' },
  { label: 'Signature Project · Palm Hills', title: 'The Palm Hills Estate', image: '/assets/images/space-palm.png', desc: 'Our most ambitious commissions — architecture and cinema conceived as one.' },
]

export default function FeaturedSpaces() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="spaces" ref={ref} className="bg-[#080808]">
      <div className="h-px bg-[#E8E4DC]/6" />
      <div className="max-w-[1520px] mx-auto px-8 md:px-14 py-36 md:py-52">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="text-[9px] tracking-[0.38em] uppercase text-[#9C8660] mb-5">
              Featured Spaces
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-['Cormorant_Garamond'] font-light text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[1.06] text-[#E8E4DC]">
              Spaces that<br /><em className="text-[#9C8660]">stay with you.</em>
            </motion.h2>
          </div>
          <motion.a href="#contact" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="hidden md:block text-[10px] tracking-[0.22em] uppercase text-[#E8E4DC]/30 hover:text-[#9C8660] transition-colors duration-400 border-b border-transparent hover:border-[#9C8660]/40 pb-0.5">
            All Projects
          </motion.a>
        </div>

        {/* Grid — editorial asymmetric */}
        <div className="grid md:grid-cols-12 gap-3">
          {/* Large — 7 cols */}
          <SpaceCard space={spaces[0]} i={0} inView={inView} cn="md:col-span-7 h-[56vw] md:h-[600px]" />
          {/* Right stack — 5 cols */}
          <div className="md:col-span-5 grid grid-rows-2 gap-3 h-[56vw] md:h-[600px]">
            <SpaceCard space={spaces[1]} i={1} inView={inView} cn="h-full" />
            <SpaceCard space={spaces[2]} i={2} inView={inView} cn="h-full" />
          </div>
          {/* Wide bottom */}
          <SpaceCard space={spaces[3]} i={3} inView={inView} cn="md:col-span-12 h-[44vw] md:h-[460px]" />
        </div>
      </div>
    </section>
  )
}

function SpaceCard({ space, i, inView, cn }: { space: typeof spaces[0]; i: number; inView: boolean; cn: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
      className={`group relative overflow-hidden bg-[#141414] ${cn}`}>
      <Image src={space.image} alt={space.title} fill quality={80}
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]" />
      {/* Subtle gradient — less heavy than before */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-transparent to-transparent" />

      {/* Content — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#9C8660] mb-2">{space.label}</p>
        <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#E8E4DC] font-light leading-tight">
          {space.title}
        </h3>
        <p className="text-[12px] text-[#E8E4DC]/40 leading-relaxed max-w-sm mt-2.5
          opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {space.desc}
        </p>
      </div>
    </motion.div>
  )
}
