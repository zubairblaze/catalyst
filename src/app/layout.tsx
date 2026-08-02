import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher, ThemeScript } from '@/components/ThemeSwitcher';
import { ScrollProgress } from '@/components/ScrollProgress';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Business Setup, Banking & Tax Consultants in UAE | The Catalyst',
    template: '%s | The Catalyst',
  },
  description: site.description,
  keywords: [
    'Business Setup UAE',
    'Company Formation Dubai',
    'Business Banking UAE',
    'Corporate Tax UAE',
    'Bookkeeping Services UAE',
    'Golden Visa UAE',
    'UAE Business Consultants',
    'Free Zone Company Formation',
    'Citizenship by Investment',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: site.url,
    siteName: site.name,
    title: 'Business Setup, Banking & Tax Consultants in UAE | The Catalyst',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Setup, Banking & Tax Consultants in UAE | The Catalyst',
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  // Favicon + apple icon are auto-detected from src/app/icon.png & apple-icon.png.
};

export const viewport: Viewport = {
  themeColor: '#0641b4',
  colorScheme: 'light',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  areaServed: 'AE',
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.address.city,
    addressCountry: 'AE',
    streetAddress: site.address.line1,
    postOfficeBoxNumber: site.address.poBox,
  },
  sameAs: [site.social.linkedin, site.social.instagram, site.social.facebook, site.social.x],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scheme="royal" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd data={organizationSchema} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
