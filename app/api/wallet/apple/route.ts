import { NextRequest, NextResponse } from 'next/server'
import { getBookingByRef } from '@/lib/saloneStore'

const PASSKIT_KEY    = process.env.PASSKIT_API_KEY?.trim()
const TICKET_TYPE_ID = '2BXz1KyaECKtjG48aQpBNi'
const EVENT_ID       = '78RxfpSFzLkfojb08PoAMh'
const PRODUCTION_ID  = '3ZgwrK1vePKYJVNO74VYA4'
const API            = 'https://api.pub1.passkit.io'
const CDN            = 'https://pub1.pskt.io'

const AUTH = () => ({ 'Authorization': `Bearer ${PASSKIT_KEY}`, 'Content-Type': 'application/json' })

async function getTicket(ref: string) {
  const url = `${API}/eventTickets/ticket/ticketNumber?ticketNumber=${encodeURIComponent(ref)}&productionId=${PRODUCTION_ID}`
  const res = await fetch(url, { headers: { 'Authorization': `Bearer ${PASSKIT_KEY}` } })
  const data = await res.json()
  if (data.error || !data.id) return null
  return data as { id: string }
}

async function issueTicket(ref: string, name: string, email: string) {
  const [forename, ...rest] = name.trim().split(' ')
  const surname = rest.join(' ') || forename
  const res = await fetch(`${API}/eventTickets/ticket`, {
    method: 'POST',
    headers: AUTH(),
    body: JSON.stringify({
      ticketTypeId: TICKET_TYPE_ID,
      eventId:      EVENT_ID,
      ticketNumber: ref,
      orderNumber:  ref,
      person: { forename, surname, displayName: name, emailAddress: email },
    }),
  })
  return res.json() as Promise<{ id?: string; error?: string }>
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

  // Try to find existing ticket
  let ticket = await getTicket(ref)

  // Issue ticket if not yet created
  if (!ticket) {
    const issued = await issueTicket(ref, booking.name, booking.email ?? '')
    if (issued.error) {
      console.error('PassKit issue ticket error:', issued.error)
      return NextResponse.json({ error: issued.error }, { status: 503 })
    }
    // Fetch to get the ticket ID
    ticket = await getTicket(ref)
    if (!ticket) {
      return NextResponse.json({ error: 'Could not retrieve ticket after issuance' }, { status: 503 })
    }
  }

  // Redirect to PassKit CDN direct .pkpass download URL
  return NextResponse.redirect(`${CDN}/${ticket.id}.pkpass`)
}
