import type { Metadata } from 'next'
import SaloneHero from '@/components/salone/SaloneHero'
import SaloneExperience from '@/components/salone/SaloneExperience'
import SaloneBooking from '@/components/salone/SaloneBooking'
import SaloneCTA from '@/components/salone/SaloneCTA'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'LuxuryCine at Salone del Mobile.Milano 2026 — Private Screening Sessions',
  description:
    'Reserve your private 25-minute cinema session with LuxuryCine at Salone del Mobile.Milano 2026. April 21–26. A curated cinematic experience by invitation.',
  openGraph: {
    title: 'LuxuryCine at Salone del Mobile.Milano 2026',
    description: 'Reserve your private cinema session. April 21–26, Milan.',
    images: [{ url: '/assets/images/hero.jpg', width: 1920, height: 1080 }],
  },
}

export default function SalonePage() {
  return (
    <>
      <Navigation />
      <main>
        <SaloneHero />
        <SaloneExperience />
        <SaloneBooking />
        <SaloneCTA />
      </main>
    </>
  )
}
