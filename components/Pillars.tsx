'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const pillars = [
  {
    number: '01',
    title: 'Bespoke Design',
    description:
      'Every LuxuryCine project is conceived from a blank page. No templates, no off-the-shelf solutions. Only spaces crafted entirely around your architecture, your lifestyle, your vision.',
  },
  {
    number: '02',
    title: 'Acoustic Precision',
    description:
      'Sound is the soul of cinema. We engineer rooms where every frequency, every nuance, every whisper is controlled — using advanced acoustic modelling and the finest treatment materials.',
  },
  {
    number: '03',
    title: 'Cinematic Performance',
    description:
      'We specify and calibrate only reference-class equipment. Barco laser projectors. Trinnov Altitude processors. JBL Synthesis speakers. Configured to their absolute potential.',
  },
  {
    number: '04',
    title: 'Invisible Technology',
    description:
      'The greatest technology is the technology you never see. Every cable concealed. Every component integrated. The room breathes architecture, not electronics.',
  },
  {
    number: '05',
    title: 'Architectural Integration',
    description:
      'We collaborate directly with architects and interior designers from the earliest stages — ensuring the cinema is woven into the building\'s fabric, not added as an afterthought.',
  },
  {
    number: '06',
    title: 'Turnkey Delivery',
    description:
      'From first sketch to final calibration, we manage the entire journey. A single point of expertise. Zero compromise. The cinema ready exactly as imagined, on day one.',
  },
]

export default function Pillars() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 md:py-48 bg-[#111111]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="inline-block w-8 h-px bg-[#B8975A]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
              Signature Pillars
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] max-w-2xl leading-[1.1]"
          >
            Six principles.
            <br />
            <em className="italic text-[#B8975A]">One standard.</em>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5F0E8]/5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 + 0.3 }}
              className="group bg-[#111111] p-10 hover:bg-[#1A1A1A] transition-colors duration-500 cursor-default"
            >
              <div className="font-serif text-4xl text-[#B8975A]/20 group-hover:text-[#B8975A]/40 transition-colors duration-500 mb-6 font-light">
                {pillar.number}
              </div>
              <h3 className="font-serif text-xl text-[#F5F0E8] font-light mb-4 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-[13px] text-[#F5F0E8]/50 leading-relaxed font-light">
                {pillar.description}
              </p>
              {/* Gold underline on hover */}
              <div className="mt-8 w-0 group-hover:w-8 h-px bg-[#B8975A] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
