import { NextRequest, NextResponse } from 'next/server'
import { getBookingByRef } from '@/lib/saloneStore'
import crypto from 'crypto'

const DIST_URL  = process.env.PASSKIT_DISTRIBUTION_URL?.trim()   // e.g. https://pub1.pskt.io/c/xxxxxx
const ENC_KEY   = process.env.PASSKIT_ENCRYPTION_KEY?.trim()     // 64-char hex (32-byte AES-256 key)

const DAY_LABELS: Record<string, string> = {
  '2026-04-21': 'Tue 21 Apr', '2026-04-22': 'Wed 22 Apr',
  '2026-04-23': 'Thu 23 Apr', '2026-04-24': 'Fri 24 Apr',
  '2026-04-25': 'Sat 25 Apr', '2026-04-26': 'Sun 26 Apr',
}

function generateSmartPassUrl(baseUrl: string, keyHex: string, fields: Record<string, string>): string {
  const key = Buffer.from(keyHex, 'hex')
  const iv  = crypto.randomBytes(16)

  const json    = JSON.stringify(fields)
  const padLen  = 16 - (json.length % 16)
  const padded  = Buffer.concat([Buffer.from(json), Buffer.alloc(padLen, padLen)])

  const cipher    = crypto.createCipheriv('aes-256-cbc', key, iv)
  cipher.setAutoPadding(false)
  const encrypted = Buffer.concat([cipher.update(padded), cipher.final()])

  const b64 = encrypted.toString('base64url')
  const ivHex = iv.toString('hex')

  return `${baseUrl.replace(/\/$/, '')}?data=${b64}&iv=${ivHex}`
}

export async function GET(req: NextRequest) {
  if (!DIST_URL || !ENC_KEY) {
    return NextResponse.json({ error: 'Apple Wallet not configured' }, { status: 503 })
  }

  const ref = req.nextUrl.searchParams.get('ref')?.toUpperCase().trim()
  if (!ref) return NextResponse.json({ error: 'ref required' }, { status: 400 })

  const booking = await getBookingByRef(ref)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.cancelled) return NextResponse.json({ error: 'Booking cancelled' }, { status: 410 })

  const dateLabel = DAY_LABELS[booking.date] ?? booking.date
  const startDate = `${booking.date}T${booking.slot}:00+02:00`

  const fields: Record<string, string> = {
    'person.displayName':                booking.name,
    'eventTickets.ticket.ticketNumber':  ref,
    'eventTickets.event.startDate':      startDate,
  }
  if (booking.email) fields['person.emailAddress'] = booking.email

  // Unused by PassKit but surfaced in back fields via template
  fields['universal.expiryDate'] = `${booking.date}T23:59:59+02:00`

  const url = generateSmartPassUrl(DIST_URL, ENC_KEY, fields)

  // Deep-link: on iOS this opens Wallet; on other platforms shows the PassKit landing page
  return NextResponse.redirect(url)
}
