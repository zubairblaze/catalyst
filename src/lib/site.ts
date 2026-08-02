export const site = {
  name: 'The Catalyst',
  legalName: 'The Catalyst FZE',
  domain: 'thecatalystfze.com',
  url: 'https://www.thecatalystfze.com',
  tagline: 'Your Trusted UAE Business Setup & Corporate Services Partner',
  description:
    'Start your UAE business with expert company formation, business banking assistance, corporate tax, bookkeeping, VAT compliance, Golden Visa and citizenship-by-investment services.',
  email: 'info@thecatalystfze.com',
  phone: '+971 56 219 2080',
  phoneHref: 'tel:+971562192080',
  whatsapp: '+971 56 219 2080',
  whatsappHref: 'https://wa.me/971562192080',
  address: {
    line1: 'Office Land Building - 102, 2 Sheikh Rashid Rd',
    poBox: 'PO Box 1122',
    city: 'Dubai',
    country: 'United Arab Emirates',
  },
  hours: 'Sun – Thu, 9:00 AM – 6:00 PM (GST)',
  social: {
    linkedin: 'https://www.linkedin.com/company/thecatalystfze',
    instagram: 'https://www.instagram.com/thecatalystfze',
    facebook: 'https://www.facebook.com/thecatalystfze',
    x: 'https://x.com/thecatalystfze',
  },
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'UAE Business Setup', href: '/services/business-setup' },
      { label: 'Business Banking Consultancy', href: '/services/business-banking' },
      { label: 'Taxation & Bookkeeping', href: '/services/taxation-bookkeeping' },
      { label: 'Residency & Citizenship', href: '/services/immigration-citizenship' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const stats = [
  { value: '1,200+', label: 'Companies Formed' },
  { value: '15+', label: 'Free Zones Covered' },
  { value: 'AED 0', label: 'Hidden Fees' },
  { value: '98%', label: 'Client Retention' },
];
