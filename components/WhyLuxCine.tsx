'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const items = [
  { title: 'Design-First', body: 'We start with space and story. Technology follows the design — not the other way around. The result is rooms that feel inevitable, not assembled.' },
  { title: 'Architecture-Native', body: 'We engage at planning stage. Acoustic walls, concealed cable routes, structural speaker mounts — built in, not bolted on. No compromise.' },
  { title: 'Independent Specification', body: 'No dealer agreements that restrict our choices. We specify based on performance, fit and your budget — always in your interest.' },
  { title: 'Calibration to Reference', body: 'ISF, THX and Trinnov certified engineers. We tune rooms by measurement until they match the director\'s intent — not by ear.' },
]

export default function WhyLuxCine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-[#080808]">
      <div className="h-px bg-[#E8E4DC]/6" />

      {/* Full-bleed cinematic image — B&O style */}
      <div className="relative h-[55vw] md:h-[70vh] max-h-[680px] overflow-hidden">
        <Image src="/assets/images/cinema-qdl-03.jpg" alt="The LuxuryCine Difference" fill quality={85}
          className="object-cover grayscale-[8%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-[#080808]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]" />

        {/* Quote — architectural positioning */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="absolute bottom-12 md:bottom-16 left-8 md:left-14 max-w-lg">
          <p className="font-['Cormorant_Garamond'] text-[clamp(1.5rem,3vw,2.4rem)] text-[#E8E4DC]/90 font-light italic leading-[1.15]">
            "Not a cinema installer.<br />A cinema atelier."
          </p>
          <div className="w-8 h-px bg-[#9C8660]/50 mt-5" />
        </motion.div>
      </div>

      <div className="max-w-[1520px] mx-auto px-8 md:px-14 py-36 md:py-52">
        <div className="grid md:grid-cols-12 gap-8 mb-24">
          <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 font-['Cormorant_Garamond'] font-light text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[1.06] text-[#E8E4DC]">
            What sets us<br /><em className="text-[#9C8660]">apart.</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-5 md:col-start-8 text-[15px] text-[#E8E4DC]/75 leading-loose font-light self-end">
            The private cinema industry is filled with capable integrators. LuxuryCine is something different — a design practice that happens to engineer extraordinary cinemas.
          </motion.p>
        </div>

        {/* 2×2 grid — editorial */}
        <div className="grid md:grid-cols-2 divide-y divide-[#E8E4DC]/6 md:divide-y-0">
          {items.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: i * 0.1 + 0.4 }}
              className={`group py-12 md:py-14 ${i % 2 === 0 ? 'md:pr-16 md:border-r border-[#E8E4DC]/6' : 'md:pl-16'}`}>
              <h3 className="font-['Cormorant_Garamond'] text-[1.4rem] text-[#E8E4DC]/80 group-hover:text-[#E8E4DC] font-light mb-4 transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-[15px] text-[#E8E4DC]/70 leading-loose font-light">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
