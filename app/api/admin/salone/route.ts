import { NextRequest, NextResponse } from 'next/server'
import { bookingList, seatMap, CAPACITY, HARD_MAX, generateSlots } from '@/lib/saloneStore'

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

  const eventDays = ['2026-04-21', '2026-04-22', '2026-04-23', '2026-04-24', '2026-04-25', '2026-04-26']
  const slots = generateSlots()

  const dayStats = eventDays.map(date => {
    let totalSeats = 0
    const slotData = slots.map(slot => {
      const booked = seatMap[`${date}_${slot}`] ?? 0
      totalSeats += booked
      return { slot, booked, capacity: CAPACITY, hardMax: HARD_MAX }
    })
    return { date, totalSeats, slots: slotData }
  })

  return NextResponse.json({
    totalBookings: bookingList.length,
    totalGuests: bookingList.reduce((s, b) => s + b.guests, 0),
    bookings: bookingList.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    dayStats,
  })
}

// DELETE /api/admin/salone?ref=LXC-XXXXXX — cancel a booking
export async function DELETE(req: NextRequest) {
  if (!auth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const ref = req.nextUrl.searchParams.get('ref')
  if (!ref) {
    return NextResponse.json({ error: 'ref required' }, { status: 400 })
  }

  const idx = bookingList.findIndex(b => b.ref === ref)
  if (idx === -1) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  const [removed] = bookingList.splice(idx, 1)
  const key = `${removed.date}_${removed.slot}`
  seatMap[key] = Math.max(0, (seatMap[key] ?? 0) - removed.guests)

  return NextResponse.json({ success: true, cancelled: removed.ref })
}
