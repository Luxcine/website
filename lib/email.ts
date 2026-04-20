import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM = process.env.EMAIL_FROM ?? 'LuxCine <bookings@luxurycine.com>'

const DAY_LABELS: Record<string, string> = {
  '2026-04-21': 'Tuesday 21 April',
  '2026-04-22': 'Wednesday 22 April',
  '2026-04-23': 'Thursday 23 April',
  '2026-04-24': 'Friday 24 April',
  '2026-04-25': 'Saturday 25 April',
  '2026-04-26': 'Sunday 26 April',
}

export interface BookingEmailData {
  ref: string
  name: string
  email: string
  date: string
  slot: string
  guests: number
}

export async function sendBookingConfirmation(data: BookingEmailData): Promise<void> {
  const dateLabel = DAY_LABELS[data.date] ?? data.date
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(data.ref)}&margin=8&ecc=H`
  const brochureUrl = 'https://www.luxurycine.com/brochure'
  const brochureQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(brochureUrl)}&margin=8&ecc=H`

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Booking Confirmed · LuxCine</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;font-family:Georgia,'Times New Roman',serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#080808;padding:48px 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

          <!-- Brand header -->
          <tr>
            <td style="padding-bottom:36px;border-bottom:1px solid rgba(232,228,220,0.08);">
              <img src="https://luxcine.vercel.app/assets/logos/luxcine-white.png" width="180" height="75" alt="LuxCine" style="display:block;border:0;outline:none;" />
              <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:0.32em;text-transform:uppercase;color:#9C8660;">Salone del Mobile &middot; Milano 2026</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:40px 0 32px;">
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:0.32em;text-transform:uppercase;color:#9C8660;">Booking Confirmed</p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:300;color:rgba(232,228,220,0.88);line-height:1.2;">${escHtml(data.name)}</h1>
              <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(232,228,220,0.40);line-height:1.6;">Your visit to our private screening experience<br>at Salone del Mobile has been confirmed.</p>
            </td>
          </tr>

          <!-- Details card -->
          <tr>
            <td style="background-color:rgba(255,255,255,0.02);border:1px solid rgba(156,134,96,0.22);padding:32px;">
              <!-- Ref + QR row -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td valign="top">
                    <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:0.32em;text-transform:uppercase;color:rgba(232,228,220,0.28);">Reference</p>
                    <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:22px;letter-spacing:0.14em;color:#9C8660;">${escHtml(data.ref)}</p>
                    <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:rgba(232,228,220,0.35);line-height:1.5;">Present this code or QR at the entrance</p>
                  </td>
                  <td valign="top" align="right" width="100">
                    <img src="${qrUrl}" width="100" height="100" alt="${escHtml(data.ref)}" style="display:block;border:1px solid rgba(232,228,220,0.10);" />
                  </td>
                </tr>
              </table>

              <!-- Date / Time / Guests -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid rgba(232,228,220,0.08);padding-top:24px;">
                <tr>
                  <td width="34%" style="padding-right:12px;">
                    <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(232,228,220,0.22);">Date</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(232,228,220,0.72);">${escHtml(dateLabel)}</p>
                  </td>
                  <td width="33%" style="padding:0 12px;">
                    <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(232,228,220,0.22);">Time</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(232,228,220,0.72);">${escHtml(data.slot)}</p>
                  </td>
                  <td width="33%" style="padding-left:12px;">
                    <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(232,228,220,0.22);">Guests</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(232,228,220,0.72);">${data.guests}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Wallet buttons -->
          <tr>
            <td style="padding:24px 0 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td width="48%" style="padding-right:6px;">
                    <a href="https://luxcine.vercel.app/api/wallet/apple?ref=${escHtml(data.ref)}" style="display:block;background-color:#000000;border:1px solid rgba(255,255,255,0.15);padding:12px 10px;text-align:center;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.12em;color:#ffffff;">
                      &#63743; &nbsp;Apple Wallet
                    </a>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="padding-left:6px;">
                    <a href="https://luxcine.vercel.app/api/wallet/google?ref=${escHtml(data.ref)}" style="display:block;background-color:#1a73e8;padding:12px 10px;text-align:center;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.12em;color:#ffffff;">
                      &#11044; &nbsp;Google Wallet
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Brochure -->
          <tr>
            <td style="padding:28px 0 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:rgba(255,255,255,0.02);border:1px solid rgba(156,134,96,0.22);">
                <tr>
                  <td valign="middle" style="padding:28px 28px 28px 32px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:0.32em;text-transform:uppercase;color:#9C8660;">Brochure</p>
                    <p style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:300;color:rgba(232,228,220,0.88);line-height:1.25;">The full LuxuryCine story</p>
                    <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(232,228,220,0.45);line-height:1.6;">Spaces, partners, process &mdash;<br>a curated publication.</p>
                    <a href="${brochureUrl}" style="display:inline-block;background-color:#B8975A;padding:12px 22px;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#0D0D0D;font-weight:600;">Download Brochure</a>
                  </td>
                  <td valign="middle" align="right" width="150" style="padding:20px 24px 20px 0;">
                    <img src="${brochureQrUrl}" width="130" height="130" alt="Scan to download LuxuryCine brochure" style="display:block;border:6px solid #F5F0E8;background-color:#F5F0E8;" />
                    <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:0.22em;text-transform:uppercase;text-align:center;color:rgba(232,228,220,0.35);">Scan to download</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Venue -->
          <tr>
            <td style="padding:28px 0;border-bottom:1px solid rgba(232,228,220,0.06);">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:0.32em;text-transform:uppercase;color:rgba(232,228,220,0.20);">Venue</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(232,228,220,0.50);line-height:1.65;">
                Salone del Mobile &mdash; Milano<br>
                22 &ndash; 27 April 2026
              </p>
            </td>
          </tr>

          <!-- Footer note -->
          <tr>
            <td style="padding:28px 0 0;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:rgba(232,228,220,0.25);line-height:1.75;">
                If you have any questions, reply to this email.<br>
                We look forward to welcoming you.
              </p>
            </td>
          </tr>

          <!-- Brand footer -->
          <tr>
            <td style="padding-top:40px;border-top:1px solid rgba(232,228,220,0.06);margin-top:8px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(232,228,220,0.12);">
                LuxCine &nbsp;&middot;&nbsp; Salone del Mobile &nbsp;&middot;&nbsp; Milano 2026
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: `Booking Confirmed · ${data.ref} · LuxCine`,
    html,
  })
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
