import { NextResponse } from 'next/server'
import { list, put } from '@vercel/blob'
import { getStore, cancelBooking } from '@/lib/saloneStore'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { blobs } = await list({ prefix: 'salone-bookings' })
  const results = []
  for (const b of blobs) {
    try {
      const res = await fetch(b.url, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
        cache: 'no-store',
      })
      const data = await res.json()
      const active = data.bookings?.filter((bk: { cancelled?: boolean }) => !bk.cancelled) ?? []
      const cancelled = data.bookings?.filter((bk: { cancelled?: boolean }) => bk.cancelled) ?? []
      results.push({
        pathname: b.pathname,
        url: b.url.substring(0, 100) + '...',
        size: b.size,
        uploadedAt: b.uploadedAt,
        totalBookings: data.bookings?.length ?? 0,
        activeRefs: active.map((bk: { ref: string }) => bk.ref),
        cancelledRefs: cancelled.map((bk: { ref: string }) => bk.ref),
      })
    } catch (e) {
      results.push({ pathname: b.pathname, error: String(e) })
    }
  }

  // Also test via getStore() to check if store function returns same data
  const store = await getStore()
  const storeActive = store.bookings.filter(b => !b.cancelled).map(b => b.ref)
  const storeCancelled = store.bookings.filter(b => b.cancelled).map(b => b.ref)

  return NextResponse.json({
    blobCount: blobs.length,
    blobs: results,
    storeFunction: {
      totalBookings: store.bookings.length,
      activeRefs: storeActive,
      cancelledRefs: storeCancelled,
    },
  })
}

// POST /api/debug/blob?action=cancel&ref=XXX — test cancel and verify
export async function POST(req: Request) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action')
  const ref = url.searchParams.get('ref')

  if (action === 'cancel' && ref) {
    const before = await getStore()
    const beforeState = before.bookings.find(b => b.ref === ref)

    const result = await cancelBooking(ref)

    const after = await getStore()
    const afterState = after.bookings.find(b => b.ref === ref)

    return NextResponse.json({
      ref,
      cancelResult: result ? 'success' : 'not_found',
      before: { cancelled: beforeState?.cancelled },
      after: { cancelled: afterState?.cancelled },
    })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
