import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Brochure — LuxuryCine',
  description: 'Download the LuxuryCine brochure.',
}

export default function BrochurePage() {
  redirect('/brochure.pdf')
}
