import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog';
import { img } from '@/lib/images';
import { IconArrowUpRight, IconClock } from '../Icons';

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card ${
        featured ? 'lg:flex-row' : ''
      }`}
    >
      {/* Cover */}
      <div
        className={`relative flex items-end overflow-hidden bg-surface-dark p-6 ${
          featured ? 'lg:w-1/2 lg:min-h-[20rem]' : 'aspect-[16/10]'
        }`}
      >
        <Image
          src={img(post.image)}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={featured ? '(max-width: 1024px) 100vw, 560px' : '(max-width: 1024px) 100vw, 400px'}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-dark/85 via-surface-dark/25 to-surface-dark/10" />
        <span className="relative rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? 'lg:w-1/2 lg:justify-center' : ''}`}>
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1">
            <IconClock className="h-3.5 w-3.5" />
            {post.readMinutes} min read
          </span>
        </div>
        <h3
          className={`mt-3 text-balance font-display font-bold text-ink transition-colors group-hover:text-brand-700 ${
            featured ? 'text-2xl sm:text-3xl' : 'text-lg'
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Read article
          <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
