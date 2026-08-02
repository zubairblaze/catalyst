import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locations, getLocation } from '@/lib/locations';
import { services } from '@/lib/services';
import { site } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaSection } from '@/components/ui/CtaSection';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { iconMap, IconCheck, IconArrowRight } from '@/components/Icons';

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const loc = getLocation(params.slug);
  if (!loc) return {};
  return {
    title: loc.seoTitle,
    description: loc.metaDescription,
    keywords: [`Business Setup ${loc.city}`, `Company Formation ${loc.city}`, 'UAE Business Setup'],
    alternates: { canonical: `/locations/${loc.slug}` },
  };
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const loc = getLocation(params.slug);
  if (!loc) notFound();

  const others = locations.filter((l) => l.slug !== loc.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Business Setup in ${loc.city}`,
    description: loc.metaDescription,
    provider: { '@type': 'ProfessionalService', name: site.legalName, url: site.url },
    areaServed: { '@type': 'City', name: loc.city },
    url: `${site.url}/locations/${loc.slug}`,
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow={`${loc.emirate}, UAE`}
        title={loc.h1}
        intro={loc.intro}
        crumbs={[{ label: 'Locations' }, { label: loc.city }]}
      />

      {/* Highlights */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">Why {loc.city}</span>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
              Set up and scale your business in {loc.city}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-muted">{loc.intro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {loc.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-sm font-medium text-ink-soft"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="rounded-3xl border border-line bg-surface-soft p-7">
              <h3 className="font-display text-lg font-bold text-ink">Start in {loc.city} today</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Get a transparent quote for your {loc.city} company formation, visas and compliance.
              </p>
              <Link href="/contact" className="btn-primary mt-5 w-full">
                Get a Free Quote
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services in this city */}
      <section className="section bg-surface-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow="Full Service"
            title={`Corporate services in ${loc.city}`}
            intro="Everything you need beyond the licence — banking, tax and residency, coordinated by one team."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap] ?? iconMap.building;
              return (
                <StaggerItem key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-ink">{s.shortName}</h3>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-ink-muted">{s.tagline}</p>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Other locations */}
      <section className="pb-8 pt-16">
        <div className="container-page">
          <h2 className="mb-6 font-display text-xl font-bold text-ink">Business setup in other Emirates</h2>
          <div className="flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/locations/${o.slug}`}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink-soft transition-all hover:border-brand-200 hover:text-brand-700"
              >
                {o.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection title={`Ready to launch in ${loc.city}?`} />
    </>
  );
}
