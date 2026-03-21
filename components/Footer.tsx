import Image from 'next/image'

const links = {
  Navigation: [
    { label: 'Philosophy', href: '#brand' },
    { label: 'Featured Spaces', href: '#spaces' },
    { label: 'Our Process', href: '#process' },
    { label: 'Technology', href: '#technology' },
    { label: 'Contact', href: '#contact' },
  ],
  Services: [
    { label: 'Private Cinema Design', href: '#contact' },
    { label: 'Acoustic Engineering', href: '#contact' },
    { label: 'AV Integration', href: '#contact' },
    { label: 'Lighting Control', href: '#contact' },
    { label: 'Calibration Services', href: '#contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#F5F0E8]/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-20">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/assets/logos/luxcine-white.svg"
              alt="LuxuryCine"
              width={120}
              height={50}
              className="mb-6 opacity-80"
            />
            <p className="text-[13px] font-light text-[#F5F0E8]/35 leading-relaxed max-w-xs">
              Private cinema design and integration for discerning clients,
              architects and luxury developers. Algarve, Portugal — London, UK.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://instagram.com/luxurycine"
                className="text-[10px] tracking-[0.2em] uppercase text-[#F5F0E8]/30 hover:text-[#B8975A] transition-colors duration-300"
              >
                Instagram
              </a>
              <span className="text-[#F5F0E8]/15">·</span>
              <a
                href="https://linkedin.com/company/luxurycine"
                className="text-[10px] tracking-[0.2em] uppercase text-[#F5F0E8]/30 hover:text-[#B8975A] transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-[9px] tracking-[0.3em] uppercase text-[#B8975A] mb-6">
                {category}
              </div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[12px] text-[#F5F0E8]/35 hover:text-[#F5F0E8]/70 transition-colors duration-300 font-light"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#F5F0E8]/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#F5F0E8]/20 tracking-wide">
            © {new Date().getFullYear()} LuxuryCine. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-[#F5F0E8]/20 hover:text-[#F5F0E8]/40 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-[#F5F0E8]/20 hover:text-[#F5F0E8]/40 transition-colors duration-300">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
