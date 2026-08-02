import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/site';
import { IconPhone, IconMail, IconPin, IconClock, IconChat } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Contact Us | Book a Free UAE Business Consultation',
  description:
    'Get in touch with The Catalyst for expert UAE business setup, banking, tax and residency advice. Book a free consultation — we respond within one business day.',
  keywords: ['Contact The Catalyst', 'UAE Business Consultation', 'Business Setup UAE Contact'],
  alternates: { canonical: '/contact' },
};

const contactCards = [
  { icon: IconPhone, label: 'Call us', value: site.phone, href: site.phoneHref },
  { icon: IconChat, label: 'WhatsApp', value: site.whatsapp, href: site.whatsappHref },
  { icon: IconMail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
];

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact The Catalyst',
    url: `${site.url}/contact`,
    mainEntity: {
      '@type': 'ProfessionalService',
      name: site.legalName,
      telephone: site.phone,
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.line1,
        postOfficeBoxNumber: site.address.poBox,
        addressLocality: site.address.city,
        addressCountry: 'AE',
      },
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Contact Us"
        title="Let’s start the conversation"
        intro="Tell us about your business and goals. Book a free consultation and get a clear, transparent plan — usually within one business day."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Info column */}
          <div>
            <Reveal>
              <span className="eyebrow">Get in touch</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                We’re here to help you build in the UAE
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-ink-muted">
                Whether you’re forming your first company or expanding an established group, our consultants are ready
                to guide you through every option.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-3">
              {contactCards.map((c, i) => (
                <Reveal key={c.label} delay={0.05 * i}>
                  <a
                    href={c.href}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                      <c.icon className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        {c.label}
                      </span>
                      <span className="block font-display text-lg font-bold text-ink group-hover:text-brand-700">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface-soft p-5">
                  <IconPin className="h-5 w-5 text-brand-600" />
                  <p className="mt-3 text-sm font-semibold text-ink">Office</p>
                  <p className="text-sm text-ink-muted">
                    {site.address.line1}, {site.address.poBox}, {site.address.city}, {site.address.country}
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-surface-soft p-5">
                  <IconClock className="h-5 w-5 text-brand-600" />
                  <p className="mt-3 text-sm font-semibold text-ink">Working hours</p>
                  <p className="text-sm text-ink-muted">{site.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal direction="left" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
