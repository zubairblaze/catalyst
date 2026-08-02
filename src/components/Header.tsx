'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './Logo';
import { nav, site } from '@/lib/site';
import { IconChevron, IconArrowRight } from './Icons';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Over the dark hero (top of page) we use light nav; once scrolled the bar
  // turns to a light glass panel, so nav switches to dark for contrast.
  const solid = scrolled || mobileOpen;

  const linkBase = 'rounded-full px-4 py-2 text-sm font-medium transition-colors';
  const linkColor = (active: boolean) =>
    solid
      ? active
        ? 'text-brand-700'
        : 'text-ink-soft hover:text-brand-700'
      : active
        ? 'text-white'
        : 'text-white/80 hover:text-white';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'glass border-b border-line shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between lg:h-20">
        <Logo inverse={!solid} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link href={item.href} className={`flex items-center gap-1 ${linkBase} ${linkColor(isActive(item.href))}`}>
                  {item.label}
                  <IconChevron className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </Link>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-card">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
                          >
                            {child.label}
                            <IconArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={`${linkBase} ${linkColor(isActive(item.href))}`}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`hidden text-sm lg:inline-flex ${solid ? 'btn-primary' : 'btn-light'}`}
          >
            Free Consultation
            <IconArrowRight className="h-4 w-4" />
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
              solid ? 'border-line bg-surface/80' : 'border-white/25 bg-white/10'
            }`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span
                className={`h-0.5 w-5 transition-all ${solid ? 'bg-ink' : 'bg-white'} ${
                  mobileOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span className={`h-0.5 w-5 transition-all ${solid ? 'bg-ink' : 'bg-white'} ${mobileOpen ? 'opacity-0' : ''}`} />
              <span
                className={`h-0.5 w-5 transition-all ${solid ? 'bg-ink' : 'bg-white'} ${
                  mobileOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-5">
              {nav.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                      isActive(item.href) ? 'bg-brand-50 text-brand-700' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-line pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:text-brand-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/contact" className="btn-primary mt-3 w-full">
                Free Consultation
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <a href={site.phoneHref} className="btn-ghost mt-1 w-full">
                Call {site.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
