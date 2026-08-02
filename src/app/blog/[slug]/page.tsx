import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { posts, getPost, relatedPosts } from '@/lib/blog';
import { img } from '@/lib/images';
import { site } from '@/lib/site';
import { PostBody } from '@/components/blog/PostBody';
import { BlogCard, formatDate } from '@/components/blog/BlogCard';
import { CtaSection } from '@/components/ui/CtaSection';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { IconClock, IconArrowRight, IconArrowUpRight } from '@/components/Icons';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = relatedPosts(post.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: site.legalName, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.legalName,
      logo: { '@type': 'ImageObject', url: `${site.url}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}/blog/${post.slug}` },
    articleSection: post.category,
    keywords: post.keywords.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${site.url}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />

      {/* Article header */}
      <header className="relative overflow-hidden bg-surface-dark pt-28 pb-14 text-white sm:pt-32 lg:pt-40 lg:pb-20">
        <Image
          src={img(post.image)}
          alt=""
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/85 to-surface-dark/70" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
        <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
        <div className="container-page relative max-w-3xl">
          <Reveal immediate>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/50">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="text-white/30">/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">{post.category}</span>
            </nav>
          </Reveal>
          <Reveal immediate delay={0.05}>
            <Link
              href={`/blog?category=${post.category.toLowerCase().replace(/ /g, '-')}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200"
            >
              {post.category}
            </Link>
          </Reveal>
          <Reveal immediate delay={0.1}>
            <h1 className="mt-5 text-balance font-display text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal immediate delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  TC
                </span>
                {post.author}
              </span>
              <span>{formatDate(post.date)}</span>
              <span className="inline-flex items-center gap-1.5">
                <IconClock className="h-4 w-4" />
                {post.readMinutes} min read
              </span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Article body */}
      <article className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_16rem] lg:items-start">
          <Reveal immediate className="max-w-3xl">
            <PostBody blocks={post.body} />

            {/* Keywords / tags */}
            <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-8">
              {post.keywords.map((k) => (
                <span key={k} className="rounded-full bg-surface-strong px-3 py-1.5 text-xs font-medium text-ink-soft">
                  {k}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Sidebar CTA */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-line bg-surface-soft p-6">
              <h3 className="font-display text-lg font-bold text-ink">Need expert help?</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Get advice specific to your business in a free consultation with a Catalyst consultant.
              </p>
              <Link href="/contact" className="btn-primary mt-4 w-full text-sm">
                Book a call
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {/* Related */}
      <section className="pb-8">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Related articles</h2>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
              All articles
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <BlogCard key={r.slug} post={r} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
