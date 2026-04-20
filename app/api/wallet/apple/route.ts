import { NextRequest, NextResponse } from 'next/server'
import { getBookingByRef, type Booking } from '@/lib/saloneStore'

const PASSKIT_KEY    = process.env.PASSKIT_API_KEY?.trim()
const TICKET_TYPE_ID = '2BXz1KyaECKtjG48aQpBNi'
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

const EVENT_IDS: Record<string, string> = {
  '2026-04-21': '4aN4xHVmegrbIRRlOkZiYR',
  '2026-04-22': '3w2SUSbnRKVTYykgAYZO4D',
  '2026-04-23': '2wc5abHoTJGxKQjJ15AiGT',
  '2026-04-24': '0VgKX1CVnlO82s1t0zFEg2',
  '2026-04-25': '2CTXMWCUgFZIF172HWVHnA',
  '2026-04-26': '7AjPK9WN0VPRa4lgYAu8bo',
}

const FALLBACK_EVENT_ID = '78RxfpSFzLkfojb08PoAMh'

const AUTH = () => ({ 'Authorization': `Bearer ${PASSKIT_KEY}`, 'Content-Type': 'application/json' })

interface PassKitTicket {
  id: string
  metaData?: Record<string, string>
  event?: { id?: string }
  [key: string]: unknown
}

async function getTicket(ticketNumber: string): Promise<PassKitTicket | null> {
  const url = `${API}/eventTickets/ticket/ticketNumber?ticketNumber=${encodeURIComponent(ticketNumber)}&productionId=${PRODUCTION_ID}`
  const res = await fetch(url, { headers: { 'Authorization': `Bearer ${PASSKIT_KEY}` } })
  const data = await res.json()
  if (data.error || !data.id) return null
  return data as PassKitTicket
}

function getEventId(date: string): string {
  return EVENT_IDS[date] ?? FALLBACK_EVENT_ID
}

function buildTicketPayload(ticketNumber: string, ref: string, booking: Booking) {
  const [forename, ...rest] = booking.name.trim().split(' ')
  const surname = rest.join(' ') || forename
  const dateLabel = DAY_LABELS[booking.date] ?? booking.date

  return {
    ticketTypeId: TICKET_TYPE_ID,
    eventId:      getEventId(booking.date),
    ticketNumber,
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
      ref,
    },
    seatInfo: {
      section: dateLabel,
      gate:    booking.slot,
      seat:    `${booking.guests} guest${booking.guests !== 1 ? 's' : ''}`,
    },
  }
}

async function issueTicket(ticketNumber: string, ref: string, booking: Booking) {
  const res = await fetch(`${API}/eventTickets/ticket`, {
    method: 'POST',
    headers: AUTH(),
    body: JSON.stringify(buildTicketPayload(ticketNumber, ref, booking)),
  })
  return res.json() as Promise<{ id?: string; error?: string }>
}

function ticketIsCorrect(ticket: PassKitTicket, booking: Booking): boolean {
  const correctEventId = getEventId(booking.date)
  const currentEventId = ticket.event?.id
  if (currentEventId !== correctEventId) return false
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

  const booking = await getBookingByRef(ref)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.cancelled) return NextResponse.json({ error: 'Booking cancelled' }, { status: 410 })

  // Try versioned ticket numbers: ref, ref-V2, ref-V3, ...
  // Find the latest correct ticket, or create a new one with the next version
  let ticket: PassKitTicket | null = null
  let lastVersion = 0

  // Check base ref first
  const baseTicket = await getTicket(ref)
  if (baseTicket) {
    lastVersion = 1
    if (ticketIsCorrect(baseTicket, booking)) {
      ticket = baseTicket
    }
  }

  // Check versioned tickets (V2..V9)
  if (!ticket) {
    for (let v = 2; v <= 9; v++) {
      const vTicket = await getTicket(`${ref}-V${v}`)
      if (vTicket) {
        lastVersion = v
        if (ticketIsCorrect(vTicket, booking)) {
          ticket = vTicket
          break
        }
      } else {
        break
      }
    }
  }

  // No correct ticket found — issue a new one
  if (!ticket) {
    const nextVersion = lastVersion + 1
    const ticketNumber = nextVersion === 1 ? ref : `${ref}-V${nextVersion}`
    const issued = await issueTicket(ticketNumber, ref, booking)
    if (issued.error) {
      console.error('PassKit issue ticket error:', issued.error)
      return NextResponse.json({ error: issued.error }, { status: 503 })
    }
    ticket = await getTicket(ticketNumber)
    if (!ticket) {
      return NextResponse.json({ error: 'Could not retrieve ticket after issuance' }, { status: 503 })
    }
  }

  return NextResponse.redirect(`${CDN}/${ticket.id}.pkpass?t=${Date.now()}`)
}
