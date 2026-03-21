'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} className="py-32 md:py-48 bg-[#0D0D0D]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-24 items-start">

          {/* Left — info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="inline-block w-8 h-px bg-[#B8975A]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
                Begin a Project
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] leading-[1.1] mb-10"
            >
              Every exceptional
              <br />
              cinema begins with
              <br />
              <em className="italic text-[#B8975A]">a conversation.</em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-[14px] font-light text-[#F5F0E8]/50 leading-relaxed mb-16"
            >
              <p>
                Whether you are at the earliest stage of a new build, planning
                a renovation, or simply curious about what is possible — we would
                be delighted to speak with you.
              </p>
              <p>
                All enquiries are treated in complete confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="space-y-4 text-[13px]"
            >
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#B8975A] mb-1">Email</div>
                <a href="mailto:geral@luxurycine.com" className="text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition-colors">
                  geral@luxurycine.com
                </a>
              </div>
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#B8975A] mb-1">Phone</div>
                <a href="tel:+351289090900" className="text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition-colors">
                  (+351) 289 090 900
                </a>
              </div>
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#B8975A] mb-1">Studios</div>
                <p className="text-[#F5F0E8]/60">Quinta do Lago — Algarve, Portugal</p>
                <p className="text-[#F5F0E8]/60">Lisboa, Portugal</p>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full py-20">
                <div className="w-12 h-px bg-[#B8975A] mb-8" />
                <h3 className="font-serif text-3xl text-[#F5F0E8] font-light mb-4">
                  Thank you.
                </h3>
                <p className="text-[14px] text-[#F5F0E8]/50 leading-relaxed">
                  We will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Name" name="name" type="text" required placeholder="Your full name" />
                  <FormField label="Email" name="email" type="email" required placeholder="your@email.com" />
                </div>
                <FormField label="Phone" name="phone" type="tel" placeholder="+44 (0) 000 000 0000" />
                <FormField label="Project Location" name="location" type="text" placeholder="City, Country" />
                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/40 mb-3">
                    Tell us about your project
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="New build, renovation, project scale, timeline..."
                    className="w-full bg-transparent border border-[#F5F0E8]/10 text-[#F5F0E8] text-[13px] px-5 py-4 focus:outline-none focus:border-[#B8975A] transition-colors duration-300 placeholder:text-[#F5F0E8]/20 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#B8975A] text-[#0D0D0D] text-[11px] tracking-[0.2em] uppercase py-5 hover:bg-[#D4AF72] transition-colors duration-300 font-medium"
                >
                  Send Enquiry
                </button>
                <p className="text-[11px] text-[#F5F0E8]/25 text-center leading-relaxed">
                  All enquiries are treated in complete confidence and replied to within one business day.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string
  name: string
  type: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/40 mb-3">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-[#F5F0E8]/10 text-[#F5F0E8] text-[13px] py-3 focus:outline-none focus:border-[#B8975A] transition-colors duration-300 placeholder:text-[#F5F0E8]/20"
      />
    </div>
  )
}
