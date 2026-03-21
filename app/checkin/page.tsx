'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface Booking {
  ref: string
  date: string
  slot: string
  guests: number
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  location?: string
  checkedIn?: boolean
  checkedInAt?: string
}

const DAY_LABELS: Record<string, string> = {
  '2026-04-21': 'Tue 21 Apr',
  '2026-04-22': 'Wed 22 Apr',
  '2026-04-23': 'Thu 23 Apr',
  '2026-04-24': 'Fri 24 Apr',
  '2026-04-25': 'Sat 25 Apr',
  '2026-04-26': 'Sun 26 Apr',
}

type Status = 'idle' | 'scanning' | 'found' | 'already' | 'checked' | 'notfound' | 'error'

export default function CheckIn() {
  const [token, setToken] = useState('')
  const [authed, setAuthed] = useState(false)
  const [manualRef, setManualRef] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [booking, setBooking] = useState<Booking | null>(null)
  const [scanning, setScanning] = useState(false)
  const [cameraError, setCameraError] = useState('')

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animRef = useRef<number>(0)
  const tokenRef = useRef(token)
  tokenRef.current = token

  // ── QR scan loop ─────────────────────────────────────────────────────────
  const scanLoop = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || video.readyState !== 4) {
      animRef.current = requestAnimationFrame(scanLoop)
      return
    }
    const ctx = canvas.getContext('2d')!
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    import('jsqr').then(({ default: jsQR }) => {
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      if (code?.data) {
        const ref = code.data.replace(/.*\/(LXC-[A-Z0-9]+).*/, '$1').trim()
        if (ref.startsWith('LXC-')) {
          stopCamera()
          lookupRef(ref)
          return
        }
      }
      animRef.current = requestAnimationFrame(scanLoop)
    })
  }, []) // eslint-disable-line

  const startCamera = async () => {
    setCameraError('')
    setScanning(true)
    setStatus('scanning')
    setBooking(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        animRef.current = requestAnimationFrame(scanLoop)
      }
    } catch {
      setCameraError('Camera not accessible. Use manual entry.')
      setScanning(false)
      setStatus('idle')
    }
  }

  const stopCamera = () => {
    cancelAnimationFrame(animRef.current)
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    setScanning(false)
  }

  useEffect(() => () => { stopCamera() }, [])

  // ── Lookup ────────────────────────────────────────────────────────────────
  const lookupRef = useCallback(async (ref: string) => {
    setStatus('idle')
    setBooking(null)
    const clean = ref.toUpperCase().trim()
    try {
      const res = await fetch(`/api/checkin?ref=${clean}`, {
        headers: { 'x-admin-token': tokenRef.current }
      })
      if (res.status === 404) { setStatus('notfound'); return }
      if (!res.ok) { setStatus('error'); return }
      const data = await res.json()
      setBooking(data)
      setStatus(data.checkedIn ? 'already' : 'found')
    } catch {
      setStatus('error')
    }
  }, [])

  const handleManual = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualRef.trim()) lookupRef(manualRef)
  }

  const handleCheckIn = async () => {
    if (!booking) return
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ ref: booking.ref })
      })
      const data = await res.json()
      if (data.alreadyCheckedIn) { setStatus('already'); return }
      if (data.success) {
        setBooking(data.booking)
        setStatus('checked')
        // Auto-reset after 4s for next guest
        setTimeout(() => { setStatus('idle'); setBooking(null); setManualRef('') }, 4000)
      }
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setBooking(null)
    setManualRef('')
    stopCamera()
  }

  // ── Login ─────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-8">
        <div className="w-full max-w-xs">
          <div className="mb-10 text-center">
            <div className="font-['Cormorant_Garamond'] text-[1.1rem] tracking-[0.18em] uppercase text-[#E8E4DC]/80 mb-1">
              LuxuryCine
            </div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#9C8660]">
              Guest Check-In · Salone 2026
            </p>
          </div>
          <form onSubmit={e => { e.preventDefault(); setAuthed(true) }} className="space-y-4">
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="Access token"
              autoFocus
              className="w-full bg-transparent border border-[#E8E4DC]/10 focus:border-[#9C8660]/40 px-4 py-3 text-[13px] text-[#E8E4DC]/70 outline-none text-center tracking-widest"
            />
            <button type="submit"
              className="w-full border border-[#9C8660]/30 hover:border-[#9C8660]/60 py-3 text-[10px] tracking-[0.28em] uppercase text-[#9C8660] transition-colors duration-300">
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Main ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      {/* Header */}
      <div className="border-b border-[#E8E4DC]/6 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-['Cormorant_Garamond'] text-[0.95rem] tracking-[0.15em] uppercase text-[#E8E4DC]/60 mr-3">
            LuxuryCine
          </span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#9C8660]">Check-In</span>
        </div>
        <button onClick={reset} className="text-[9px] tracking-[0.2em] uppercase text-[#E8E4DC]/20 hover:text-[#E8E4DC]/50 transition-colors duration-300">
          Reset
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-lg mx-auto w-full">

        {/* ── SCANNING STATE ── */}
        {scanning && (
          <div className="w-full space-y-4">
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#9C8660] text-center mb-4">
              Point at guest QR code
            </p>
            <div className="relative w-full aspect-square max-w-sm mx-auto border border-[#E8E4DC]/10 overflow-hidden bg-black">
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
              <canvas ref={canvasRef} className="hidden" />
              {/* Viewfinder corners */}
              {[['top-4 left-4','border-t border-l'],['top-4 right-4','border-t border-r'],
                ['bottom-4 left-4','border-b border-l'],['bottom-4 right-4','border-b border-r']
              ].map(([pos, border]) => (
                <div key={pos} className={`absolute w-8 h-8 ${pos} ${border} border-[#9C8660]/70`} />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border border-[#9C8660]/20" />
              </div>
            </div>
            <button onClick={() => { stopCamera(); setStatus('idle') }}
              className="w-full border border-[#E8E4DC]/10 py-3 text-[10px] tracking-[0.2em] uppercase text-[#E8E4DC]/30 hover:text-[#E8E4DC]/60 transition-colors duration-300">
              Cancel
            </button>
          </div>
        )}

        {/* ── IDLE — actions ── */}
        {!scanning && status === 'idle' && (
          <div className="w-full space-y-6">
            {/* Scan button */}
            <button onClick={startCamera}
              className="w-full border border-[#9C8660]/30 hover:border-[#9C8660]/60 py-8 flex flex-col items-center gap-3 transition-colors duration-400 group">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                className="text-[#9C8660]/50 group-hover:text-[#9C8660]/80 transition-colors duration-400">
                <rect x="2" y="2" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="20" y="2" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="2" y="20" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="5" y="5" width="4" height="4" fill="currentColor" opacity=".5"/>
                <rect x="23" y="5" width="4" height="4" fill="currentColor" opacity=".5"/>
                <rect x="5" y="23" width="4" height="4" fill="currentColor" opacity=".5"/>
                <path d="M20 20h3v3M26 20h3v3M20 26h3v3M26 26h3v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#9C8660]/60 group-hover:text-[#9C8660]">
                Scan QR Code
              </span>
            </button>

            {cameraError && (
              <p className="text-[11px] text-amber-400/60 text-center">{cameraError}</p>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[#E8E4DC]/6" />
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#E8E4DC]/15">or</span>
              <div className="flex-1 h-px bg-[#E8E4DC]/6" />
            </div>

            {/* Manual entry */}
            <form onSubmit={handleManual} className="space-y-3">
              <input
                type="text"
                value={manualRef}
                onChange={e => setManualRef(e.target.value.toUpperCase())}
                placeholder="LXC-XXXXXX or guest name"
                className="w-full bg-transparent border border-[#E8E4DC]/10 focus:border-[#9C8660]/30 px-4 py-4 text-[14px] text-[#E8E4DC]/70 outline-none text-center tracking-[0.15em] uppercase transition-colors duration-300"
              />
              <button type="submit"
                className="w-full border border-[#E8E4DC]/10 hover:border-[#E8E4DC]/30 py-3 text-[10px] tracking-[0.25em] uppercase text-[#E8E4DC]/30 hover:text-[#E8E4DC]/60 transition-colors duration-300">
                Search
              </button>
            </form>
          </div>
        )}

        {/* ── BOOKING FOUND ── */}
        {(status === 'found' || status === 'already') && booking && (
          <div className="w-full space-y-6">
            {/* Guest card */}
            <div className={`border p-7 ${status === 'already' ? 'border-amber-500/30' : 'border-[#9C8660]/30'}`}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[#9C8660]/60 mb-1.5">{booking.ref}</p>
                  <h2 className="font-['Cormorant_Garamond'] text-2xl text-[#E8E4DC]/90 font-light">{booking.name}</h2>
                  {booking.company && (
                    <p className="text-[12px] text-[#E8E4DC]/35 mt-0.5">{booking.company}</p>
                  )}
                </div>
                {status === 'already' && (
                  <div className="text-[9px] tracking-[0.2em] uppercase text-amber-400/70 border border-amber-400/20 px-3 py-1.5">
                    Already checked in
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 divide-x divide-[#E8E4DC]/6 border-t border-[#E8E4DC]/6 pt-5">
                <div className="pr-4">
                  <div className="text-[8px] tracking-[0.2em] uppercase text-[#E8E4DC]/20 mb-1">Date</div>
                  <div className="text-[12px] text-[#E8E4DC]/60">{DAY_LABELS[booking.date] ?? booking.date}</div>
                </div>
                <div className="px-4">
                  <div className="text-[8px] tracking-[0.2em] uppercase text-[#E8E4DC]/20 mb-1">Time</div>
                  <div className="text-[12px] text-[#E8E4DC]/60">{booking.slot}</div>
                </div>
                <div className="pl-4">
                  <div className="text-[8px] tracking-[0.2em] uppercase text-[#E8E4DC]/20 mb-1">Guests</div>
                  <div className="text-[12px] text-[#E8E4DC]/60">{booking.guests}</div>
                </div>
              </div>

              {booking.checkedInAt && (
                <p className="mt-4 text-[10px] text-amber-400/40">
                  Checked in at {new Date(booking.checkedInAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>

            {status === 'found' && (
              <button onClick={handleCheckIn}
                className="w-full bg-[#9C8660]/15 hover:bg-[#9C8660]/25 border border-[#9C8660]/40 hover:border-[#9C8660]/70 py-5 text-[11px] tracking-[0.3em] uppercase text-[#9C8660] transition-all duration-400">
                ✓ Check In Guest
              </button>
            )}

            <button onClick={reset}
              className="w-full border border-[#E8E4DC]/8 py-3 text-[10px] tracking-[0.2em] uppercase text-[#E8E4DC]/20 hover:text-[#E8E4DC]/50 transition-colors duration-300">
              Next Guest
            </button>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {status === 'checked' && booking && (
          <div className="w-full text-center space-y-6">
            <div className="border border-[#9C8660]/40 p-10">
              <div className="font-['Cormorant_Garamond'] text-5xl text-[#9C8660]/80 mb-4">✓</div>
              <div className="font-['Cormorant_Garamond'] text-2xl text-[#E8E4DC]/80 font-light mb-1">
                {booking.name}
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#E8E4DC]/25">
                Checked in · {booking.guests} guest{booking.guests > 1 ? 's' : ''} · {booking.slot}
              </p>
            </div>
            <p className="text-[10px] text-[#E8E4DC]/15">Resetting in a few seconds…</p>
          </div>
        )}

        {/* ── NOT FOUND ── */}
        {status === 'notfound' && (
          <div className="w-full text-center space-y-6">
            <div className="border border-red-400/20 p-10">
              <div className="font-['Cormorant_Garamond'] text-4xl text-red-400/50 mb-4">—</div>
              <p className="text-[13px] text-[#E8E4DC]/40">Booking not found</p>
              <p className="text-[11px] text-[#E8E4DC]/20 mt-1">Check the reference and try again</p>
            </div>
            <button onClick={reset}
              className="w-full border border-[#E8E4DC]/10 py-3 text-[10px] tracking-[0.2em] uppercase text-[#E8E4DC]/30 hover:text-[#E8E4DC]/60 transition-colors duration-300">
              Try Again
            </button>
          </div>
        )}

        {/* ── ERROR ── */}
        {status === 'error' && (
          <div className="w-full text-center space-y-4">
            <p className="text-[12px] text-red-400/60">Connection error. Check network.</p>
            <button onClick={reset}
              className="w-full border border-[#E8E4DC]/10 py-3 text-[10px] tracking-[0.2em] uppercase text-[#E8E4DC]/30">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
