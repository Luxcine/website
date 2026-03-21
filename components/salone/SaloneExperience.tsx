'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const moments = [
  {
    time: '0:00',
    title: 'Arrival',
    description: 'You are welcomed into a space designed from first principles — acoustic, architectural, immersive.',
  },
  {
    time: '0:05',
    title: 'Introduction',
    description: 'A brief presentation of the LuxuryCine approach: how design, engineering and cinema become one.',
  },
  {
    time: '0:10',
    title: 'The Screening',
    description: 'A curated cinematic sequence, designed to demonstrate the full range of what a private cinema can achieve.',
  },
  {
    time: '0:20',
    title: 'Conversation',
    description: 'An open conversation with our team — your project, your space, your ambitions.',
  },
]

export default function SaloneExperience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="py-32 md:py-48 bg-[#111111]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-24 items-center mb-24 md:mb-32">
          {/* Left text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="inline-block w-8 h-px bg-[#B8975A]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
                The Experience
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-4xl md:text-5xl font-light text-[#F5F0E8] leading-[1.1] mb-8"
            >
              Twenty-five minutes
              <br />
              that <em className="italic text-[#B8975A]">change perspective.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[14px] font-light text-[#F5F0E8]/50 leading-relaxed mb-10"
            >
              This is not a product demonstration. It is an immersive encounter
              with a level of cinematic performance that few have experienced in
              a private context. We have designed the space specifically to show
              what is possible — and to begin a conversation about what we can
              create together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-3 border border-[#F5F0E8]/10 px-6 py-4"
            >
              <div>
                <div className="text-[9px] tracking-[0.25em] uppercase text-[#B8975A] mb-1">Session Format</div>
                <div className="text-[13px] text-[#F5F0E8]/60 font-light">25 min · Max 12 guests · By appointment</div>
              </div>
            </motion.div>
          </div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src="/assets/images/cinema-08.jpg"
              alt="The Experience"
              fill
              quality={85}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent" />
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-4 gap-px bg-[#F5F0E8]/5">
          {moments.map((moment, i) => (
            <motion.div
              key={moment.time}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.5 }}
              className="bg-[#111111] p-8 hover:bg-[#1A1A1A] transition-colors duration-400 group"
            >
              <div className="font-serif text-2xl text-[#B8975A]/30 group-hover:text-[#B8975A]/50 transition-colors duration-400 mb-4 font-light">
                {moment.time}
              </div>
              <h3 className="font-serif text-lg text-[#F5F0E8] font-light mb-3">{moment.title}</h3>
              <p className="text-[12px] text-[#F5F0E8]/40 leading-relaxed font-light">{moment.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
