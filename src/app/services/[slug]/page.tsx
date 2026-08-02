import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { services, getService } from '@/lib/services';
import { img, type ImageKey } from '@/lib/images';
import { site } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqAccordion } from '@/components/ui/Faq';
import { CtaSection } from '@/components/ui/CtaSection';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { iconMap, IconCheck, IconArrowRight } from '@/components/Icons';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  const url = `/services/${service.slug}`;
  return {
    title: service.seoTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: service.seoTitle,
      description: service.metaDescription,
      url,
      type: 'website',
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.tagline,
    description: service.metaDescription,
    provider: { '@type': 'ProfessionalService', name: site.legalName, url: site.url },
    areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
    url: `${site.url}/services/${service.slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.url}/services` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${site.url}/services/${service.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={[serviceSchema, faqSchema, breadcrumbSchema]} />
      <PageHero
        eyebrow={service.tagline}
        title={service.h1}
        intro={service.heroLead}
        crumbs={[{ label: 'Services', href: '/services' }, { label: service.shortName }]}
      />

      {/* Feature image */}
      <section className="relative -mt-10 sm:-mt-14 lg:-mt-20">
        <div className="container-page">
          <Reveal immediate>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-line shadow-card sm:aspect-[21/9]">
              <Image
                src={img(`service-${service.slug}` as ImageKey)}
                alt={`${service.name} in the UAE`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/50 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview + why choose us */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">Overview</span>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
              {service.name} — done right, end to end
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-muted">{service.overview}</p>
          </Reveal>

          {service.whyChooseUs && (
            <Reveal direction="left" delay={0.1}>
              <div className="rounded-3xl border border-line bg-surface-soft p-7">
                <h3 className="font-display text-lg font-bold text-ink">Why choose The Catalyst</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {service.whyChooseUs.map((w) => (
                    <li key={w} className="flex items-start gap-3 text-sm font-medium text-ink-soft">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                        <IconCheck className="h-3 w-3" />
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary mt-6 w-full">
                  Talk to a consultant
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Sections / what's included */}
      <section className="section bg-surface-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow="What’s Included"
            title={`Our ${service.shortName} services`}
            intro="A complete scope, tailored to your business — nothing left for you to chase."
          />
          <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-2">
            {service.sections.map((sec) => (
              <StaggerItem key={sec.title}>
                <div className="card h-full">
                  <h3 className="font-display text-xl font-bold text-ink">{sec.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">{sec.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {sec.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft"
                      >
                        <IconCheck className="h-3 w-3 text-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="FAQ" title={`${service.shortName} — your questions answered`} />
          <div className="mt-12">
            <FaqAccordion faqs={service.faqs} />
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="pb-8">
        <div className="container-page">
          <h2 className="mb-8 font-display text-2xl font-bold text-ink">Explore our other services</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((o) => {
              const Icon = iconMap[o.icon as keyof typeof iconMap] ?? iconMap.building;
              return (
                <Link
                  key={o.slug}
                  href={`/services/${o.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-ink">{o.shortName}</span>
                    <span className="block text-xs text-ink-muted">{o.tagline}</span>
                  </span>
                  <IconArrowRight className="h-4 w-4 text-brand-400 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
