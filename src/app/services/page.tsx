import type { Metadata } from 'next';
import { services } from '@/lib/services';
import { site } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaSection } from '@/components/ui/CtaSection';
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { IconCheck } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'UAE Corporate Services | Business Setup, Banking, Tax & Immigration',
  description:
    'Explore The Catalyst’s UAE corporate services — company formation, business banking consultancy, corporate tax & bookkeeping, and residency & citizenship by investment.',
  keywords: ['UAE Corporate Services', 'Business Setup UAE', 'Business Banking UAE', 'Corporate Tax UAE', 'Golden Visa UAE'],
  alternates: { canonical: '/services' },
};

const included = [
  'Mainland, Free Zone & Offshore formation',
  'Corporate bank account introductions',
  'Corporate tax & VAT registration and filing',
  'Monthly bookkeeping & financial reporting',
  'Investor, family & Golden Visa processing',
  'AML, UBO & ESR compliance',
];

export default function ServicesPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      url: `${site.url}/services/${s.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <PageHero
        eyebrow="Our Services"
        title="One partner for your entire UAE journey"
        intro="From incorporation to compliance, banking and global mobility — four connected practices designed to launch and grow your business without friction."
        crumbs={[{ label: 'Services' }]}
      />

      <section className="section">
        <div className="container-page">
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {services.map((service, i) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="section bg-surface-soft">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="All Under One Roof"
            title="Everything you need to launch and run a UAE company"
            intro="Stop juggling providers. The Catalyst coordinates every moving part so your setup is fast, compliant and stress-free."
          />
          <Reveal direction="left" delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-sm font-medium text-ink-soft"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
