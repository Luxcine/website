import { NextRequest, NextResponse } from 'next/server'

// ─── Types ────────────────────────────────────────────────────────────────────
interface BookingPayload {
  date: string        // '2026-04-21'
  slot: string        // '10:00'
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

// ─── In-memory store (replace with DB in production) ──────────────────────────
// Structure: { 'YYYY-MM-DD_HH:MM': number_of_booked_seats }
const bookings: Record<string, number> = {}

const CAPACITY = 12
const HARD_MAX = 15   // +3 overbooking tolerance

// ─── POST /api/salone/book ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: BookingPayload = await req.json()
    const { date, slot, guests, name, email } = body

    // Validate required fields
    if (!date || !slot || !guests || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check availability
    const key = `${date}_${slot}`
    const currentBooked = bookings[key] ?? 0

    if (currentBooked + guests > HARD_MAX) {
      return NextResponse.json(
        { error: 'This slot is no longer available for the requested group size.' },
        { status: 409 }
      )
    }

    // Reserve seats
    bookings[key] = currentBooked + guests

    // TODO: In production replace with:
    // 1. Save booking to database (Postgres / Supabase / Airtable)
    // 2. Send confirmation email via Resend / SendGrid:
    //    - Immediate confirmation to client (with date, time, location details)
    //    - Reminder 24h before session
    //    - Internal notification to LuxuryCine team
    // 3. Add to CRM / Asana task

    const confirmationRef = generateRef()

    return NextResponse.json({
      success: true,
      ref: confirmationRef,
      message: `Booking confirmed for ${guests} guest(s) on ${date} at ${slot}.`,
      // In production: include ICS calendar attachment URL
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── GET /api/salone/book?date=YYYY-MM-DD ─────────────────────────────────────
// Returns available slots for a given date (without revealing exact capacity)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ error: 'date parameter required' }, { status: 400 })
  }

  const slots = generateSlots()
  const availability = slots.map((slot) => {
    const key = `${date}_${slot}`
    const booked = bookings[key] ?? 0
    return {
      slot,
      available: booked < HARD_MAX,
      // NOTE: Do NOT expose booked count or remaining spots to frontend
    }
  })

  return NextResponse.json({ date, slots: availability })
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateSlots(): string[] {
  const slots: string[] = []
  for (let h = 10; h < 18; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    slots.push(`${String(h).padStart(2, '0')}:30`)
  }
  return slots
}

function generateRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'LXC-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
