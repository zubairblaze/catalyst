import Link from 'next/link';
import type { Service } from '@/lib/services';
import { iconMap } from '../Icons';
import { IconArrowRight } from '../Icons';

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] ?? iconMap.building;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-[0_10px_24px_-10px_rgb(var(--brand-600)/0.8)] transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-7 w-7" />
        </span>
        {typeof index === 'number' && (
          <span className="font-display text-4xl font-bold text-surface-strong">0{index + 1}</span>
        )}
      </div>

      <h3 className="relative mt-6 font-display text-xl font-bold text-ink">{service.name}</h3>
      <p className="relative mt-1 text-sm font-medium text-brand-600">{service.tagline}</p>
      <p className="relative mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">{service.heroLead}</p>

      <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
        Learn more
        <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
