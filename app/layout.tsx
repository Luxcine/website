import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://luxurycine.com'),
  title: 'LuxuryCine — Private Cinema Design & Integration',
  description:
    'LuxuryCine designs and engineers bespoke private cinema experiences for discerning clients, architects and luxury developers. Acoustic precision. Architectural integration. Invisible technology.',
  keywords: [
    'private cinema',
    'home cinema design',
    'luxury cinema room',
    'bespoke cinema',
    'acoustic design',
    'cinema integration',
    'Barco projector',
    'Trinnov audio',
    'JBL Synthesis',
    'Lutron lighting',
    'luxury AV',
  ],
  openGraph: {
    title: 'LuxuryCine — Private Cinema Design & Integration',
    description:
      'Bespoke private cinema experiences. Acoustic precision. Architectural integration.',
    url: 'https://luxurycine.com',
    siteName: 'LuxuryCine',
    images: [
      {
        url: '/assets/images/hero.jpg',
        width: 1920,
        height: 1080,
        alt: 'LuxuryCine — Private Cinema',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxuryCine — Private Cinema Design & Integration',
    description: 'Bespoke private cinema experiences. Acoustic precision. Architectural integration.',
    images: ['/assets/images/hero.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0D0D0D] text-[#F5F0E8] antialiased">{children}</body>
    </html>
  )
}
