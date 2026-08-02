'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { IconArrowRight, IconCheck, IconBuilding, IconBank, IconGlobe } from '../Icons';

const trustPoints = ['100% Ownership', '15+ Free Zones', 'Bank Account Support', 'End-to-End Compliance'];

const floatCards = [
  { icon: IconBuilding, label: 'Company Formed', sub: 'Free Zone · 4 days', pos: 'right-0 top-4', delay: 0.5 },
  { icon: IconBank, label: 'Account Approved', sub: 'Corporate banking', pos: 'right-10 top-40', delay: 0.7 },
  { icon: IconGlobe, label: 'Golden Visa', sub: '10-year residency', pos: 'right-2 bottom-8', delay: 0.9 },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-surface-dark text-white">
      {/* Full-bleed background image */}
      <Image
        src="/images/hero-dubai.webp"
        alt="Dubai skyline at sunset — Burj Khalifa and the business district"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Legibility overlays: left-dark for copy, top-dark for nav, bottom for the wave */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/95 via-surface-dark/70 to-surface-dark/25" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-surface-dark/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-dark to-transparent" />

      <div className="container-page relative grid w-full gap-12 py-28 pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-32">
        {/* Copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-300" />
            </span>
            UAE Business Setup &amp; Corporate Services
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-6 max-w-2xl text-balance font-display text-4xl font-extrabold leading-[1.05] drop-shadow-sm sm:text-5xl lg:text-6xl"
          >
            Your Trusted UAE Business Setup &amp;{' '}
            <span className="bg-gradient-to-r from-brand-300 via-sky-300 to-accent-400 bg-clip-text text-transparent">
              Corporate Services
            </span>{' '}
            Partner
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/80"
          >
            Company formation, business banking, corporate tax, bookkeeping, VAT compliance, Golden Visa and
            citizenship-by-investment — expertly handled, all under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/contact" className="btn-light">
              Start Your Business
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn border border-white/30 text-white hover:bg-white/10">
              Explore Services
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3"
          >
            {trustPoints.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-medium text-white/85">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/40 text-brand-100">
                  <IconCheck className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Floating stat cards */}
        <div className="relative hidden h-full min-h-[24rem] lg:block">
          {floatCards.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: c.delay }}
              className={`absolute ${c.pos} z-10 w-max`}
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-surface-dark/60 px-4 py-3 shadow-xl backdrop-blur-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/40 text-brand-100">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-white">{c.label}</span>
                  <span className="block text-xs text-white/70">{c.sub}</span>
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
          <motion.span
            animate={reduce ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-white/70"
          />
        </div>
      </motion.div>

      {/* wave divider into light section */}
      <div className="absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 80" className="block w-full text-surface" preserveAspectRatio="none" aria-hidden>
          <path fill="currentColor" d="M0 80h1440V40c-240 28-480 42-720 34C480 68 240 54 0 30z" />
        </svg>
      </div>
    </section>
  );
}
