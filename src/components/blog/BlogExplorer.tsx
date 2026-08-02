'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { posts, categories, type BlogCategory } from '@/lib/blog';
import { BlogCard } from './BlogCard';

const ALL = 'All' as const;

export function BlogExplorer() {
  const searchParams = useSearchParams();
  const initialCategorySlug = searchParams.get('category') ?? undefined;
  const initial =
    categories.find((c) => c.slug === initialCategorySlug)?.name ?? (ALL as BlogCategory | typeof ALL);
  const [active, setActive] = useState<BlogCategory | typeof ALL>(initial);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const catOk = active === ALL || p.category === active;
      const qOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.toLowerCase().includes(q));
      return catOk && qOk;
    });
  }, [active, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Pill label="All" active={active === ALL} onClick={() => setActive(ALL)} />
          {categories.map((c) => (
            <Pill key={c.slug} label={c.name} active={active === c.name} onClick={() => setActive(c.name)} />
          ))}
        </div>
        <div className="relative w-full lg:w-72">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="w-full rounded-full border border-line bg-surface-soft px-5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${active}-${query}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10"
        >
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-ink-muted">No articles match your search. Try another keyword.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
        active
          ? 'bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgb(var(--brand-600)/0.8)]'
          : 'border border-line bg-surface text-ink-soft hover:border-brand-200 hover:text-brand-700'
      }`}
    >
      {label}
    </button>
  );
}
