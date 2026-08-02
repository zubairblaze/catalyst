import Link from 'next/link';
import { LogoMark } from './Logo';
import { site } from '@/lib/site';
import { services } from '@/lib/services';
import { categories } from '@/lib/blog';
import { IconMail, IconPhone, IconPin, IconArrowUpRight } from './Icons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-surface-dark text-white/70">
      <div className="pointer-events-none absolute inset-0 bg-radial-brand opacity-70" />
      <div className="container-page relative">
        {/* CTA band */}
        <div className="grid gap-8 border-b border-white/10 py-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="max-w-xl font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to launch or scale your UAE business?
            </h2>
            <p className="mt-3 max-w-lg text-white/60">
              Book a free consultation and get a clear, transparent plan for your company formation, banking, tax and
              residency — all under one roof.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/contact" className="btn-light">
              Book Free Consultation
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
            <a href={site.whatsappHref} className="btn border border-white/25 text-white hover:bg-white/10">
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="The Catalyst — home">
              <LogoMark inverse className="h-11 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold tracking-tight text-white">THE CATALYST</span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-white/50">
                  UAE Corporate Services
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/55">{site.description}</p>
            <div className="mt-6 flex flex-col gap-2.5 text-sm">
              <a href={site.phoneHref} className="inline-flex items-center gap-2.5 hover:text-white">
                <IconPhone className="h-4 w-4 text-brand-300" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                <IconMail className="h-4 w-4 text-brand-300" /> {site.email}
              </a>
              <span className="inline-flex items-start gap-2.5">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <span>
                  {site.address.line1}, {site.address.poBox}, {site.address.city}, {site.address.country}
                </span>
              </span>
            </div>
          </div>

          <FooterCol title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.shortName}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/services">All Services</FooterLink>
            <FooterLink href="/blog">Blog & Insights</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol title="Insights">
            {categories.map((c) => (
              <FooterLink key={c.slug} href={`/blog?category=${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <div className="flex items-center gap-3">
              <SocialLink href={site.social.linkedin} label="LinkedIn">in</SocialLink>
              <SocialLink href={site.social.instagram} label="Instagram">ig</SocialLink>
              <SocialLink href={site.social.facebook} label="Facebook">fb</SocialLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white/80">{title}</h3>
      <ul className="flex flex-col gap-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-white/55 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[0.65rem] font-bold uppercase text-white/60 transition-colors hover:border-brand-300 hover:bg-brand-600 hover:text-white"
    >
      {children}
    </a>
  );
}
