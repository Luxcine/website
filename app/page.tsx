import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import BrandStatement from '@/components/BrandStatement'
import Pillars from '@/components/Pillars'
import FeaturedSpaces from '@/components/FeaturedSpaces'
import ExperienceJourney from '@/components/ExperienceJourney'
import TechPartners from '@/components/TechPartners'
import WhyLuxCine from '@/components/WhyLuxCine'
import SaloneBanner from '@/components/SaloneBanner'
import BrochureQR from '@/components/BrochureQR'
import Contact from '@/components/Contact'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <SaloneBanner />
      <Navigation />
      <main>
        <Hero />
        <BrandStatement />
        <Pillars />
        <FeaturedSpaces />
        <ExperienceJourney />
        <TechPartners />
        <WhyLuxCine />
        <BrochureQR />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
