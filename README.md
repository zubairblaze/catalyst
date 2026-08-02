# The Catalyst — thecatalystfze.com

Marketing website for **The Catalyst FZE**, a UAE corporate services firm offering business
setup, business banking consultancy, corporate tax & bookkeeping, and residency & citizenship
by investment.

This is **Phase 1** — the public-facing website. Phase 2 will add an admin panel to manage
services and blog posts.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a CSS-variable design system
- **Framer Motion** for scroll and micro-interaction animations
- Fully static/SSG where possible for **page-speed and SEO**

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Key features

### Colour scheme switcher
A floating switcher (bottom-right) lets the client preview the site in **five palettes** so they
can pick the preferred direction:

| Scheme | Description |
| --- | --- |
| **Royal Blue** | Signature — matches the logo (default) |
| **Midnight Gold** | Navy & gold, luxury corporate |
| **Emerald Wealth** | Deep green & gold, finance |
| **Azure Coral** | Bright & energetic |
| **Graphite Electric** | Slate & electric blue, minimal |

Schemes are driven by CSS variables toggled via `data-scheme` on `<html>`, the choice is saved to
`localStorage`, and an inline pre-paint script prevents any flash of the wrong theme.
Implementation: `src/components/ThemeSwitcher.tsx` + `src/app/globals.css`.

### Pages
- **Home** — hero, services, why-us, animated stats, process, testimonials, FAQ, CTA
- **Services** overview + 4 detailed service pages (`/services/[slug]`)
- **About**, **Contact** (interactive enquiry form)
- **Blog** with category filtering + search, and single-post pages (`/blog/[slug]`)
- **Local SEO** location pages (`/locations/[slug]`) for Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Al Ain
- **Privacy Policy**, **Terms**, custom **404**

### SEO
- Per-page `title` / `meta description` / keywords following the content plan
- **JSON-LD schema**: Organization, WebSite, Service, BlogPosting, FAQPage, BreadcrumbList
- `sitemap.xml` and `robots.txt` generated automatically
- Semantic headings (single H1 per page), Open Graph + Twitter metadata
- Mobile-first, responsive, `prefers-reduced-motion` respected

## Content model (edit these to update the site)

- `src/lib/site.ts` — company details, nav, contact info, stats
- `src/lib/services.ts` — the four services (SEO, H2 sections, FAQs)
- `src/lib/blog.ts` — blog posts & categories
- `src/lib/locations.ts` — local SEO city pages

> **Phase 2 note:** these data files are the seams a future admin panel/CMS will write to, so new
> services and blog posts can be added without code changes.

## Contact form → info@thecatalystfze.com

The enquiry form posts to the `/api/contact` route, which emails **info@thecatalystfze.com**
(override with `CONTACT_TO`). Configure SMTP via environment variables — see `.env.example`
(copy to `.env.local` or set them in your host). Use the mailbox credentials from your cPanel /
email host:

```
CONTACT_TO=info@thecatalystfze.com
SMTP_HOST=mail.thecatalystfze.com
SMTP_PORT=465
SMTP_USER=info@thecatalystfze.com
SMTP_PASS=…
```

If SMTP isn't configured (or the site is hosted as a static export with no API), the form
gracefully falls back to opening the visitor's email app addressed to `info@thecatalystfze.com`,
so enquiries still reach you.

## Brand & imagery

- **Logo/favicon**: official brand assets in `public/brand/` (blue insignia SVG). App icons are
  generated in `src/app/icon.png` / `apple-icon.png`.
- **Brand colour**: official `#0641b4` (the default "Catalyst Blue" scheme). Four alternate
  palettes remain available via the colour-scheme switcher.
- **Hero**: full-viewport Dubai skyline (`public/images/hero-dubai.webp`).
- Service/blog imagery is generated with Higgsfield and served from its CDN by default; run
  `bash scripts/download-images.sh` and set `USE_LOCAL = true` in `src/lib/images.ts` to self-host.

## Before go-live
Confirm the contact details in `src/lib/site.ts`, set the SMTP env vars above, and (optionally)
self-host the CDN images.
