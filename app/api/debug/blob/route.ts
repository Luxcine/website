import { NextResponse } from 'next/server'
import { list } from '@vercel/blob'

export async function GET() {
  const { blobs } = await list({ prefix: 'salone-bookings' })
  const results = []
  for (const b of blobs) {
    try {
      const res = await fetch(b.url, { cache: 'no-store' })
      const data = await res.json()
      const cancelled = data.bookings?.filter((bk: { cancelled?: boolean }) => bk.cancelled)?.map((bk: { ref: string }) => bk.ref) ?? []
      results.push({
        pathname: b.pathname,
        url: b.url.substring(0, 80) + '...',
        size: b.size,
        uploadedAt: b.uploadedAt,
        bookingCount: data.bookings?.length ?? 0,
        cancelledRefs: cancelled,
      })
    } catch {
      results.push({ pathname: b.pathname, error: 'Failed to read' })
    }
  }
  return NextResponse.json({ blobCount: blobs.length, blobs: results })
}
