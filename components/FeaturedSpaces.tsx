'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const spaces = [
  {
    id: 'private-cinema',
    label: 'Private Cinema',
    title: 'The Screening Room',
    description:
      'A dedicated space conceived for pure cinematic immersion. Reference-class projection, enveloping sound, bespoke seating — every element calibrated to perfection.',
    image: '/assets/images/cinema-02.jpg',
    size: 'large',
  },
  {
    id: 'media-room',
    label: 'Media Room',
    title: 'The Media Lounge',
    description:
      'Where family life meets cinematic quality. Versatile spaces that transition seamlessly between daily living and immersive entertainment.',
    image: '/assets/images/space-sala.jpg',
    size: 'small',
  },
  {
    id: 'lounge',
    label: 'Cinema Lounge',
    title: 'The Private Lounge',
    description:
      'Intimate settings that merge the sophistication of a private members club with the precision of a professional screening room.',
    image: '/assets/images/cinema-03.jpg',
    size: 'small',
  },
  {
    id: 'signature',
    label: 'Signature Project',
    title: 'The Signature Space',
    description:
      'Our most ambitious commissions — spaces where architecture and cinema become one. Conceived from the foundations upward.',
    image: '/assets/images/space-palm.png',
    size: 'large',
  },
]

export default function FeaturedSpaces() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="spaces" ref={ref} className="py-32 md:py-48 bg-[#0D0D0D]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="inline-block w-8 h-px bg-[#B8975A]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
                Featured Spaces
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] leading-[1.1]"
            >
              Spaces that
              <br />
              <em className="italic text-[#B8975A]">stay with you.</em>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            href="#contact"
            className="text-[11px] tracking-[0.2em] uppercase text-[#B8975A] border-b border-[#B8975A]/40 pb-1 hover:border-[#B8975A] transition-colors duration-300 self-start md:self-auto"
          >
            View All Projects
          </motion.a>
        </div>

        {/* Grid — asymmetric editorial layout */}
        <div className="grid md:grid-cols-12 gap-4 md:gap-6">
          {/* Large left */}
          <SpaceCard space={spaces[0]} index={0} inView={inView} className="md:col-span-7 aspect-[4/3] md:aspect-auto md:h-[600px]" />

          {/* Right column stacked */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
            <SpaceCard space={spaces[1]} index={1} inView={inView} className="flex-1 min-h-[280px]" />
            <SpaceCard space={spaces[2]} index={2} inView={inView} className="flex-1 min-h-[280px]" />
          </div>

          {/* Full width bottom */}
          <SpaceCard space={spaces[3]} index={3} inView={inView} className="md:col-span-12 h-[400px] md:h-[500px]" />
        </div>
      </div>
    </section>
  )
}

function SpaceCard({
  space,
  index,
  inView,
  className,
}: {
  space: (typeof spaces)[0]
  index: number
  inView: boolean
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative overflow-hidden ${className}`}
    >
      <Image
        src={space.image}
        alt={space.title}
        fill
        quality={80}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-[#0D0D0D]/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        <div className="text-[9px] tracking-[0.3em] uppercase text-[#B8975A] mb-2">{space.label}</div>
        <h3 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] font-light mb-3">
          {space.title}
        </h3>
        <p className="text-[12px] text-[#F5F0E8]/50 leading-relaxed max-w-md transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {space.description}
        </p>
      </div>

      {/* Gold corner accent */}
      <div className="absolute top-6 right-6 w-6 h-px bg-[#B8975A]/60 group-hover:w-10 transition-all duration-500" />
      <div className="absolute top-6 right-6 w-px h-6 bg-[#B8975A]/60 group-hover:h-10 transition-all duration-500" />
    </motion.div>
  )
}
