'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const differentiators = [
  {
    title: 'Design-First',
    body: 'We start with space and story. Technology follows the design — not the other way around. The result is rooms that feel inevitable, not assembled.',
  },
  {
    title: 'Architecture-Native',
    body: 'We engage at planning stage. Acoustic walls, hidden cable routes, structural speaker mounts — built in, not bolted on. No visible compromise.',
  },
  {
    title: 'Independent Specification',
    body: 'We have no dealer agreements that restrict our choices. We specify based on performance, fit and your budget — always in your interest.',
  },
  {
    title: 'Calibration to Reference',
    body: 'Our engineers are ISF, THX and Trinnov certified. We don\'t tune rooms by ear. We tune them by measurement, until they match the director\'s intent.',
  },
]

export default function WhyLuxCine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 md:py-48 bg-[#111111]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Full-width image with text overlay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative h-[50vh] md:h-[60vh] overflow-hidden mb-24 md:mb-32"
        >
          <Image
            src="/assets/images/cinema-06.jpg"
            alt="Why LuxuryCine"
            fill
            quality={80}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/30 via-transparent to-[#111111]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/50 to-transparent" />

          <div className="absolute bottom-12 left-8 md:left-16 max-w-lg">
            <div className="text-[9px] tracking-[0.3em] uppercase text-[#B8975A] mb-3">The LuxuryCine Difference</div>
            <p className="font-serif text-3xl md:text-4xl text-[#F5F0E8] font-light leading-[1.1] italic">
              "Not a cinema installer.
              <br />A cinema atelier."
            </p>
          </div>
        </motion.div>

        {/* Header */}
        <div className="mb-20 grid md:grid-cols-2 gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="inline-block w-8 h-px bg-[#B8975A]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
                Why LuxuryCine
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] leading-[1.1]"
            >
              What sets us
              <br />
              <em className="italic text-[#B8975A]">apart.</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[15px] font-light text-[#F5F0E8]/50 leading-relaxed self-end"
          >
            The private cinema industry is filled with capable integrators.
            LuxuryCine is something different — a design practice that happens
            to engineer extraordinary cinemas.
          </motion.p>
        </div>

        {/* Differentiators */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 + 0.5 }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-[#B8975A]/50 group-hover:w-12 group-hover:bg-[#B8975A] transition-all duration-500" />
                <h3 className="font-serif text-xl md:text-2xl text-[#F5F0E8] font-light">
                  {item.title}
                </h3>
              </div>
              <p className="text-[14px] text-[#F5F0E8]/50 leading-relaxed font-light pl-12">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
