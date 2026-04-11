'use client'

const nav = [
  { label: 'Philosophy', href: '#brand' },
  { label: 'Spaces', href: '#spaces' },
  { label: 'Process', href: '#process' },
  { label: 'Technology', href: '#technology' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  'Private Cinema Design',
  'Acoustic Engineering',
  'AV Integration',
  'Lighting Control',
  'Calibration Services',
]

export default function Footer() {
  return (
    <footer className="bg-[#080808]">
      <div className="h-px bg-[#E8E4DC]/6" />

      <div className="max-w-[1520px] mx-auto px-8 md:px-14 py-24 md:py-32">

        {/* Top row */}
        <div className="grid md:grid-cols-12 gap-y-16 gap-x-8 pb-20 border-b border-[#E8E4DC]/6">

          {/* Brand */}
          <div className="md:col-span-4">
            <div className="font-['Cormorant_Garamond'] text-[1.15rem] tracking-[0.18em] uppercase text-[#E8E4DC]/90 font-light mb-6">
              LuxuryCine
            </div>
            <p className="text-[13px] text-[#E8E4DC]/50 leading-loose font-light max-w-[220px]">
              Private cinema design for discerning clients, architects and developers.
            </p>
            <div className="mt-4 space-y-1.5 text-[12px] text-[#E8E4DC]/55 font-light">
              <p>Quinta do Lago — Algarve, Portugal</p>
              <p>Lisboa, Portugal</p>
              <a href="mailto:geral@luxurycine.com"
                className="block text-[#B09A72] hover:text-[#C9AE84] transition-colors duration-300 mt-2">
                geral@luxurycine.com
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3 md:col-start-6">
            <div className="text-[10px] tracking-[0.26em] uppercase text-[#9C8660]/70 mb-7">Navigation</div>
            <ul className="space-y-3.5">
              {nav.map(l => (
                <li key={l.label}>
                  <a href={l.href}
                    className="text-[13px] font-light text-[#E8E4DC]/50 hover:text-[#E8E4DC]/85 transition-colors duration-400">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3 md:col-start-10">
            <div className="text-[10px] tracking-[0.26em] uppercase text-[#9C8660]/70 mb-7">Services</div>
            <ul className="space-y-3.5">
              {services.map(s => (
                <li key={s}>
                  <span className="text-[13px] font-light text-[#E8E4DC]/50">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-[11px] tracking-[0.10em] text-[#E8E4DC]/35 font-light">
            © {new Date().getFullYear()} LuxuryCine. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="https://instagram.com/luxurycine"
              className="text-[11px] tracking-[0.18em] uppercase text-[#E8E4DC]/35 hover:text-[#9C8660]/80 transition-colors duration-400">
              Instagram
            </a>
            <a href="https://linkedin.com/company/luxurycine"
              className="text-[11px] tracking-[0.18em] uppercase text-[#E8E4DC]/35 hover:text-[#9C8660]/80 transition-colors duration-400">
              LinkedIn
            </a>
            <a href="#"
              className="text-[11px] tracking-[0.18em] uppercase text-[#E8E4DC]/35 hover:text-[#E8E4DC]/60 transition-colors duration-400">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
