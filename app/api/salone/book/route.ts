import { NextRequest, NextResponse } from 'next/server'
import {
  seatMap, bookingList, HARD_MAX,
  generateRef, generateSlots, Booking
} from '@/lib/saloneStore'

interface BookingPayload {
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
}

// POST /api/salone/book
export async function POST(req: NextRequest) {
  try {
    const body: BookingPayload = await req.json()
    const { date, slot, guests, name, email } = body

    if (!date || !slot || !guests || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const key = `${date}_${slot}`
    const currentBooked = seatMap[key] ?? 0

    if (currentBooked + guests > HARD_MAX) {
      return NextResponse.json(
        { error: 'This slot is no longer available for the requested group size.' },
        { status: 409 }
      )
    }

    seatMap[key] = currentBooked + guests

    const ref = generateRef()
    const booking: Booking = {
      ref,
      date,
      slot,
      guests,
      name,
      email,
      phone: body.phone,
      company: body.company,
      role: body.role,
      location: body.location,
      stage: body.stage,
      message: body.message,
      createdAt: new Date().toISOString(),
    }
    bookingList.push(booking)

    // TODO (production):
    // 1. Save to DB (Postgres / Supabase / Airtable)
    // 2. Send confirmation email via Resend / SendGrid
    // 3. Add to CRM / Asana task

    return NextResponse.json({
      success: true,
      ref,
      message: `Booking confirmed for ${guests} guest(s) on ${date} at ${slot}.`,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/salone/book?date=YYYY-MM-DD
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ error: 'date parameter required' }, { status: 400 })
  }

  const slots = generateSlots()
  const availability = slots.map((slot) => ({
    slot,
    available: (seatMap[`${date}_${slot}`] ?? 0) < HARD_MAX,
  }))

  return NextResponse.json({ date, slots: availability })
}
