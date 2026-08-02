import Link from 'next/link';
import { IconArrowRight } from '@/components/Icons';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-surface-dark text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
      <div className="container-page relative text-center">
        <p className="font-display text-7xl font-extrabold text-brand-300 sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-light">
            Back to home
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/services" className="btn border border-white/25 text-white hover:bg-white/10">
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
