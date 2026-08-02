import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { BlogExplorer } from '@/components/blog/BlogExplorer';
import { BlogCard } from '@/components/blog/BlogCard';
import { CtaSection } from '@/components/ui/CtaSection';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { posts } from '@/lib/blog';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'UAE Business Blog | Setup, Banking, Tax & Immigration Insights',
  description:
    'Expert insights on UAE business setup, corporate banking, tax and VAT, and residency & citizenship by investment — practical guides from The Catalyst.',
  keywords: ['UAE Business Blog', 'Business Setup Guide UAE', 'UAE Corporate Tax', 'UAE Golden Visa'],
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  const featured = posts[0];

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The Catalyst Blog',
    url: `${site.url}/blog`,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.date,
      author: { '@type': 'Organization', name: site.legalName },
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <PageHero
        eyebrow="Insights"
        title="UAE business insights & guides"
        intro="Practical, up-to-date guidance on setting up, banking, taxing and living in the UAE — written by our consultants."
        crumbs={[{ label: 'Blog' }]}
      />

      {/* Featured */}
      <section className="pt-16 sm:pt-20">
        <div className="container-page">
          <Reveal immediate>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Featured article</p>
            <BlogCard post={featured} featured />
          </Reveal>
        </div>
      </section>

      {/* Explorer — reads ?category= client-side via useSearchParams */}
      <section className="section pt-14">
        <div className="container-page">
          <Suspense fallback={<div className="py-20 text-center text-ink-muted">Loading articles…</div>}>
            <BlogExplorer />
          </Suspense>
        </div>
      </section>

      <CtaSection
        title="Have a question we haven’t covered?"
        intro="Our consultants are happy to give you a straight answer. Book a free consultation and get advice specific to your business."
        points={['Free 30-minute consultation', 'Advice tailored to your activity', 'No obligation, no hard sell']}
      />
    </>
  );
}
