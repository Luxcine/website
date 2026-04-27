'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'

// ─── Configuration ────────────────────────────────────────────────────────────
const EVENT_DAYS = [
  { date: '2026-04-21', label: 'Tue 21 Apr' },
  { date: '2026-04-22', label: 'Wed 22 Apr' },
  { date: '2026-04-23', label: 'Thu 23 Apr' },
  { date: '2026-04-24', label: 'Fri 24 Apr' },
  { date: '2026-04-25', label: 'Sat 25 Apr' },
  { date: '2026-04-26', label: 'Sun 26 Apr' },
]

// Slots every 40 min starting 09:50
function generateSlots(): string[] {
  const slots: string[] = []
  let minutes = 9 * 60 + 50 // 09:50
  const end = 18 * 60 + 30  // stop before 18:30
  while (minutes < end) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    if (!(h === 13 && m === 50)) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
    minutes += 40
  }
  return slots
}
const ALL_SLOTS = generateSlots()

const CAPACITY = 12

// ─── Step types ───────────────────────────────────────────────────────────────
type Step = 'date' | 'time' | 'guests' | 'details' | 'confirm'

interface BookingData {
  date: string
  slot: string
  guests: number
  name: string
  email: string
  phone: string
  company: string
  role: string
  location: string
  stage: string
  message: string
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SaloneBooking() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="booking" ref={ref} className="py-32 md:py-48 bg-[#0D0D0D]">
      <div className="max-w-[1000px] mx-auto px-8 md:px-16">

        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="inline-block w-8 h-px bg-[#B8975A]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#B8975A]">
              Salone del Mobile.Milano 2026
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-4xl md:text-5xl font-light text-[#F5F0E8] leading-[1.1]"
          >
            Thank you for
            <br />
            <em className="italic text-[#B8975A]">an extraordinary edition.</em>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-[15px] font-light text-[#F5F0E8]/50 leading-relaxed max-w-xl mb-10">
            The Salone del Mobile.Milano 2026 edition has concluded. We were honoured to welcome
            our guests to an exclusive cinema experience in the heart of Milan.
          </p>
          <p className="text-[13px] text-[#F5F0E8]/30 leading-relaxed max-w-lg">
            Stay tuned for upcoming events and experiences. For enquiries, please{' '}
            <a href="mailto:geral@luxurycine.com" className="text-[#B8975A] hover:text-[#D4AF72] transition-colors duration-300">
              contact us
            </a>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Animation wrapper ────────────────────────────────────────────────────────
function StepPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Step: Date ───────────────────────────────────────────────────────────────
function StepDate({ selected, onSelect }: { selected?: string; onSelect: (d: string) => void }) {
  return (
    <div>
      <h3 className="font-serif text-2xl text-[#F5F0E8] font-light mb-2">Choose a date</h3>
      <p className="text-[12px] text-[#F5F0E8]/40 mb-10">Salone del Mobile.Milano 2026 — April 21–26</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {EVENT_DAYS.map((day) => (
          <button
            key={day.date}
            onClick={() => onSelect(day.date)}
            className={`group px-6 py-5 border text-left transition-all duration-300 ${
              selected === day.date
                ? 'border-[#B8975A] bg-[#B8975A]/10'
                : 'border-[#F5F0E8]/10 hover:border-[#B8975A]/50 hover:bg-[#1A1A1A]'
            }`}
          >
            <div className={`text-[9px] tracking-[0.2em] uppercase mb-1 ${selected === day.date ? 'text-[#B8975A]' : 'text-[#F5F0E8]/30 group-hover:text-[#B8975A]/60'}`}>
              {day.label.split(' ')[0]}
            </div>
            <div className={`font-serif text-2xl font-light ${selected === day.date ? 'text-[#B8975A]' : 'text-[#F5F0E8]/70'}`}>
              {day.label.split(' ')[1]}
            </div>
            <div className={`text-[11px] font-light ${selected === day.date ? 'text-[#F5F0E8]/60' : 'text-[#F5F0E8]/30'}`}>
              {day.label.split(' ')[2]}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Step: Time ───────────────────────────────────────────────────────────────
function StepTime({
  date,
  selected,
  onSelect,
  onBack,
}: {
  date: string
  selected?: string
  onSelect: (s: string) => void
  onBack: () => void
}) {
  const dayLabel = EVENT_DAYS.find((d) => d.date === date)?.label ?? date
  const [slots, setSlots] = useState<{ slot: string; available: boolean }[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAvailability = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/salone/book?date=${date}`)
      if (res.ok) {
        const data = await res.json()
        setSlots(data.slots)
      } else {
        setSlots(ALL_SLOTS.map((s) => ({ slot: s, available: true })))
      }
    } catch {
      setSlots(ALL_SLOTS.map((s) => ({ slot: s, available: true })))
    } finally {
      setLoading(false)
    }
  }, [date])

  useEffect(() => { fetchAvailability() }, [fetchAvailability])

  return (
    <div>
      <BackButton onClick={onBack} />
      <h3 className="font-serif text-2xl text-[#F5F0E8] font-light mb-2">Choose a time</h3>
      <p className="text-[12px] text-[#F5F0E8]/40 mb-10">{dayLabel} — sessions every 20 minutes</p>
      {loading ? (
        <div className="text-center py-12">
          <p className="text-[12px] text-[#F5F0E8]/30 tracking-[0.15em] uppercase animate-pulse">Loading availability…</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {slots.map(({ slot, available }) => (
            <button
              key={slot}
              onClick={() => available && onSelect(slot)}
              disabled={!available}
              className={`py-3.5 text-[12px] tracking-[0.1em] border transition-all duration-300 ${
                !available
                  ? 'border-[#F5F0E8]/5 text-[#F5F0E8]/15 cursor-not-allowed line-through'
                  : selected === slot
                  ? 'border-[#B8975A] bg-[#B8975A]/10 text-[#B8975A]'
                  : 'border-[#F5F0E8]/10 text-[#F5F0E8]/60 hover:border-[#B8975A]/50 hover:text-[#F5F0E8]'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      )}
      <p className="mt-6 text-[11px] text-[#F5F0E8]/20">Slots marked as unavailable are fully booked.</p>
    </div>
  )
}

// ─── Step: Guests ─────────────────────────────────────────────────────────────
function StepGuests({
  selected,
  onSelect,
  onBack,
}: {
  selected?: number
  onSelect: (n: number) => void
  onBack: () => void
}) {
  const [value, setValue] = useState(selected ?? 1)

  return (
    <div>
      <BackButton onClick={onBack} />
      <h3 className="font-serif text-2xl text-[#F5F0E8] font-light mb-2">Group size</h3>
      <p className="text-[12px] text-[#F5F0E8]/40 mb-12">Select the number of guests attending this session</p>

      <div className="flex items-center gap-8 mb-14">
        <button
          onClick={() => setValue((v) => Math.max(1, v - 1))}
          className="w-12 h-12 border border-[#F5F0E8]/15 text-[#F5F0E8]/60 hover:border-[#B8975A] hover:text-[#B8975A] transition-all duration-300 text-xl font-light"
        >
          −
        </button>
        <div className="text-center min-w-[80px]">
          <div className="font-serif text-6xl text-[#F5F0E8] font-light">{value}</div>
          <div className="text-[9px] tracking-[0.2em] uppercase text-[#F5F0E8]/30 mt-1">
            {value === 1 ? 'Guest' : 'Guests'}
          </div>
        </div>
        <button
          onClick={() => setValue((v) => Math.min(CAPACITY, v + 1))}
          className="w-12 h-12 border border-[#F5F0E8]/15 text-[#F5F0E8]/60 hover:border-[#B8975A] hover:text-[#B8975A] transition-all duration-300 text-xl font-light"
        >
          +
        </button>
      </div>

      {value > 6 && (
        <p className="text-[11px] text-[#B8975A]/60 mb-10">
          For groups of 7 or more, we may contact you to confirm availability.
        </p>
      )}

      <PrimaryButton onClick={() => onSelect(value)}>
        Continue
      </PrimaryButton>
    </div>
  )
}

// ─── Step: Details ────────────────────────────────────────────────────────────
function StepDetails({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: Partial<BookingData>
  onChange: (d: Partial<BookingData>) => void
  onNext: () => void
  onBack: () => void
}) {
  const stageOptions = [
    'New build — planning stage',
    'New build — under construction',
    'Renovation project',
    'Completed property',
    'Exploring possibilities',
    'Other',
  ]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <div>
      <BackButton onClick={onBack} />
      <h3 className="font-serif text-2xl text-[#F5F0E8] font-light mb-2">Your details</h3>
      <p className="text-[12px] text-[#F5F0E8]/40 mb-10">All information is treated in complete confidence.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput label="Full Name" value={data.name ?? ''} onChange={(v) => onChange({ name: v })} required placeholder="Your full name" />
          <FormInput label="Email Address" type="email" value={data.email ?? ''} onChange={(v) => onChange({ email: v })} required placeholder="your@email.com" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput label="Phone" type="tel" value={data.phone ?? ''} onChange={(v) => onChange({ phone: v })} placeholder="+39 (0) 000 000 0000" />
          <FormInput label="Company / Studio" value={data.company ?? ''} onChange={(v) => onChange({ company: v })} placeholder="Your company name" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/35 mb-3">Your Role</label>
            <select
              value={data.role ?? ''}
              onChange={(e) => onChange({ role: e.target.value })}
              required
              className="w-full bg-transparent border-b border-[#F5F0E8]/10 text-[#F5F0E8]/60 text-[13px] py-3 focus:outline-none focus:border-[#B8975A] transition-colors duration-300 appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-[#1A1A1A]">Select your role</option>
              {[
                'Architect',
                'Interior Designer',
                'Property Developer',
                'Private Client',
                'Contractor',
                'Consultant',
                'Other',
              ].map((o) => (
                <option key={o} value={o} className="bg-[#1A1A1A] text-[#F5F0E8]">{o}</option>
              ))}
            </select>
          </div>
          <FormInput label="Project Location" value={data.location ?? ''} onChange={(v) => onChange({ location: v })} placeholder="City, Country" />
        </div>
        <div>
          <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/35 mb-3">
            Project Stage
          </label>
          <select
            value={data.stage ?? ''}
            onChange={(e) => onChange({ stage: e.target.value })}
            className="w-full bg-transparent border-b border-[#F5F0E8]/10 text-[#F5F0E8]/60 text-[13px] py-3 focus:outline-none focus:border-[#B8975A] transition-colors duration-300 appearance-none cursor-pointer"
          >
            <option value="" disabled className="bg-[#1A1A1A]">Select stage</option>
            {stageOptions.map((o) => (
              <option key={o} value={o} className="bg-[#1A1A1A] text-[#F5F0E8]">{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/35 mb-3">
            Tell us about your project <span className="text-[#F5F0E8]/20">(optional)</span>
          </label>
          <textarea
            value={data.message ?? ''}
            onChange={(e) => onChange({ message: e.target.value })}
            rows={4}
            placeholder="Space dimensions, project timeline, specific requirements..."
            className="w-full bg-transparent border border-[#F5F0E8]/8 text-[#F5F0E8] text-[13px] px-5 py-4 focus:outline-none focus:border-[#B8975A]/50 transition-colors duration-300 placeholder:text-[#F5F0E8]/15 resize-none"
          />
        </div>
        <PrimaryButton type="submit">Review Booking</PrimaryButton>
      </form>
    </div>
  )
}

// ─── Step: Confirm ────────────────────────────────────────────────────────────
function StepConfirm({
  booking,
  onConfirm,
  onBack,
  submitting,
  error,
}: {
  booking: BookingData
  onConfirm: () => void
  onBack: () => void
  submitting?: boolean
  error?: string
}) {
  const dayLabel = EVENT_DAYS.find((d) => d.date === booking.date)?.label ?? booking.date

  return (
    <div>
      <BackButton onClick={onBack} />
      <h3 className="font-serif text-2xl text-[#F5F0E8] font-light mb-2">Review your booking</h3>
      <p className="text-[12px] text-[#F5F0E8]/40 mb-10">Please confirm your appointment details below.</p>

      <div className="border border-[#B8975A]/20 p-8 md:p-10 mb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <SummaryField label="Date" value={dayLabel} />
          <SummaryField label="Time" value={booking.slot} />
          <SummaryField label="Guests" value={`${booking.guests} ${booking.guests === 1 ? 'person' : 'people'}`} />
          <SummaryField label="Duration" value="25 minutes" />
        </div>
        <div className="my-6 border-t border-[#F5F0E8]/8" />
        <div className="grid md:grid-cols-2 gap-6">
          <SummaryField label="Name" value={booking.name} />
          <SummaryField label="Email" value={booking.email} />
          {booking.company && <SummaryField label="Company" value={booking.company} />}
          {booking.location && <SummaryField label="Location" value={booking.location} />}
        </div>
      </div>

      <p className="text-[12px] text-[#F5F0E8]/35 leading-relaxed mb-10">
        A confirmation email will be sent to <span className="text-[#F5F0E8]/60">{booking.email}</span>.
        We will also send a reminder 24 hours before your session.
      </p>

      {error && (
        <p className="text-[12px] text-red-400/70 mb-6 border border-red-400/20 px-4 py-3">{error}</p>
      )}

      <PrimaryButton onClick={onConfirm} disabled={submitting}>
        {submitting ? 'Confirming…' : 'Confirm Appointment'}
      </PrimaryButton>
    </div>
  )
}

// ─── Confirmation Message ─────────────────────────────────────────────────────
function ConfirmationMessage({ booking, bookingRef }: { booking: BookingData; bookingRef: string }) {
  const dayLabel = EVENT_DAYS.find((d) => d.date === booking.date)?.label ?? booking.date
  const qrData = `https://www.luxurycine.com/checkin?ref=${bookingRef}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(qrData)}&color=9C8660&bgcolor=0D0D0D&margin=14&qzone=1`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12"
    >
      <div className="grid md:grid-cols-12 gap-10 items-start">
        {/* Left — confirmation text */}
        <div className="md:col-span-7">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-[#B8975A] mb-8">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L6.5 11.5L13 5" stroke="#B8975A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="font-serif text-3xl md:text-4xl text-[#F5F0E8] font-light mb-4 leading-tight">
            Your session<br />is reserved.
          </div>
          <p className="text-[13px] text-[#F5F0E8]/45 font-light mb-8 leading-relaxed max-w-sm">
            We look forward to welcoming you on <span className="text-[#F5F0E8]/70">{dayLabel}</span> at{' '}
            <span className="text-[#F5F0E8]/70">{booking.slot}</span>.
            A confirmation will be sent to <span className="text-[#F5F0E8]/70">{booking.email}</span>.
          </p>

          <div className="border border-[#F5F0E8]/8 px-6 py-5 space-y-1 inline-block">
            <div className="text-[8px] tracking-[0.3em] uppercase text-[#B8975A]">Booking Reference</div>
            <div className="font-mono text-lg text-[#F5F0E8]/80 tracking-[0.15em]">{bookingRef}</div>
          </div>

          <p className="mt-6 text-[11px] text-[#F5F0E8]/25 leading-relaxed max-w-xs">
            Present this QR code or your reference at the entrance on the day.
          </p>
        </div>

        {/* Right — QR code */}
        <div className="md:col-span-4 md:col-start-9 flex flex-col items-center md:items-start gap-4">
          <div className="text-[8px] tracking-[0.25em] uppercase text-[#F5F0E8]/20 mb-1">Your Entry Pass</div>
          <div className="relative border border-[#B8975A]/20 p-3 bg-[#0D0D0D]">
            {/* Corner marks */}
            <div className="absolute top-0 left-0 w-4 h-px bg-[#B8975A]/50" />
            <div className="absolute top-0 left-0 w-px h-4 bg-[#B8975A]/50" />
            <div className="absolute top-0 right-0 w-4 h-px bg-[#B8975A]/50" />
            <div className="absolute top-0 right-0 w-px h-4 bg-[#B8975A]/50" />
            <div className="absolute bottom-0 left-0 w-4 h-px bg-[#B8975A]/50" />
            <div className="absolute bottom-0 left-0 w-px h-4 bg-[#B8975A]/50" />
            <div className="absolute bottom-0 right-0 w-4 h-px bg-[#B8975A]/50" />
            <div className="absolute bottom-0 right-0 w-px h-4 bg-[#B8975A]/50" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt="Entry QR code" width={280} height={280} />
          </div>
          {/* Wallet buttons */}
          <div className="flex flex-col gap-2 w-full mt-2">
            <a
              href={`/api/wallet/apple?ref=${bookingRef}`}
              className="flex items-center justify-center gap-2.5 bg-black border border-white/15 hover:border-white/35 px-5 py-3 text-white text-[11px] tracking-[0.12em] transition-colors duration-300"
            >
              {/* Apple logo */}
              <svg width="14" height="17" viewBox="0 0 14 17" fill="currentColor" className="opacity-90 shrink-0">
                <path d="M11.56 9.01c.02-1.96 1.6-2.91 1.67-2.96-0.91-1.33-2.33-1.51-2.83-1.53-1.2-.12-2.35.71-2.96.71-.61 0-1.55-.69-2.55-.67-1.31.02-2.52.77-3.2 1.95-1.37 2.37-.35 5.89 0.98 7.82.65.94 1.43 2 2.45 1.96.98-.04 1.35-.63 2.54-.63 1.19 0 1.52.63 2.56.61 1.06-.02 1.72-.96 2.37-1.9.75-1.08 1.05-2.13 1.07-2.19-.02-.01-2.05-.79-2.1-3.17zM9.57 3.07C10.1 2.44 10.46 1.56 10.36.65c-.77.04-1.71.52-2.26 1.14-.5.56-.93 1.46-.81 2.32.85.07 1.73-.43 2.28-1.04z"/>
              </svg>
              Add to Apple Wallet
            </a>
            <a
              href={`/api/wallet/google?ref=${bookingRef}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#1a73e8] hover:bg-[#1558c9] px-5 py-3 text-white text-[11px] tracking-[0.12em] transition-colors duration-300"
            >
              {/* Google Wallet icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" fill="white" opacity=".9"/>
                <path d="M12 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill="white"/>
              </svg>
              Add to Google Wallet
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#F5F0E8]/30 hover:text-[#F5F0E8]/60 transition-colors duration-300 mb-8"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Back
    </button>
  )
}

function PrimaryButton({
  children,
  onClick,
  type = 'button',
  disabled,
}: {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-3 bg-[#B8975A] text-[#0D0D0D] text-[11px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#D4AF72] transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
      {!disabled && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  )
}

function FormInput({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-[9px] tracking-[0.25em] uppercase text-[#F5F0E8]/35 mb-3">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-[#F5F0E8]/10 text-[#F5F0E8] text-[13px] py-3 focus:outline-none focus:border-[#B8975A] transition-colors duration-300 placeholder:text-[#F5F0E8]/15"
      />
    </div>
  )
}

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] tracking-[0.25em] uppercase text-[#B8975A] mb-1">{label}</div>
      <div className="text-[13px] text-[#F5F0E8]/70 font-light">{value}</div>
    </div>
  )
}
