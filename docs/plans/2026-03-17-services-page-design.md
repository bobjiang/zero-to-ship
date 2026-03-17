# Services Page Design

## Overview

Add a `/services` page to 02Ship with two full-width sections: AI Adoption Consulting and AI Online Course.

## Page Structure

### Route & Navigation
- New file: `src/app/services/page.tsx`
- Add "Services" to Header nav (between "Courses" and "Blog")
- Add "Services" to Footer links
- Metadata: title, description, OG tags

### Hero
- Centered heading: "Our Services"
- 1-2 sentence subheading positioning 02Ship's offerings
- Standard `py-20` spacing

### Section 1: AI Adoption Consulting (white bg)
- Section heading + 1-2 sentence intro
- 3x2 icon card grid (responsive: 3col → 2col → 1col)
- 5 cards:
  1. Strategy & Roadmap — high-impact use cases, goals, step-by-step plan
  2. Risk & Governance — compliance, data privacy, ethical frameworks
  3. Change Management — upskilling, culture, human-centred AI
  4. Technology Selection — build vs buy, platform guidance
  5. Data Strategy — data maturity, quality, structure assessment
- Each card: emoji icon, bold title, 1-line description
- CTA: "Book a Consultation" → https://calendly.com/bobjiang (new tab)

### Section 2: AI Online Course (gray-50 bg)
- Section heading + 2-3 sentence description
- CTA: "Browse Courses" → https://www.ai4all.store/ (new tab)

## Implementation Steps

1. Create `src/app/services/page.tsx` with all sections
2. Update `src/components/layout/Header.tsx` — add Services nav link
3. Update `src/components/layout/Footer.tsx` — add Services link
4. Run lint, type-check, build to verify
