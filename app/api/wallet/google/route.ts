import { NextRequest, NextResponse } from 'next/server'
import { getBookingByRef } from '@/lib/saloneStore'
import crypto from 'crypto'

const ISSUER_ID = process.env.GOOGLE_WALLET_ISSUER_ID?.trim()
const CLASS_ID   = (process.env.GOOGLE_WALLET_CLASS_ID ?? 'luxcine_salone_2026').trim()
const SA_EMAIL   = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim()
const SA_KEY     = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY // PEM, \n as literal \\n

const DAY_LABELS: Record<string, string> = {
  '2026-04-21': 'Tue 21 Apr', '2026-04-22': 'Wed 22 Apr',
  '2026-04-23': 'Thu 23 Apr', '2026-04-24': 'Fri 24 Apr',
  '2026-04-25': 'Sat 25 Apr', '2026-04-26': 'Sun 26 Apr',
}

function b64url(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input) : input
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function signJWT(payload: object): string {
  const header = { alg: 'RS256', typ: 'JWT' }
  const body = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`
  const pem = SA_KEY!.replace(/\\n/g, '\n')
  const sig = crypto.createSign('RSA-SHA256').update(body).sign(pem)
  return `${body}.${b64url(sig)}`
}

export async function GET(req: NextRequest) {
  if (!ISSUER_ID || !SA_EMAIL || !SA_KEY) {
    return NextResponse.json({ error: 'Google Wallet not configured' }, { status: 503 })
  }

  const ref = req.nextUrl.searchParams.get('ref')?.toUpperCase().trim()
  if (!ref) return NextResponse.json({ error: 'ref required' }, { status: 400 })

  const booking = await getBookingByRef(ref)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.cancelled) return NextResponse.json({ error: 'Booking cancelled' }, { status: 410 })

  const objectId  = `${ISSUER_ID}.${ref.replace(/-/g, '_')}`
  const fullClass = `${ISSUER_ID}.${CLASS_ID}`
  const dateLabel = DAY_LABELS[booking.date] ?? booking.date

  const genericClass = {
    id: fullClass,
    classTemplateInfo: {
      cardTemplateOverride: {
        cardRowTemplateInfos: [
          { twoItems: {
              startItem: { firstValue: { fields: [{ fieldPath: 'object.textModulesData["date"]' }] } },
              endItem: { firstValue: { fields: [{ fieldPath: 'object.textModulesData["time"]' }] } },
          }},
          { twoItems: {
              startItem: { firstValue: { fields: [{ fieldPath: 'object.textModulesData["guests"]' }] } },
              endItem: { firstValue: { fields: [{ fieldPath: 'object.textModulesData["ref"]' }] } },
          }},
        ],
      },
    },
  }

  const genericObject = {
    id: objectId,
    classId: fullClass,
    genericType: 'GENERIC_TYPE_UNSPECIFIED',
    hexBackgroundColor: '#080808',
    logo: {
      sourceUri: { uri: 'https://luxcine.vercel.app/assets/logos/luxcine-white.png' },
      contentDescription: { defaultValue: { language: 'en', value: 'LuxCine' } },
    },
    cardTitle: { defaultValue: { language: 'en', value: 'LuxCine' } },
    subheader: { defaultValue: { language: 'en', value: 'Salone del Mobile 2026 · Milan' } },
    header: { defaultValue: { language: 'en', value: booking.name } },
    textModulesData: [
      { id: 'date',   header: 'Date',      body: dateLabel },
      { id: 'time',   header: 'Time',      body: booking.slot },
      { id: 'guests', header: 'Guests',    body: String(booking.guests) },
      { id: 'ref',    header: 'Reference', body: ref },
    ],
    barcode: { type: 'QR_CODE', value: ref, alternateText: ref },
    state: 'ACTIVE',
  }

  const jwt = signJWT({
    iss: SA_EMAIL,
    aud: 'google',
    origins: ['https://luxcine.vercel.app'],
    iat: Math.floor(Date.now() / 1000),
    typ: 'savetowallet',
    payload: { genericClasses: [genericClass], genericObjects: [genericObject] },
  })

  return NextResponse.redirect(`https://pay.google.com/gp/v/save/${jwt}`)
}
