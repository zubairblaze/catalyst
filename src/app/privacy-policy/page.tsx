import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How The Catalyst collects, uses and protects your personal information.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbs={[{ label: 'Privacy Policy' }]} />
      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="flex flex-col gap-5 text-pretty leading-relaxed text-ink-soft">
            <p className="text-sm text-ink-muted">Last updated: January 2026</p>
            <p>
              {site.legalName} (“we”, “us”, “our”) is committed to protecting your privacy. This policy explains what
              information we collect, how we use it, and the choices you have.
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Information we collect</h2>
            <p>
              We collect information you provide directly — such as your name, email, phone number and enquiry details
              when you contact us or request a consultation. We may also collect standard analytics data about how you
              use our website.
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">How we use your information</h2>
            <p>
              We use your information to respond to enquiries, provide our services, improve our website, and communicate
              relevant updates. We do not sell your personal information to third parties.
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Data security</h2>
            <p>
              We apply appropriate technical and organisational measures to protect your personal data against
              unauthorised access, loss or misuse.
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time by contacting us at{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">
                {site.email}
              </a>
              .
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Contact</h2>
            <p>
              For any questions about this policy, please contact us at{' '}
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
