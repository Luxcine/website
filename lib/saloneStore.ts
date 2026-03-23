// Salone booking store — persisted via Vercel Blob
// Schema: one JSON file "salone-bookings.json" with { bookings: Booking[], seatMap: Record<string,number> }

import { put, list, del } from '@vercel/blob'

export interface Booking {
  ref: string
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
  createdAt: string
  checkedIn?: boolean
  checkedInAt?: string
  erpnextLead?: string
  cancelled?: boolean
  cancelledAt?: string
}

interface StoreData {
  bookings: Booking[]
  seatMap: Record<string, number>
}

const BLOB_KEY = 'salone-bookings.json'

async function readStore(): Promise<StoreData> {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY })
    if (blobs.length === 0) return { bookings: [], seatMap: {} }
    const res = await fetch(blobs[0].url, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      cache: 'no-store',
    })
    if (!res.ok) return { bookings: [], seatMap: {} }
    return await res.json() as StoreData
  } catch {
    return { bookings: [], seatMap: {} }
  }
}

async function writeStore(data: StoreData): Promise<void> {
  await put(BLOB_KEY, JSON.stringify(data), {
    access: 'private',
    addRandomSuffix: false,
    contentType: 'application/json',
    allowOverwrite: true,
  })
}

export async function getStore(): Promise<StoreData> {
  return readStore()
}

export async function addBooking(booking: Booking): Promise<void> {
  const store = await readStore()
  const key = `${booking.date}_${booking.slot}`
  store.bookings.push(booking)
  store.seatMap[key] = (store.seatMap[key] ?? 0) + booking.guests
  await writeStore(store)
}

export async function updateBooking(ref: string, patch: Partial<Booking>): Promise<boolean> {
  const store = await readStore()
  const idx = store.bookings.findIndex(b => b.ref === ref)
  if (idx === -1) return false
  store.bookings[idx] = { ...store.bookings[idx], ...patch }
  await writeStore(store)
  return true
}

export async function cancelBooking(ref: string): Promise<Booking | null> {
  const store = await readStore()
  const idx = store.bookings.findIndex(b => b.ref === ref)
  if (idx === -1) return null
  const booking = store.bookings[idx]
  if (booking.cancelled) return booking
  store.bookings[idx] = { ...booking, cancelled: true, cancelledAt: new Date().toISOString() }
  const key = `${booking.date}_${booking.slot}`
  store.seatMap[key] = Math.max(0, (store.seatMap[key] ?? 0) - booking.guests)
  await writeStore(store)
  return store.bookings[idx]
}

export async function purgeCancelled(): Promise<number> {
  const store = await readStore()
  const before = store.bookings.length
  store.bookings = store.bookings.filter(b => !b.cancelled)
  const removed = before - store.bookings.length
  if (removed > 0) await writeStore(store)
  return removed
}

export async function getBookingByRef(ref: string): Promise<Booking | null> {
  const store = await readStore()
  return store.bookings.find(b => b.ref === ref) ?? null
}

export const CAPACITY = 12
export const HARD_MAX = 15

export function generateRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'LXC-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function generateSlots(): string[] {
  const slots: string[] = []
  let minutes = 9 * 60 + 50 // 09:50
  const end = 18 * 60 + 30  // stop before 18:30
  while (minutes < end) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    if (!(h === 13 && m === 50)) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
    minutes += 40
  }
  return slots
}
