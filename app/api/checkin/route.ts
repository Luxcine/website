import { NextRequest, NextResponse } from 'next/server'
import { bookingList } from '@/lib/saloneStore'

const CHECKIN_TOKEN = process.env.CHECKIN_TOKEN ?? process.env.ADMIN_TOKEN ?? 'luxcine-admin-2026'

function auth(req: NextRequest): boolean {
  const token = req.headers.get('x-admin-token') ?? req.nextUrl.searchParams.get('token')
  return token === CHECKIN_TOKEN
}

// GET /api/checkin?ref=LXC-XXXXXX — lookup booking by ref
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const ref = req.nextUrl.searchParams.get('ref')?.toUpperCase().trim()
  if (!ref) return NextResponse.json({ error: 'ref required' }, { status: 400 })

  const booking = bookingList.find(b => b.ref === ref)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

  return NextResponse.json(booking)
}

// POST /api/checkin — mark as checked in
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { ref } = await req.json()
  const refClean = ref?.toUpperCase().trim()
  if (!refClean) return NextResponse.json({ error: 'ref required' }, { status: 400 })

  const booking = bookingList.find(b => b.ref === refClean)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

  if (booking.checkedIn) {
    return NextResponse.json({ alreadyCheckedIn: true, booking }, { status: 200 })
  }

  booking.checkedIn = true
  booking.checkedInAt = new Date().toISOString()

  return NextResponse.json({ success: true, booking })
}
