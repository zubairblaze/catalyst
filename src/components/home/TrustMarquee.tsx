const items = ['IFZA', 'Meydan Free Zone', 'DMCC', 'RAKEZ', 'SHAMS', 'SPC', 'Dubai South', 'Ajman Free Zone', 'ADGM', 'KEZAD'];

export function TrustMarquee() {
  return (
    <section className="border-y border-line bg-surface-soft py-8">
      <div className="container-page">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Company formation across the UAE’s leading free zones &amp; authorities
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-12">
            {[...items, ...items].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="whitespace-nowrap font-display text-lg font-bold text-ink-soft/70 sm:text-xl"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
