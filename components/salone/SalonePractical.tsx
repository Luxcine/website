'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const infos = [
  {
    title: 'Location',
    lines: ['Salone del Mobile.Milano 2026', 'Fiera Milano, Rho', 'Milan, Italy', 'Exact stand details in your confirmation.'],
  },
  {
    title: 'Format',
    lines: ['25-minute private session', 'Up to 12 guests per slot', 'By appointment only', 'No walk-ins'],
  },
  {
    title: 'Dates & Hours',
    lines: ['Monday 21 — Saturday 26 April', '10:00 to 18:00 daily', 'Sessions every 30 minutes', 'Last session at 17:30'],
  },
  {
    title: 'For Whom',
    lines: ['Architects & interior designers', 'Property developers', 'Private clients', 'Industry professionals'],
  },
]

export default function SalonePractical() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#111111]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="inline-block w-8 h-px bg-[#B8975A]" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
            Practical Information
          </span>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-px bg-[#F5F0E8]/5">
          {infos.map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 + 0.3 }}
              className="bg-[#111111] p-8"
            >
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#B8975A] mb-5">{info.title}</h4>
              <ul className="space-y-2">
                {info.lines.map((line) => (
                  <li key={line} className="text-[13px] text-[#F5F0E8]/45 font-light leading-relaxed">
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
