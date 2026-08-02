import Link from 'next/link';
import Image from 'next/image';

/**
 * Official The Catalyst insignia (blue bars + swoosh). Insignia only, no
 * wordmark. On dark backgrounds pass `inverse` to render it white.
 */
export function LogoMark({ className = '', inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Image
      src="/brand/logo-blue.svg"
      alt="The Catalyst"
      width={619}
      height={521}
      priority
      className={`${className} ${inverse ? 'brightness-0 invert' : ''}`}
    />
  );
}

export function Logo({ className = '', inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Link href="/" className={`group inline-flex items-center ${className}`} aria-label="The Catalyst — home">
      <LogoMark inverse={inverse} className="h-9 w-auto transition-transform duration-500 group-hover:-translate-y-0.5" />
    </Link>
  );
}
