import { NextRequest, NextResponse } from 'next/server'
import { getStore, cancelBooking, purgeCancelled, CAPACITY, HARD_MAX, generateSlots } from '@/lib/saloneStore'

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? 'luxcine-admin-2026'

function auth(req: NextRequest): boolean {
  const token = req.headers.get('x-admin-token') ?? req.nextUrl.searchParams.get('token')
  return token === ADMIN_TOKEN
}

// GET /api/admin/salone — returns all bookings + summary stats
export async function GET(req: NextRequest) {
  if (!auth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const store = await getStore()
  const eventDays = ['2026-04-21', '2026-04-22', '2026-04-23', '2026-04-24', '2026-04-25', '2026-04-26']
  const slots = generateSlots()

  const dayStats = eventDays.map(date => {
    let totalSeats = 0
    const slotData = slots.map(slot => {
      const booked = store.seatMap[`${date}_${slot}`] ?? 0
      totalSeats += booked
      return { slot, booked, capacity: CAPACITY, hardMax: HARD_MAX }
    })
    return { date, totalSeats, slots: slotData }
  })

  return NextResponse.json({
    totalBookings: store.bookings.length,
    totalGuests: store.bookings.reduce((s, b) => s + b.guests, 0),
    bookings: store.bookings.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    dayStats,
  })
}

// DELETE /api/admin/salone?ref=LXC-XXXXXX — cancel a booking
// DELETE /api/admin/salone?purge=1 — permanently remove all cancelled bookings
export async function DELETE(req: NextRequest) {
  if (!auth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (req.nextUrl.searchParams.get('purge') === '1') {
    const removed = await purgeCancelled()
    return NextResponse.json({ success: true, removed })
  }

  const ref = req.nextUrl.searchParams.get('ref')
  if (!ref) {
    return NextResponse.json({ error: 'ref required' }, { status: 400 })
  }

  const booking = await cancelBooking(ref)
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, cancelled: booking.ref })
}
