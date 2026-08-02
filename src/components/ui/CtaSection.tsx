import Link from 'next/link';
import { Reveal } from '../motion/Reveal';
import { site } from '@/lib/site';
import { IconArrowRight, IconPhone, IconCheck } from '../Icons';

export function CtaSection({
  title = 'Let’s build your UAE business, the right way',
  intro = 'One partner for company formation, banking, tax and residency. Transparent pricing, a dedicated consultant, and full compliance from day one.',
  points = ['Free 30-minute consultation', 'Transparent, all-inclusive quotes', 'Response within one business day'],
}: {
  title?: string;
  intro?: string;
  points?: string[];
}) {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-600 px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-accent-500/20 blur-2xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <h2 className="max-w-xl text-balance font-display text-3xl font-bold sm:text-4xl">{title}</h2>
                <p className="mt-4 max-w-lg text-pretty text-white/75">{intro}</p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm font-medium text-white/90">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                        <IconCheck className="h-3.5 w-3.5" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Link href="/contact" className="btn-light w-full justify-center sm:w-auto">
                  Book Free Consultation
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={site.phoneHref}
                  className="btn w-full justify-center border border-white/30 text-white hover:bg-white/10 sm:w-auto"
                >
                  <IconPhone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
