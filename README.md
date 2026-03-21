# LuxuryCine — Website

Premium Next.js website for LuxuryCine private cinema brand.

## Tech Stack
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Framer Motion

## Run Locally

```bash
# Install dependencies (only first time)
npm install

# Development server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

## Project Structure

```
website/
├── app/
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Homepage (imports all sections)
│   └── globals.css       # Global styles + Tailwind
├── components/
│   ├── Navigation.tsx    # Sticky header, mobile menu
│   ├── Hero.tsx          # Full-screen hero with cinema image
│   ├── BrandStatement.tsx # Philosophy + stats
│   ├── Pillars.tsx       # 6 brand pillars grid
│   ├── FeaturedSpaces.tsx # Editorial image grid
│   ├── ExperienceJourney.tsx # 5-step process timeline
│   ├── TechPartners.tsx  # Technology partners
│   ├── WhyLuxCine.tsx    # Differentiation section
│   ├── Contact.tsx       # Enquiry form
│   ├── FinalCTA.tsx      # Emotional close
│   └── Footer.tsx        # Minimal footer
└── public/
    └── assets/
        ├── images/       # All cinema photography
        └── logos/        # LuxCine SVG logos
```

## Asset Map

| File | Section | Source |
|------|---------|--------|
| hero.jpg | Hero background | _51A7626.jpg (session) |
| cinema-01.jpg | Brand Statement | _51A7620.jpg |
| cinema-02.jpg | Featured Spaces (main) | _51A7632.jpg |
| cinema-03.jpg | Featured Spaces (lounge) | _51A7634.jpg |
| cinema-04.jpg | — | _51A7636.jpg |
| cinema-05.jpg | Process section | _51A7645.jpg |
| cinema-06.jpg | Why LuxCine | _51A7650.jpg |
| cinema-07.jpg | Final CTA | _51A7654.jpg |
| cinema-08.jpg | — | _51A7659.jpg |
| space-sala.jpg | Featured Spaces (media) | sal-01.JPG |
| space-lt20.jpg | — | lt20-01.JPG |
| space-palm.png | Featured Spaces (signature) | palm10-(4).PNG |

## Design Decisions

- **Dark luxury palette**: #0D0D0D base, #B8975A gold accents, #F5F0E8 cream text
- **Typography**: Cormorant Garamond (serif headlines) + Inter (body)
- **Framer Motion**: subtle fade/slide animations on scroll (`useInView`)
- **No placeholders**: every image is real photography from the LuxCine asset library
- **Editorial layout**: asymmetric grids, generous negative space, cinematic feel
- **Mobile-first**: all sections are fully responsive
