'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Understanding Your Vision',
    description:
      'We begin by listening. A private conversation to understand your space, your aspirations, your way of experiencing cinema. No brief is too ambitious. No detail too small.',
  },
  {
    number: '02',
    title: 'Concept',
    subtitle: 'Designing the Experience',
    description:
      'Our design team translates your vision into spatial concepts. Acoustic modelling. Visual simulations. Material palettes. Every element chosen with intention.',
  },
  {
    number: '03',
    title: 'Engineering',
    subtitle: 'Precision at Every Layer',
    description:
      'Architecture, acoustics and technology are engineered as one integrated system. No afterthoughts. No compromises. The room is designed from the inside out.',
  },
  {
    number: '04',
    title: 'Build',
    subtitle: 'Crafted to the Highest Standard',
    description:
      'Our specialist installation teams work alongside your contractors, bringing the design to life with the precision of a watchmaker. Every detail, every finish, every cable — considered.',
  },
  {
    number: '05',
    title: 'Calibration',
    subtitle: 'The Final Signature',
    description:
      'The final act. Our calibration engineers fine-tune every parameter — acoustic response, image geometry, colour science, surround processor — until the room performs beyond expectation.',
  },
]

export default function ExperienceJourney() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" ref={ref} className="py-32 md:py-48 bg-[#111111] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="mb-20 md:mb-28 grid md:grid-cols-2 gap-16 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="inline-block w-8 h-px bg-[#B8975A]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
                Our Process
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] leading-[1.1]"
            >
              From first vision
              <br />
              to <em className="italic text-[#B8975A]">first frame.</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[15px] font-light text-[#F5F0E8]/70 leading-relaxed"
          >
            Our process is that of an architectural atelier — methodical, considered,
            and guided by a single purpose: to deliver the exceptional.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-[#F5F0E8]/8 hidden md:block" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 + 0.4 }}
                className={`grid md:grid-cols-2 gap-0 ${i % 2 === 0 ? '' : 'md:direction-rtl'}`}
              >
                {/* Content block */}
                <div
                  className={`py-12 md:py-16 ${
                    i % 2 === 0
                      ? 'md:pr-20 md:text-right'
                      : 'md:pl-20 md:col-start-2'
                  }`}
                >
                  <div className="font-serif text-5xl text-[#B8975A]/15 font-light mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] font-light mb-1">
                    {step.title}
                  </h3>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#B8975A] mb-4">
                    {step.subtitle}
                  </div>
                  <p className="text-[15px] text-[#F5F0E8]/70 leading-relaxed font-light max-w-sm">
                    {step.description}
                  </p>
                </div>

                {/* Dot — visible md+ */}
                <div className={`hidden md:flex items-center ${i % 2 === 0 ? 'justify-start pl-0' : 'justify-end pr-0 col-start-1 row-start-1'}`}>
                  <div className="relative flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#B8975A]" />
                    <div className="absolute w-6 h-6 rounded-full border border-[#B8975A]/30" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 relative h-[400px] md:h-[500px] overflow-hidden"
        >
          <Image
            src="/assets/images/cinema-05.jpg"
            alt="Cinema calibration"
            fill
            quality={80}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/60 to-transparent" />
          <div className="absolute bottom-10 left-10 md:left-16">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8975A] mb-2">Every detail considered</div>
            <p className="font-serif text-2xl md:text-3xl text-[#F5F0E8] font-light italic max-w-md">
              "The room performs before anyone sits down."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
