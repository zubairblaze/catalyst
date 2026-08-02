import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaSection } from '@/components/ui/CtaSection';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal';
import { Counter } from '@/components/motion/Counter';
import { stats, site } from '@/lib/site';
import { IconShield, IconSpark, IconUsers, IconRocket, IconCheck } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'About Us | UAE Business Setup & Corporate Services Consultants',
  description:
    'Learn about The Catalyst — a UAE corporate services firm helping founders, SMEs and investors with company formation, banking, tax and residency, all under one roof.',
  keywords: ['UAE Business Consultants', 'About The Catalyst', 'Corporate Services UAE'],
  alternates: { canonical: '/about' },
};

const principles = [
  { icon: IconRocket, title: 'Momentum', text: 'We remove friction so you can move fast. Speed is a service, not a promise.' },
  { icon: IconShield, title: 'Integrity', text: 'Transparent pricing and honest advice — even when it means telling you what you don’t want to hear.' },
  { icon: IconUsers, title: 'Partnership', text: 'One dedicated consultant who owns your outcome from first call to full compliance.' },
  { icon: IconSpark, title: 'Excellence', text: 'Deep, current expertise across formation, banking, tax and immigration.' },
];

const journey = [
  { title: 'Understand', text: 'We start by understanding your goals, activity and growth plans in a free consultation.' },
  { title: 'Design', text: 'We design the optimal structure — jurisdiction, licence, visas and tax position.' },
  { title: 'Execute', text: 'We handle licensing, banking, visas and registrations end to end.' },
  { title: 'Support', text: 'We stay on as your compliance and finance partner as you scale.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="The catalyst behind your UAE success"
        intro="We are a corporate services firm built around a simple idea: setting up and running a business in the UAE should be fast, transparent and genuinely supported."
        crumbs={[{ label: 'About' }]}
      />

      {/* Feature image */}
      <section className="relative -mt-10 sm:-mt-14 lg:-mt-20">
        <div className="container-page">
          <Reveal immediate>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-line shadow-card sm:aspect-[21/9]">
              <Image
                src="/images/financial-consultancy.webp"
                alt="The Catalyst — financial and corporate consultancy in the UAE"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/45 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
              Corporate services, reimagined for founders
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-pretty text-lg leading-relaxed text-ink-muted">
              <p>
                Too many entrepreneurs arrive in the UAE full of ambition, only to get lost in a maze of licences,
                jurisdictions, bank rejections and compliance deadlines. We founded The Catalyst to change that.
              </p>
              <p>
                We bring company formation, business banking, corporate tax, bookkeeping and residency together under
                one roof — coordinated by a dedicated consultant who knows your business inside out. No hand-offs, no
                hidden fees, no chasing.
              </p>
              <p>
                From free zone startups to established groups seeking Golden Visas and global mobility, we help
                ambitious people build, bank and grow in the UAE with confidence.
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="rounded-3xl border border-line bg-surface-soft p-8">
              <h3 className="font-display text-lg font-bold text-ink">What sets us apart</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {[
                  'Every service under one roof',
                  'A dedicated consultant, not a call centre',
                  'Transparent, all-inclusive pricing',
                  'Banking relationships that get approvals',
                  'Full ongoing compliance support',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-medium text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-surface-dark py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-radial-brand opacity-80" />
        <div className="container-page relative">
          <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <Counter value={s.value} className="font-display text-4xl font-extrabold text-white sm:text-5xl" />
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/60">{s.label}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Principles */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Values"
            title="The principles that guide every engagement"
            intro="More than a service provider — a partner invested in your success."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <StaggerItem key={p.title}>
                <div className="card h-full text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <p.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">{p.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Journey */}
      <section className="section bg-surface-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow="How We Work"
            title="A partnership in four movements"
            intro="A clear, guided process that turns UAE complexity into momentum."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((j, i) => (
              <StaggerItem key={j.title}>
                <div className="relative rounded-3xl border border-line bg-surface p-7">
                  <span className="font-display text-5xl font-bold text-surface-strong">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink">{j.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">{j.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CtaSection
        title={`Partner with ${site.name}`}
        intro="Let’s turn your UAE ambitions into a fully operational, compliant business — with one team beside you the whole way."
      />
    </>
  );
}
