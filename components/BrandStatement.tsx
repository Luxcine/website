'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function BrandStatement() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="brand" ref={ref} className="py-32 md:py-48 bg-[#0D0D0D]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-24 items-center">

          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <Image
              src="/assets/images/cinema-01.jpg"
              alt="Private Cinema Interior"
              fill
              quality={85}
              className="object-cover"
            />
            {/* Gold accent border */}
            <div className="absolute bottom-0 left-0 w-16 h-px bg-[#B8975A]" />
            <div className="absolute bottom-0 left-0 w-px h-16 bg-[#B8975A]" />
          </motion.div>

          {/* Right — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-10"
            >
              <span className="inline-block w-8 h-px bg-[#B8975A]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
                Our Philosophy
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-[#F5F0E8] mb-10"
            >
              A cinema room
              <br />
              is not a room.
              <br />
              <em className="italic text-[#B8975A]">It is an experience.</em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6 text-[15px] font-light text-[#F5F0E8]/60 leading-relaxed"
            >
              <p>
                LuxuryCine was born from a simple conviction: the finest private cinemas
                are not installed — they are designed. Every space we create begins with
                architecture, not equipment.
              </p>
              <p>
                We work alongside architects, interior designers and discerning clients
                to conceive spaces where acoustic precision, visual perfection and
                architectural integrity exist as one seamless whole.
              </p>
              <p>
                The technology disappears. The experience remains.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-14 pt-10 border-t border-[#F5F0E8]/10 grid grid-cols-3 gap-8"
            >
              {[
                { number: '12+', label: 'Years of Craft' },
                { number: '60+', label: 'Spaces Designed' },
                { number: '100%', label: 'Bespoke' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-3xl text-[#B8975A] font-light mb-1">{stat.number}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#F5F0E8]/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
