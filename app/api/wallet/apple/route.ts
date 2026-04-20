import { NextRequest, NextResponse } from 'next/server'
import { getBookingByRef, type Booking } from '@/lib/saloneStore'

const PASSKIT_KEY    = process.env.PASSKIT_API_KEY?.trim()
const TICKET_TYPE_ID = '2BXz1KyaECKtjG48aQpBNi'
const EVENT_ID       = '78RxfpSFzLkfojb08PoAMh'
const PRODUCTION_ID  = '3ZgwrK1vePKYJVNO74VYA4'
const API            = 'https://api.pub1.passkit.io'
const CDN            = 'https://pub1.pskt.io'

const DAY_LABELS: Record<string, string> = {
  '2026-04-21': 'Tuesday 21 April',
  '2026-04-22': 'Wednesday 22 April',
  '2026-04-23': 'Thursday 23 April',
  '2026-04-24': 'Friday 24 April',
  '2026-04-25': 'Saturday 25 April',
  '2026-04-26': 'Sunday 26 April',
}

const AUTH = () => ({ 'Authorization': `Bearer ${PASSKIT_KEY}`, 'Content-Type': 'application/json' })

interface PassKitTicket {
  id: string
  metaData?: Record<string, string>
  [key: string]: unknown
}

async function getTicket(ref: string): Promise<PassKitTicket | null> {
  const url = `${API}/eventTickets/ticket/ticketNumber?ticketNumber=${encodeURIComponent(ref)}&productionId=${PRODUCTION_ID}`
  const res = await fetch(url, { headers: { 'Authorization': `Bearer ${PASSKIT_KEY}` } })
  const data = await res.json()
  if (data.error || !data.id) return null
  return data as PassKitTicket
}

function buildTicketPayload(ref: string, booking: Booking) {
  const [forename, ...rest] = booking.name.trim().split(' ')
  const surname = rest.join(' ') || forename
  const dateLabel = DAY_LABELS[booking.date] ?? booking.date

  return {
    ticketTypeId: TICKET_TYPE_ID,
    eventId:      EVENT_ID,
    ticketNumber: ref,
    orderNumber:  ref,
    person: {
      forename,
      surname,
      displayName: booking.name,
      emailAddress: booking.email ?? '',
    },
    metaData: {
      date:   dateLabel,
      slot:   booking.slot,
      guests: String(booking.guests),
      ref:    ref,
    },
    seatInfo: {
      section: dateLabel,
      gate:    booking.slot,
      seat:    `${booking.guests} guest${booking.guests !== 1 ? 's' : ''}`,
    },
  }
}

async function issueTicket(ref: string, booking: Booking) {
  const res = await fetch(`${API}/eventTickets/ticket`, {
    method: 'POST',
    headers: AUTH(),
    body: JSON.stringify(buildTicketPayload(ref, booking)),
  })
  return res.json() as Promise<{ id?: string; error?: string }>
}

async function updateTicket(ticketId: string, ref: string, booking: Booking) {
  const payload = { ...buildTicketPayload(ref, booking), id: ticketId }
  const res = await fetch(`${API}/eventTickets/ticket`, {
    method: 'PUT',
    headers: AUTH(),
    body: JSON.stringify(payload),
  })
  return res.json() as Promise<{ id?: string; error?: string }>
}

async function deleteTicket(ticketId: string) {
  const res = await fetch(`${API}/eventTickets/ticket/${ticketId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${PASSKIT_KEY}` },
  })
  return res.ok
}

function ticketMatchesBooking(ticket: PassKitTicket, booking: Booking): boolean {
  const meta = ticket.metaData
  if (!meta) return false
  const dateLabel = DAY_LABELS[booking.date] ?? booking.date
  return meta.date === dateLabel && meta.slot === booking.slot && meta.guests === String(booking.guests)
}

export async function GET(req: NextRequest) {
  if (!PASSKIT_KEY) {
    return NextResponse.json({ error: 'Apple Wallet not configured' }, { status: 503 })
  }

  const ref = req.nextUrl.searchParams.get('ref')?.toUpperCase().trim()
  if (!ref) return NextResponse.json({ error: 'ref required' }, { status: 400 })

  const force = req.nextUrl.searchParams.get('force') === '1'

  const booking = await getBookingByRef(ref)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.cancelled) return NextResponse.json({ error: 'Booking cancelled' }, { status: 410 })

  let ticket = await getTicket(ref)

  if (ticket) {
    if (force || !ticketMatchesBooking(ticket, booking)) {
      // Ticket exists but has stale data — try update first, then delete+re-issue
      const updated = await updateTicket(ticket.id, ref, booking)
      if (updated.error) {
        // Update failed — delete and re-issue
        await deleteTicket(ticket.id)
        ticket = null
      } else {
        // Re-fetch to get fresh ticket
        ticket = await getTicket(ref)
      }
    }
  }

  if (!ticket) {
    const issued = await issueTicket(ref, booking)
    if (issued.error) {
      console.error('PassKit issue ticket error:', issued.error)
      return NextResponse.json({ error: issued.error }, { status: 503 })
    }
    ticket = await getTicket(ref)
    if (!ticket) {
      return NextResponse.json({ error: 'Could not retrieve ticket after issuance' }, { status: 503 })
    }
  }

  // Cache-bust: add timestamp to force fresh .pkpass download
  return NextResponse.redirect(`${CDN}/${ticket.id}.pkpass?t=${Date.now()}`)
}
