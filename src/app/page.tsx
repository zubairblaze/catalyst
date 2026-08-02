import Link from 'next/link';
import Image from 'next/image';
import { img } from '@/lib/images';
import { Hero } from '@/components/home/Hero';
import { TrustMarquee } from '@/components/home/TrustMarquee';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaSection } from '@/components/ui/CtaSection';
import { FaqAccordion } from '@/components/ui/Faq';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal';
import { Counter } from '@/components/motion/Counter';
import { JsonLd } from '@/components/JsonLd';
import { services } from '@/lib/services';
import { site, stats } from '@/lib/site';
import {
  IconArrowRight,
  IconRocket,
  IconShield,
  IconUsers,
  IconClock,
  IconSpark,
  IconDoc,
  IconCheck,
} from '@/components/Icons';

const values = [
  { icon: IconRocket, title: 'Fast, Frictionless Setup', text: 'Licences issued in days, not weeks. We move quickly while keeping every step compliant.' },
  { icon: IconUsers, title: 'A Dedicated Consultant', text: 'One expert who knows your business end to end — no call centres, no being passed around.' },
  { icon: IconShield, title: 'End-to-End Compliance', text: 'From KYC to corporate tax, VAT, AML and UBO — your obligations are handled and documented.' },
  { icon: IconSpark, title: 'Transparent Pricing', text: 'All-inclusive quotes with zero hidden fees. You always know exactly what you are paying for.' },
  { icon: IconDoc, title: 'One Partner, Every Service', text: 'Formation, banking, tax and residency under one roof — no juggling multiple providers.' },
  { icon: IconClock, title: 'Government Liaison & PRO', text: 'We handle the paperwork, approvals and renewals so you can focus on growing your business.' },
];

const process = [
  { step: '01', title: 'Free Consultation', text: 'We learn your goals and recommend the ideal structure, jurisdiction and licence.' },
  { step: '02', title: 'Structure & Licence', text: 'We reserve your name, secure approvals and issue your trade licence — fast.' },
  { step: '03', title: 'Visas & Banking', text: 'We process residency for you and your family and open your corporate bank account.' },
  { step: '04', title: 'Compliance & Growth', text: 'Ongoing bookkeeping, tax, VAT and PRO support keep you compliant as you scale.' },
];

const testimonials = [
  {
    quote:
      'The Catalyst set up our free zone company and opened our bank account in under three weeks. The transparency and speed were exactly what we needed.',
    name: 'Aisha R.',
    role: 'Founder, E-commerce Startup',
  },
  {
    quote:
      'Their team handled our corporate tax registration and monthly bookkeeping flawlessly. We finally have clean books and zero compliance stress.',
    name: 'Michael T.',
    role: 'Managing Director, Trading LLC',
  },
  {
    quote:
      'From company formation to my Golden Visa, everything was managed by one consultant. Genuinely the smoothest business experience I have had in the UAE.',
    name: 'Karan S.',
    role: 'Investor & Entrepreneur',
  },
];

const homeFaqs = [
  {
    q: 'What services does The Catalyst offer?',
    a: 'We provide end-to-end UAE corporate services: company formation (mainland, free zone and offshore), business banking consultancy, corporate tax and VAT, accounting and bookkeeping, and residency and citizenship by investment including the UAE Golden Visa.',
  },
  {
    q: 'How much does it cost to set up a company in the UAE?',
    a: 'Costs vary by jurisdiction, activity and the number of visas you need. Free zone packages can start from a few thousand dirhams, while mainland setups depend on the activity and office requirements. We provide a transparent, all-inclusive quote after a free consultation.',
  },
  {
    q: 'Can you help with both company formation and banking?',
    a: 'Yes. We are a single partner for the whole journey — formation, corporate bank account introductions, tax and bookkeeping, and residency. That coordination is exactly why clients choose us.',
  },
  {
    q: 'Do you serve businesses across all the Emirates?',
    a: 'Yes. We support business setup and corporate services in Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah and Al Ain, across mainland and every major free zone.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${site.url}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[websiteSchema, faqSchema]} />
      <Hero />
      <TrustMarquee />

      {/* Approach / intro band */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line shadow-card">
                <Image
                  src={img('home-hero-meeting')}
                  alt="A business setup consultation at The Catalyst"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-line bg-surface px-6 py-4 shadow-card sm:block">
                <p className="font-display text-3xl font-bold text-brand-600">One roof.</p>
                <p className="text-sm text-ink-muted">Every service, one partner.</p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="The catalyst behind ambitious UAE businesses"
              intro="From your first trade licence to banking, tax and a Golden Visa, we handle the complexity so you can focus on growth — with one dedicated consultant beside you the whole way."
            />
            <StaggerGroup className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Company formation, done in days',
                'Corporate bank account introductions',
                'Corporate tax, VAT & bookkeeping',
                'Golden Visa & global residency',
              ].map((point) => (
                <StaggerItem key={point}>
                  <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-sm font-medium text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {point}
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <Reveal delay={0.15}>
              <Link href="/about" className="btn-ghost mt-8">
                More about us
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Our Services"
              title="Everything your UAE business needs, under one roof"
              intro="Four connected practices that take you from incorporation to compliance and global mobility."
            />
            <Reveal delay={0.1}>
              <Link href="/services" className="btn-ghost shrink-0">
                View all services
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section bg-surface-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why The Catalyst"
            title="The catalyst behind ambitious UAE businesses"
            intro="We combine speed, transparency and genuine expertise to make setting up and running your business effortless."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="card h-full hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Stats band */}
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

      {/* Process */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="How It Works"
            title="From idea to fully operational in four steps"
            intro="A clear, guided path — with one dedicated consultant beside you the whole way."
          />
          <div className="relative mt-14">
            <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block" />
            <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((p) => (
                <StaggerItem key={p.step} className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-200 bg-surface font-display text-xl font-bold text-brand-600 shadow-soft">
                    {p.step}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">{p.text}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-surface-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow="Client Stories"
            title="Trusted by founders, investors and SMEs"
            intro="Real results from businesses we have helped launch, bank, and scale in the UAE."
          />
          <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="card flex h-full flex-col">
                  <div className="flex gap-1 text-accent-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IconSpark key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-ink-soft">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 font-display text-sm font-bold text-white">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{t.name}</span>
                      <span className="block text-xs text-ink-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Locations quick links */}
      <section className="section">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Across the UAE"
                title="Business setup in every Emirate"
                intro="Local expertise wherever you operate — from Dubai’s free zones to Abu Dhabi’s mainland and beyond."
              />
              <Reveal delay={0.1}>
                <div className="relative mt-8 hidden aspect-[16/10] overflow-hidden rounded-3xl border border-line shadow-card lg:block">
                  <Image
                    src={img('blog-business-setup')}
                    alt="Dubai business district skyline"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/40 to-transparent" />
                </div>
              </Reveal>
            </div>
            <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Al Ain'].map((city) => (
                <StaggerItem key={city}>
                  <Link
                    href={`/locations/business-setup-${city.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-4 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
                  >
                    {city}
                    <IconArrowRight className="h-4 w-4 text-brand-500" />
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-surface-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers to common questions"
            intro="Everything you need to know about working with The Catalyst."
          />
          <div className="mt-12">
            <FaqAccordion faqs={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
