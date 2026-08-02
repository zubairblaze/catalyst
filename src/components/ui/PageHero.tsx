import Link from 'next/link';
import { Reveal } from '../motion/Reveal';
import { IconArrowRight } from '../Icons';

export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-surface-dark pt-28 pb-16 text-white sm:pt-32 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl" />

      <div className="container-page relative">
        <Reveal immediate>
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <span className="text-white/30">/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        {eyebrow && (
          <Reveal immediate delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
              {eyebrow}
            </span>
          </Reveal>
        )}

        <Reveal immediate delay={0.1}>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>

        {intro && (
          <Reveal immediate delay={0.15}>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/70">{intro}</p>
          </Reveal>
        )}

        <Reveal immediate delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-light">
              Get a Free Consultation
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn border border-white/25 text-white hover:bg-white/10">
              Explore Services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
