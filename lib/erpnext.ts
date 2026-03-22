// ERPNext CRM integration — creates a Lead for each confirmed Salone booking
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
  // Step 1: login
  const loginRes = await fetch(`${ERPNEXT_URL}/api/method/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `usr=${encodeURIComponent(ERPNEXT_USR)}&pwd=${encodeURIComponent(ERPNEXT_PWD)}`,
  })

  if (!loginRes.ok) throw new Error(`ERPNext login failed: ${loginRes.status}`)

  const cookie = loginRes.headers.get('set-cookie') ?? ''

  // Step 2: get CSRF token from homepage HTML
  const homeRes = await fetch(ERPNEXT_URL, {
    headers: { Cookie: cookie },
  })
  const html = await homeRes.text()
  const csrfMatch = html.match(/csrf_token\s*=\s*"([^"]+)"/)
  const csrf = csrfMatch?.[1] ?? ''

  if (!csrf) throw new Error('ERPNext: could not extract CSRF token')

  return { cookie, csrf }
}

export async function createSaloneLead(data: SaloneLeadData): Promise<string> {
  const session = await getSession()

  // Split name into first/last for ERPNext Lead
  const nameParts = data.name.trim().split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ') || '-'

  const doc = {
    doctype: 'Lead',
    first_name: firstName,
    last_name: lastName,
    lead_name: data.name,
    email_id: data.email,
    mobile_no: data.phone ?? '',
    company_name: data.company ?? '',
    status: 'Open',
    lead_source: 'Exhibition',
    country: 'Portugal',
    // Custom fields
    custom_brand: 'LuxuryCine',
    custom_booking_ref: data.ref,
    custom_salone_date: data.date,
    custom_salone_slot: data.slot,
    custom_salone_guests: data.guests,
    custom_project_stage: data.stage ?? '',
    notes: [
      {
        note: [
          `Salone del Mobile 2026 Booking`,
          `Ref: ${data.ref}`,
          `Date: ${data.date} at ${data.slot}`,
          `Guests: ${data.guests}`,
          data.role ? `Role: ${data.role}` : '',
          data.location ? `Location: ${data.location}` : '',
          data.stage ? `Project Stage: ${data.stage}` : '',
          data.message ? `\nMessage: ${data.message}` : '',
        ].filter(Boolean).join('\n'),
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
