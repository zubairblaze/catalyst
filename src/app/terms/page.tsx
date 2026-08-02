import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of The Catalyst website and services.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" crumbs={[{ label: 'Terms of Service' }]} />
      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="flex flex-col gap-5 text-pretty leading-relaxed text-ink-soft">
            <p className="text-sm text-ink-muted">Last updated: January 2026</p>
            <p>
              These Terms of Service govern your use of the {site.legalName} website. By accessing or using our website,
              you agree to be bound by these terms.
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Use of our website</h2>
            <p>
              The content on this website is provided for general information only and does not constitute legal, tax or
              financial advice. You should seek professional advice tailored to your circumstances before making
              decisions.
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Services</h2>
            <p>
              Any engagement for our services is subject to a separate service agreement. Fees, scope and timelines are
              confirmed in writing before work begins.
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Intellectual property</h2>
            <p>
              All content, branding and materials on this website are the property of {site.legalName} and may not be
              reproduced without permission.
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Limitation of liability</h2>
            <p>
              We are not liable for any loss arising from reliance on information published on this website. Our
              liability in connection with our services is governed by the applicable service agreement.
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Contact</h2>
            <p>
              Questions about these terms can be sent to{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
