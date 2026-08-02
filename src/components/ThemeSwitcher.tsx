'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconPalette, IconCheck } from './Icons';

type Scheme = {
  id: string;
  name: string;
  desc: string;
  brand: string;
  accent: string;
  ink: string;
};

export const schemes: Scheme[] = [
  { id: 'royal', name: 'Catalyst Blue', desc: 'Official brand — #0641b4', brand: '#0641b4', accent: '#0ea5e9', ink: '#0f172a' },
  { id: 'midnight', name: 'Midnight Gold', desc: 'Navy & gold — luxury corporate', brand: '#1e3a80', accent: '#d6a84a', ink: '#0f172a' },
  { id: 'emerald', name: 'Emerald Wealth', desc: 'Deep green & gold — finance', brand: '#0a7854', accent: '#d6a84a', ink: '#0f172a' },
  { id: 'azure', name: 'Azure Coral', desc: 'Bright & energetic', brand: '#037ac0', accent: '#fb714c', ink: '#0f172a' },
  { id: 'graphite', name: 'Graphite Electric', desc: 'Slate & electric blue — minimal', brand: '#334a6c', accent: '#2d80f5', ink: '#0f172a' },
];

const STORAGE_KEY = 'catalyst-scheme';

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('royal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setActive(saved);
    else setActive(document.documentElement.getAttribute('data-scheme') || 'royal');
  }, []);

  const apply = (id: string) => {
    setActive(id);
    document.documentElement.setAttribute('data-scheme', id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* storage unavailable — non-fatal */
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60] print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 w-[19rem] overflow-hidden rounded-3xl border border-line bg-surface p-4 shadow-card"
            role="dialog"
            aria-label="Colour scheme switcher"
          >
            <div className="mb-1 flex items-center justify-between">
              <p className="font-display text-sm font-bold text-ink">Colour scheme</p>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-brand-700">
                Preview
              </span>
            </div>
            <p className="mb-3 text-xs text-ink-muted">Pick a palette to preview the site live. Your choice is saved.</p>
            <ul className="flex flex-col gap-1.5">
              {schemes.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => apply(s.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-200 ${
                        isActive
                          ? 'border-brand-300 bg-brand-50'
                          : 'border-transparent hover:border-line hover:bg-surface-soft'
                      }`}
                      aria-pressed={isActive}
                    >
                      <span className="flex shrink-0 items-center -space-x-1.5">
                        <span className="h-6 w-6 rounded-full ring-2 ring-surface" style={{ background: s.ink }} />
                        <span className="h-6 w-6 rounded-full ring-2 ring-surface" style={{ background: s.brand }} />
                        <span className="h-6 w-6 rounded-full ring-2 ring-surface" style={{ background: s.accent }} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-ink">{s.name}</span>
                        <span className="block text-[0.7rem] text-ink-muted">{s.desc}</span>
                      </span>
                      {isActive && <IconCheck className="h-4 w-4 shrink-0 text-brand-600" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-[0_12px_30px_-8px_rgb(var(--brand-600)/0.8)] transition-colors hover:bg-brand-700"
        aria-label="Open colour scheme switcher"
        aria-expanded={open}
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.3 }}>
          <IconPalette className="h-6 w-6" />
        </motion.span>
        <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-brand-500/40 [animation-duration:2.5s] group-hover:hidden" />
      </motion.button>
    </div>
  );
}

/** Inline, render-blocking script to set the saved scheme before paint (no FOUC). */
export function ThemeScript() {
  const code = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}');if(s){document.documentElement.setAttribute('data-scheme',s);}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
