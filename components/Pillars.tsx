'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const pillars = [
  { n: '01', title: 'Bespoke Design', body: 'Every project conceived from a blank page. No templates. Only spaces crafted entirely around your architecture, your lifestyle, your vision.' },
  { n: '02', title: 'Acoustic Precision', body: 'Sound is the soul of cinema. We engineer rooms where every frequency, every nuance is controlled — using advanced acoustic modelling.' },
  { n: '03', title: 'Cinematic Performance', body: 'Reference-class only. Barco laser projectors. Trinnov Altitude processors. JBL Synthesis. Each system configured to its absolute potential.' },
  { n: '04', title: 'Invisible Technology', body: 'The greatest technology is the technology you never see. Every cable concealed. Every component integrated. The room breathes architecture.' },
  { n: '05', title: 'Architectural Integration', body: 'We engage from the earliest planning stages — ensuring the cinema is woven into the building\'s fabric, not added as an afterthought.' },
  { n: '06', title: 'Turnkey Delivery', body: 'From first sketch to final calibration, one point of expertise. Zero compromise. Ready exactly as imagined, on day one.' },
]

export default function Pillars() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-[#0F0F0F]">
      <div className="h-px bg-[#E8E4DC]/6" />
      <div className="max-w-[1520px] mx-auto px-8 md:px-14 py-36 md:py-52">

        {/* Header — editorial two-col */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Cormorant_Garamond'] font-light text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[1.06] text-[#E8E4DC]">
            Six principles.<br /><em className="text-[#9C8660]">One standard.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-[15px] text-[#E8E4DC]/75 leading-loose self-end max-w-sm font-light">
            Every decision we make is guided by a single measure: does this serve the experience? Not the specification. The experience.
          </motion.p>
        </div>

        {/* Pillars — editorial list rows */}
        <div className="divide-y divide-[#E8E4DC]/6">
          {pillars.map((p, i) => (
            <motion.div key={p.n}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: i * 0.08 + 0.3 }}
              className="group grid md:grid-cols-12 gap-4 md:gap-8 py-9 md:py-10 cursor-default">

              {/* Number */}
              <div className="md:col-span-1 font-['Cormorant_Garamond'] text-[14px] text-[#9C8660]/55 group-hover:text-[#9C8660]/80 transition-colors duration-500 font-light pt-0.5 tabular-nums">
                {p.n}
              </div>

              {/* Title */}
              <div className="md:col-span-3">
                <h3 className="font-['Cormorant_Garamond'] text-[1.35rem] text-[#E8E4DC]/85 group-hover:text-[#E8E4DC] font-light transition-colors duration-500 leading-tight">
                  {p.title}
                </h3>
              </div>

              {/* Body */}
              <p className="md:col-span-6 text-[15px] text-[#E8E4DC]/70 leading-loose font-light group-hover:text-[#E8E4DC]/85 transition-colors duration-500">
                {p.body}
              </p>

              {/* Arrow — Apple-style indicator */}
              <div className="md:col-span-2 flex justify-end items-start pt-1">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="text-[#9C8660]/0 group-hover:text-[#9C8660]/60 transition-all duration-500 translate-x-0 group-hover:translate-x-1">
                  <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
