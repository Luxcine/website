// ERPNext native Lead integration — creates a Lead for each confirmed Salone booking
// Uses session-based auth (API key encryption is broken on this instance)

const ERPNEXT_URL = process.env.ERPNEXT_URL ?? 'https://ihome.l.erpnext.com'
const ERPNEXT_USR = process.env.ERPNEXT_USR ?? 'geral.ihome@gmail.com'
const ERPNEXT_PWD = process.env.ERPNEXT_PWD ?? 'dahGfW34neuDHpZ'

interface SaloneLeadData {
  ref: string
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  location?: string
  stage?: string
  date: string
  slot: string
  guests: number
  message?: string
}

interface ErpNextSession {
  cookie: string
  csrf: string
}

async function getSession(): Promise<ErpNextSession> {
  // Login — Frappe sets csrf_token in both cookie and response body
  const loginRes = await fetch(`${ERPNEXT_URL}/api/method/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `usr=${encodeURIComponent(ERPNEXT_USR)}&pwd=${encodeURIComponent(ERPNEXT_PWD)}`,
  })

  if (!loginRes.ok) throw new Error(`ERPNext login failed: ${loginRes.status}`)

  const setCookie = loginRes.headers.get('set-cookie') ?? ''
  const cookie = setCookie

  // Frappe sets csrf_token in the homepage HTML (not in login cookies)
  const homeRes = await fetch(ERPNEXT_URL, { headers: { Cookie: cookie } })
  const html = await homeRes.text()
  const csrfMatch = html.match(/csrf_token\s*=\s*"([^"]+)"/)
  const csrf = csrfMatch?.[1] ?? ''

  if (!csrf) throw new Error('ERPNext: could not extract CSRF token')

  return { cookie, csrf }
}

export async function createSaloneLead(data: SaloneLeadData): Promise<string> {
  const session = await getSession()

  // Split name into first/last for native Lead
  const nameParts = data.name.trim().split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ') || ''

  const noteText = [
    `Salone del Mobile 2026 Booking`,
    `Ref: ${data.ref}`,
    `Date: ${data.date} at ${data.slot}`,
    `Guests: ${data.guests}`,
    data.role ? `Role: ${data.role}` : '',
    data.location ? `Location: ${data.location}` : '',
    data.stage ? `Project Stage: ${data.stage}` : '',
    data.message ? `\nMessage: ${data.message}` : '',
  ].filter(Boolean).join('\n')

  const doc = {
    doctype: 'Lead',
    first_name: firstName,
    last_name: lastName,
    lead_name: data.name.trim(),
    email_id: data.email,
    mobile_no: data.phone ?? '',
    company_name: data.company ?? '',
    job_title: data.role ?? '',
    source: 'Exhibition',
    status: 'Lead',
    lead_owner: ERPNEXT_USR,
    website: `Salone 2026 | Ref: ${data.ref} | ${data.date} ${data.slot} | ${data.guests} guests`,
    custom_booking_ref: data.ref,
    custom_salone_date: data.date,
    custom_salone_slot: data.slot,
    custom_salone_guests: data.guests,
    notes: [
      {
        doctype: 'CRM Note',
        note: noteText,
      },
    ],
  }

  const res = await fetch(`${ERPNEXT_URL}/api/method/frappe.client.insert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': session.cookie,
      'X-Frappe-CSRF-Token': session.csrf,
    },
    body: JSON.stringify({ doc }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`ERPNext Lead creation failed: ${res.status} — ${err.slice(0, 200)}`)
  }

  const result = await res.json()
  return result.message?.name ?? 'unknown'
}
