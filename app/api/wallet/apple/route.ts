import { NextRequest, NextResponse } from 'next/server'
import { getBookingByRef } from '@/lib/saloneStore'

const PASSKIT_KEY     = process.env.PASSKIT_API_KEY?.trim()
const TICKET_TYPE_ID  = '2BXz1KyaECKtjG48aQpBNi'
const EVENT_ID        = '78RxfpSFzLkfojb08PoAMh'
const API             = 'https://api.pub1.passkit.io'

async function pk(path: string, body: object) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PASSKIT_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return res.json()
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

  // Step 1: Try to get existing pass first (ticket may already be issued)
  let passData = await pk('/eventTickets/pass', {
    ticketNumber: ref,
    format: ['APPLE_PASS_BUNDLE'],
  })

  // Step 2: If no pass found, issue the ticket then fetch the pass
  if (passData.error || !passData.passBundles) {
    // Issue the ticket
    const [forename, ...rest] = booking.name.trim().split(' ')
    const surname = rest.join(' ') || forename

    const issued = await pk('/eventTickets/ticket', {
      ticketTypeId: TICKET_TYPE_ID,
      eventId:      EVENT_ID,
      ticketNumber: ref,
      orderNumber:  ref,
      person: {
        forename:     forename,
        surname:      surname,
        displayName:  booking.name,
        emailAddress: booking.email ?? '',
      },
    })

    if (issued.error) {
      console.error('PassKit issue ticket error:', issued.error)
      return NextResponse.json({ error: issued.error }, { status: 503 })
    }

    // Fetch the .pkpass
    passData = await pk('/eventTickets/pass', {
      ticketNumber: ref,
      format: ['APPLE_PASS_BUNDLE'],
    })
  }

  // Extract base64 .pkpass bundle
  const bundle = passData.passBundles?.[0]
  if (!bundle?.applePassBundle) {
    console.error('PassKit pass bundle error:', JSON.stringify(passData))
    return NextResponse.json({ error: 'Could not generate pass' }, { status: 503 })
  }

  const pkpassBuffer = Buffer.from(bundle.applePassBundle, 'base64')

  return new NextResponse(pkpassBuffer as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.apple.pkpass',
      'Content-Disposition': `attachment; filename="${ref}.pkpass"`,
    },
  })
}
