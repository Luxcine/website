import { NextResponse } from 'next/server'
import { list, put } from '@vercel/blob'
import { getStore, cancelBooking } from '@/lib/saloneStore'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Direct blob inspection
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

// POST /api/debug/blob?action=cancel&ref=XXX — test cancel with full tracing
// POST /api/debug/blob?action=put-test — test raw put+read cycle
export async function POST(req: Request) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action')

  if (action === 'put-test') {
    // Test: write a test value, then read it back via list+fetch
    const testData = { test: true, ts: Date.now() }
    const putResult = await put('salone-test.json', JSON.stringify(testData), {
      access: 'private',
      addRandomSuffix: false,
      contentType: 'application/json',
      allowOverwrite: true,
    })

    const { blobs } = await list({ prefix: 'salone-test.json' })
    let readBack = null
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
        cache: 'no-store',
      })
      readBack = await res.json()
    }

    return NextResponse.json({
      putUrl: putResult.url,
      putPathname: putResult.pathname,
      listBlobCount: blobs.length,
      listUrl: blobs[0]?.url,
      urlsMatch: putResult.url === blobs[0]?.url,
      readBack,
      original: testData,
      match: JSON.stringify(readBack) === JSON.stringify(testData),
    })
  }

  if (action === 'cancel') {
    const ref = url.searchParams.get('ref')
    if (!ref) return NextResponse.json({ error: 'ref required' }, { status: 400 })

    // Read store BEFORE cancel
    const storeBefore = await getStore()
    const beforeBooking = storeBefore.bookings.find(b => b.ref === ref)

    // Do the cancel
    let cancelError = null
    let cancelResult = null
    try {
      cancelResult = await cancelBooking(ref)
    } catch (e) {
      cancelError = String(e)
    }

    // Read store AFTER cancel
    const storeAfter = await getStore()
    const afterBooking = storeAfter.bookings.find(b => b.ref === ref)

    // Also check blob directly
    const { blobs } = await list({ prefix: 'salone-bookings' })
    let blobBooking = null
    if (blobs.length > 0) {
      const last = blobs[blobs.length - 1]
      const res = await fetch(last.url, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
        cache: 'no-store',
      })
      const data = await res.json()
      blobBooking = data.bookings?.find((b: { ref: string }) => b.ref === ref)
    }

    return NextResponse.json({
      ref,
      cancelResult: cancelResult ? { ref: cancelResult.ref, cancelled: cancelResult.cancelled } : null,
      cancelError,
      before: beforeBooking ? { cancelled: beforeBooking.cancelled, ref: beforeBooking.ref } : 'not_found',
      afterViaStore: afterBooking ? { cancelled: afterBooking.cancelled, ref: afterBooking.ref } : 'not_found',
      afterViaBlob: blobBooking ? { cancelled: blobBooking.cancelled, ref: blobBooking.ref } : 'not_found',
      blobCount: blobs.length,
      blobUploadedAt: blobs[blobs.length - 1]?.uploadedAt,
    })
  }

  return NextResponse.json({ error: 'Unknown action. Use ?action=cancel&ref=X or ?action=put-test' }, { status: 400 })
}
