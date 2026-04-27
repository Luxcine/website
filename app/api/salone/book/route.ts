import { NextRequest, NextResponse } from 'next/server'
import { getStore, addBooking, updateBooking, HARD_MAX, generateRef, generateSlots, Booking } from '@/lib/saloneStore'
import { createSaloneLead } from '@/lib/erpnext'
import { sendBookingConfirmation } from '@/lib/email'

export const dynamic = 'force-dynamic'

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

// POST /api/salone/book — CLOSED after event
export async function POST() {
  return NextResponse.json(
    { error: 'Bookings for Salone del Mobile.Milano 2026 are now closed. Thank you for your interest.' },
    { status: 410 }
  )
  /* Original booking logic preserved below
  try {
    const body: BookingPayload = await req.json()
    const { date, slot, guests, name, email } = body

    if (!date || !slot || !guests || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const store = await getStore()
    const key = `${date}_${slot}`
    const currentBooked = store.seatMap[key] ?? 0

    if (currentBooked + guests > HARD_MAX) {
      return NextResponse.json(
        { error: 'This slot is no longer available for the requested group size.' },
        { status: 409 }
      )
    }

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

    await addBooking(booking)

    // Send confirmation email (fire-and-forget — don't block response)
    sendBookingConfirmation({
      ref,
      name: body.name,
      email: body.email,
      date,
      slot,
      guests,
    }).catch(err => console.error('[email] Confirmation failed for', ref, ':', (err as Error).message))

    // Create CRM Lead in ERPNext (awaited — Vercel kills background tasks before completion)
    try {
      const leadName = await createSaloneLead({
        ref,
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        role: body.role,
        location: body.location,
        stage: body.stage,
        date,
        slot,
        guests,
        message: body.message,
      })
      await updateBooking(ref, { erpnextLead: leadName })
      console.log(`[CRM] Lead created: ${leadName} for booking ${ref}`)
    } catch (err: unknown) {
      console.error(`[CRM] Lead creation failed for ${ref}:`, (err as Error).message)
    }

    return NextResponse.json({
      success: true,
      ref,
      message: `Booking confirmed for ${guests} guest(s) on ${date} at ${slot}.`,
    })
  } catch (err) {
    console.error('[book] error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
  */
}

// GET /api/salone/book?date=YYYY-MM-DD
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ error: 'date parameter required' }, { status: 400 })
  }

  const store = await getStore()
  const slots = generateSlots()
  const availability = slots.map((slot) => ({
    slot,
    available: (store.seatMap[`${date}_${slot}`] ?? 0) < HARD_MAX,
  }))

  return NextResponse.json({ date, slots: availability })
}
