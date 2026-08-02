'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts a numeric value up when scrolled into view. Preserves any non-digit
 * prefix/suffix in `value` (e.g. "1,200+", "AED 0", "98%").
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : stripToStart(value));

  const match = value.match(/([\d,]+)/);
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
  const prefix = match ? value.slice(0, match.index) : value;
  const suffix = match ? value.slice((match.index ?? 0) + match[1].length) : '';

  useEffect(() => {
    if (!inView || reduce || !match) {
      if (reduce) setDisplay(value);
      return;
    }
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(target * eased);
      setDisplay(`${prefix}${current.toLocaleString('en-US')}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, prefix, suffix, value, match]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function stripToStart(value: string) {
  const match = value.match(/([\d,]+)/);
  if (!match) return value;
  const prefix = value.slice(0, match.index);
  const suffix = value.slice((match.index ?? 0) + match[1].length);
  return `${prefix}0${suffix}`;
}
