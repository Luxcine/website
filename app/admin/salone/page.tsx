'use client'

import { useState, useEffect, useCallback } from 'react'

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
  stage?: string
  message?: string
  createdAt: string
  checkedIn?: boolean
  checkedInAt?: string
  erpnextLead?: string
  cancelled?: boolean
  cancelledAt?: string
}

interface AdminData {
  totalBookings: number
  totalGuests: number
  bookings: Booking[]
  dayStats: { date: string; totalSeats: number }[]
}

const DAY_LABELS: Record<string, string> = {
  '2026-04-21': 'Tue 21 Apr',
  '2026-04-22': 'Wed 22 Apr',
  '2026-04-23': 'Thu 23 Apr',
  '2026-04-24': 'Fri 24 Apr',
  '2026-04-25': 'Sat 25 Apr',
  '2026-04-26': 'Sun 26 Apr',
}

export default function AdminSalone() {
  const [token, setToken] = useState('')
  const [authed, setAuthed] = useState(false)
  const [data, setData] = useState<AdminData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cancelling, setCancelling] = useState<string | null>(null)
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [view, setView] = useState<'bookings' | 'calendar'>('bookings')

  const fetchData = useCallback(async (t: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/salone', {
        headers: { 'x-admin-token': t },
      })
      if (res.status === 401) { setError('Invalid access token'); setAuthed(false); return }
      if (!res.ok) { setError('Failed to load data'); return }
      setData(await res.json())
      setAuthed(true)
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchData(token)
  }

  const cancelBooking = async (ref: string) => {
    setConfirmCancel(null)
    setCancelling(ref)
    // Optimistic update — mark cancelled immediately in local state
    setData(prev => {
      if (!prev) return prev
      const bookings = prev.bookings.map(b =>
        b.ref === ref ? { ...b, cancelled: true, cancelledAt: new Date().toISOString() } : b
      )
      // Recalculate dayStats seatMap locally
      const cancelled = prev.bookings.find(b => b.ref === ref)
      const dayStats = prev.dayStats.map(d =>
        d.date === cancelled?.date
          ? { ...d, totalSeats: Math.max(0, d.totalSeats - (cancelled.guests ?? 0)) }
          : d
      )
      const totalGuests = bookings.filter(b => !b.cancelled).reduce((s, b) => s + b.guests, 0)
      return { ...prev, bookings, dayStats, totalGuests }
    })
    try {
      const res = await fetch(`/api/admin/salone?ref=${ref}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token },
      })
      if (!res.ok) {
        setError('Failed to cancel booking')
        fetchData(token) // revert optimistic update
      }
    } catch {
      setError('Network error')
      fetchData(token)
    } finally {
      setCancelling(null)
    }
  }

  useEffect(() => {
    if (!authed) return
    const id = setInterval(() => fetchData(token), 30000)
    return () => clearInterval(id)
  }, [authed, token, fetchData])

  const filtered = data?.bookings.filter(b =>
    !filter || [b.name, b.email, b.company, b.ref, b.date].some(f =>
      f?.toLowerCase().includes(filter.toLowerCase())
    )
  ) ?? []

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <div className="font-['Cormorant_Garamond'] text-[1.1rem] tracking-[0.18em] uppercase text-[#E8E4DC]/80 mb-2">
              LuxCine
            </div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#9C8660]">
              Admin — Salone 2026
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[9px] tracking-[0.25em] uppercase text-[#E8E4DC]/30 block mb-2">
                Access Token
              </label>
              <input
                type="password"
                value={token}
                onChange={e => setToken(e.target.value)}
                className="w-full bg-transparent border border-[#E8E4DC]/10 focus:border-[#9C8660]/40 px-4 py-3 text-[13px] text-[#E8E4DC]/80 outline-none transition-colors duration-300"
                placeholder="Enter token"
                autoFocus
              />
            </div>
            {error && <p className="text-[11px] text-red-400/70">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full border border-[#9C8660]/30 hover:border-[#9C8660]/60 py-3 text-[10px] tracking-[0.28em] uppercase text-[#9C8660] transition-colors duration-400 disabled:opacity-40">
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
          <p className="mt-6 text-[10px] text-[#E8E4DC]/15 text-center">
            Set ADMIN_TOKEN env var on Vercel to change the default token.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#E8E4DC]">
      {/* Header */}
      <div className="border-b border-[#E8E4DC]/6">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <span className="font-['Cormorant_Garamond'] text-[1rem] tracking-[0.15em] uppercase text-[#E8E4DC]/70 mr-4">
              LuxCine
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#9C8660]">
              Salone del Mobile 2026
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => fetchData(token)}
              className="text-[9px] tracking-[0.2em] uppercase text-[#E8E4DC]/30 hover:text-[#E8E4DC]/60 transition-colors duration-300">
              Refresh
            </button>
            <button onClick={() => { setAuthed(false); setData(null); setToken('') }}
              className="text-[9px] tracking-[0.2em] uppercase text-[#E8E4DC]/20 hover:text-[#E8E4DC]/50 transition-colors duration-300">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E8E4DC]/6 border border-[#E8E4DC]/6 mb-10">
          {[
            { label: 'Total Bookings', value: data?.totalBookings ?? 0 },
            { label: 'Total Guests', value: data?.totalGuests ?? 0 },
            { label: 'Checked In', value: data?.bookings.filter(b => b.checkedIn).length ?? 0 },
            { label: 'Avg Group Size', value: data && data.totalBookings > 0 ? Math.round((data.totalGuests / data.totalBookings) * 10) / 10 : '—' },
          ].map(s => (
            <div key={s.label} className="px-8 py-6">
              <div className="font-['Cormorant_Garamond'] text-3xl font-light text-[#9C8660] mb-1">
                {s.value}
              </div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-[#E8E4DC]/55">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Day overview */}
        <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-[#E8E4DC]/6 border border-[#E8E4DC]/6 mb-10">
          {data?.dayStats.map(d => (
            <div key={d.date} className="px-5 py-5">
              <div className="text-[11px] tracking-[0.12em] uppercase text-[#E8E4DC]/60 mb-2">
                {DAY_LABELS[d.date]}
              </div>
              <div className="font-['Cormorant_Garamond'] text-2xl font-light text-[#E8E4DC]/85 mb-0.5">
                {d.totalSeats}
              </div>
              <div className="text-[11px] text-[#E8E4DC]/45">guests booked</div>
            </div>
          ))}
        </div>

        {/* View tabs + search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-6 border-b border-[#E8E4DC]/6">
            {(['bookings', 'calendar'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`text-[11px] tracking-[0.2em] uppercase pb-3 transition-colors duration-300 ${
                  view === v ? 'text-[#9C8660] border-b border-[#9C8660]' : 'text-[#E8E4DC]/50 hover:text-[#E8E4DC]/75'
                }`}>
                {v === 'bookings' ? 'All Bookings' : 'Calendar View'}
              </button>
            ))}
          </div>
          {view === 'bookings' && (
            <input
              type="text"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Search by name, email, ref..."
              className="bg-transparent border border-[#E8E4DC]/10 focus:border-[#9C8660]/30 px-4 py-2 text-[12px] text-[#E8E4DC]/60 outline-none w-64 transition-colors duration-300"
            />
          )}
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 border border-red-400/20 text-[12px] text-red-400/70">{error}</div>
        )}

        {/* Bookings table */}
        {view === 'bookings' && (
          <div className="border border-[#E8E4DC]/6">
            {filtered.length === 0 ? (
              <div className="px-8 py-16 text-center text-[12px] text-[#E8E4DC]/20">
                {data?.totalBookings === 0 ? 'No bookings yet.' : 'No results for this search.'}
              </div>
            ) : (
              <>
                {/* Table header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#E8E4DC]/6 bg-[#0F0F0F]">
                  {['Ref', 'Name', 'Date / Time', 'Guests', 'Company', 'Role', 'Location', ''].map((h, i) => (
                    <div key={i} className={`text-[11px] tracking-[0.15em] uppercase text-[#E8E4DC]/55 ${i === 0 ? 'col-span-1' : i === 1 ? 'col-span-2' : i === 2 ? 'col-span-2' : i === 4 ? 'col-span-2' : i === 6 ? 'col-span-2' : 'col-span-1'}`}>
                      {h}
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {filtered.map((b, i) => (
                  <div key={b.ref}
                    className={`grid grid-cols-12 gap-4 px-6 py-5 border-b border-[#E8E4DC]/4 hover:bg-[#0F0F0F] transition-colors duration-300 ${b.cancelled ? 'opacity-40' : i % 2 === 0 ? '' : 'bg-[#080808]'}`}>
                    <div className="col-span-1">
                      <span className="text-[12px] font-mono text-[#9C8660]">{b.ref}</span>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[13px] text-[#E8E4DC]/90 font-light">{b.name}</div>
                      <div className="text-[11px] text-[#E8E4DC]/55 mt-0.5">{b.email}</div>
                      {b.phone && <div className="text-[11px] text-[#E8E4DC]/45 mt-0.5">{b.phone}</div>}
                    </div>
                    <div className="col-span-2">
                      <div className="text-[13px] text-[#E8E4DC]/80">{DAY_LABELS[b.date] ?? b.date}</div>
                      <div className="text-[12px] text-[#E8E4DC]/55 mt-0.5">{b.slot}</div>
                    </div>
                    <div className="col-span-1">
                      <span className="text-[13px] text-[#E8E4DC]/80">{b.guests}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[13px] text-[#E8E4DC]/70 font-light">{b.company ?? '—'}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-[12px] text-[#E8E4DC]/65">{b.role ?? '—'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[12px] text-[#E8E4DC]/65">{b.location ?? '—'}</span>
                    </div>
                    <div className="col-span-1 flex flex-col items-end gap-2">
                      {b.cancelled && (
                        <span className="text-[11px] tracking-[0.1em] uppercase text-red-400/70">✕ Cancelled</span>
                      )}
                      {!b.cancelled && b.checkedIn && (
                        <span className="text-[11px] tracking-[0.1em] uppercase text-emerald-400/80">✓ In</span>
                      )}
                      {b.erpnextLead ? (
                        <a href={`https://ihome.l.erpnext.com/crm/leads/${b.erpnextLead}`} target="_blank" rel="noopener noreferrer"
                          className="text-[11px] tracking-[0.1em] text-[#9C8660]/70 hover:text-[#9C8660] transition-colors duration-300" title="View in ERPNext">
                          CRM ↗
                        </a>
                      ) : (
                        <span className="text-[8px] text-[#E8E4DC]/15">—</span>
                      )}
                      {!b.cancelled && cancelling !== b.ref && confirmCancel !== b.ref && (
                        <button
                          onClick={() => setConfirmCancel(b.ref)}
                          className="text-[11px] tracking-[0.1em] uppercase text-red-400/40 hover:text-red-400/70 transition-colors duration-300">
                          Cancel
                        </button>
                      )}
                      {!b.cancelled && cancelling === b.ref && (
                        <span className="text-[11px] text-red-400/40">Cancelling…</span>
                      )}
                      {confirmCancel === b.ref && (
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-[#E8E4DC]/50">Sure?</span>
                          <button
                            onClick={() => cancelBooking(b.ref)}
                            className="text-[11px] tracking-[0.1em] uppercase text-red-400/80 hover:text-red-400 transition-colors duration-200 font-medium">
                            Yes
                          </button>
                          <button
                            onClick={() => setConfirmCancel(null)}
                            className="text-[11px] tracking-[0.1em] uppercase text-[#E8E4DC]/30 hover:text-[#E8E4DC]/60 transition-colors duration-200">
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Calendar view */}
        {view === 'calendar' && (
          <div className="space-y-8">
            {data?.dayStats.map(day => {
              const dayBookings = data.bookings.filter(b => b.date === day.date)
              return (
                <div key={day.date} className="border border-[#E8E4DC]/6">
                  <div className="px-6 py-4 border-b border-[#E8E4DC]/6 bg-[#0F0F0F] flex items-center justify-between">
                    <div>
                      <span className="font-['Cormorant_Garamond'] text-[1rem] text-[#E8E4DC]/70 mr-4">
                        {DAY_LABELS[day.date]}
                      </span>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-[#9C8660]/50">
                        {day.totalSeats} guests
                      </span>
                    </div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#E8E4DC]/20">
                      {dayBookings.length} booking{dayBookings.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {dayBookings.length === 0 ? (
                    <div className="px-6 py-8 text-[11px] text-[#E8E4DC]/15 text-center">
                      No bookings for this day
                    </div>
                  ) : (
                    <div className="divide-y divide-[#E8E4DC]/4">
                      {dayBookings
                        .sort((a, b) => a.slot.localeCompare(b.slot))
                        .map(b => (
                          <div key={b.ref} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#0F0F0F] transition-colors duration-200">
                            <div className="col-span-1 text-[12px] text-[#9C8660]/60 tabular-nums">{b.slot}</div>
                            <div className="col-span-3 text-[12px] text-[#E8E4DC]/60">{b.name}</div>
                            <div className="col-span-3 text-[11px] text-[#E8E4DC]/30">{b.company ?? b.email}</div>
                            <div className="col-span-1 text-[11px] text-[#E8E4DC]/30">{b.guests}px</div>
                            <div className="col-span-2 text-[10px] font-mono text-[#9C8660]/40">{b.ref}</div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <p className="mt-8 text-[9px] text-[#E8E4DC]/12 text-center">
          Data refreshes automatically every 30 seconds · In-memory store — data resets on server restart
        </p>
      </div>
    </div>
  )
}
