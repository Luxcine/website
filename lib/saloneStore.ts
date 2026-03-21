// Shared in-memory store for Salone bookings
// In production: replace with Postgres/Supabase/Airtable

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
}

// Seat occupancy: { 'YYYY-MM-DD_HH:MM': number }
export const seatMap: Record<string, number> = {}

// Full booking records
export const bookingList: Booking[] = []

export const CAPACITY = 12
export const HARD_MAX = 15

export function generateRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'LXC-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function generateSlots(): string[] {
  const slots: string[] = []
  for (let h = 10; h < 18; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    slots.push(`${String(h).padStart(2, '0')}:30`)
  }
  return slots
}
