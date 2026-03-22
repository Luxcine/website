'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export default function BrandStatement() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="brand" ref={ref} className="bg-[#080808]">
      {/* Top rule */}
      <div className="h-px bg-[#E8E4DC]/6" />

      <div className="max-w-[1520px] mx-auto px-8 md:px-14 py-36 md:py-52">
        <div className="grid md:grid-cols-12 gap-8 items-start">

          {/* Left col — image */}
          <motion.div {...fade(0)} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="md:col-span-5 relative aspect-[2/3] overflow-hidden">
            <Image src="/assets/images/cinema-lt23-02.jpg" alt="Private Cinema" fill quality={85}
              className="object-cover grayscale-[15%]" />
            {/* Architectural corner mark */}
            <div className="absolute top-0 left-0 w-8 h-px bg-[#9C8660]/50" />
            <div className="absolute top-0 left-0 w-px h-8 bg-[#9C8660]/50" />
          </motion.div>

          {/* Right col — offset lower for editorial feel */}
          <div className="md:col-span-6 md:col-start-7 md:pt-24 space-y-12">
            <motion.p {...fade(0.2)} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-[9px] tracking-[0.38em] uppercase text-[#9C8660]">
              Our Philosophy
            </motion.p>

            <motion.h2 {...fade(0.35)} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="font-['Cormorant_Garamond'] font-light text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[1.06] text-[#E8E4DC]">
              A cinema room is not a room.<br />
              <em className="text-[#9C8660]">It is an experience.</em>
            </motion.h2>

            <motion.div {...fade(0.5)} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="space-y-5 text-[13px] text-[#E8E4DC]/45 leading-loose font-light max-w-sm">
              <p>LuxuryCine was born from a simple conviction: the finest private cinemas are not installed — they are designed. Every space begins with architecture, not equipment.</p>
              <p>We work alongside architects and interior designers to conceive spaces where acoustic precision, visual perfection and architectural integrity exist as one seamless whole.</p>
              <p className="text-[#E8E4DC]/60 italic font-['Cormorant_Garamond'] text-base">The technology disappears. The experience remains.</p>
            </motion.div>

            {/* Stats — B&O precision */}
            <motion.div {...fade(0.65)} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="pt-10 border-t border-[#E8E4DC]/6 grid grid-cols-3 gap-0">
              {[['12+', 'Years'], ['60+', 'Spaces'], ['100%', 'Bespoke']].map(([n, l]) => (
                <div key={l} className="pr-6 border-r border-[#E8E4DC]/6 last:border-0 last:pl-6 first:pl-0 [&:not(:first-child)]:pl-6">
                  <div className="font-['Cormorant_Garamond'] text-4xl font-light text-[#9C8660] mb-1">{n}</div>
                  <div className="text-[9px] tracking-[0.28em] uppercase text-[#E8E4DC]/25">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
