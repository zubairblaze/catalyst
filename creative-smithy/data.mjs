// Creative Smithy — price list content. Edit prices here, then run `node build.mjs`.

export const company = {
  name: 'Creative Smithy',
  // Fill these in to show them on the page and in the PDF. Empty values are hidden.
  contactName: '',
  email: '',
  phone: '',
  website: '',
  bookingLink: '',
  paymentMethods: 'bank transfer or card',
};

// Leave empty for a general price list, or set per client before building the PDF.
export const preparedFor = '';
export const validDays = 30;

export const intro =
  'Websites, online stores, custom apps and marketing, all under one roof. Choose a single service or combine them for a bundle discount. All prices are in GBP.';

const Y = 'Yes';
const N = '–';

export const sections = [
  {
    id: 'websites', title: 'Websites', subtitle: 'WordPress', kind: 'tiers', billing: 'one-off',
    lead: 'A professional site you can edit yourself, built on WordPress.',
    tiers: [
      { name: 'Starter', price: '£300' },
      { name: 'Business', price: '£500', popular: true },
      { name: 'Growth', price: '£900' },
    ],
    rows: [
      ['Pages', 'Up to 5', 'Up to 10', 'Up to 15'],
      ['Design', 'Template-based, your branding', 'Custom design', 'Fully custom design'],
      ['Mobile-responsive', Y, Y, Y],
      ['Contact form', Y, Y, 'Yes + lead-capture forms'],
      ['Blog', N, Y, Y],
      ['Basic SEO setup', Y, Y, 'Advanced'],
      ['Speed optimisation', 'Basic', Y, Y],
      ['Google Analytics & Search Console', N, Y, Y],
      ['Cookie banner & GDPR pages', Y, Y, Y],
      ['Booking, quotes or integrations', N, N, Y],
      ['Revision rounds', '1', '2', '3'],
      ['Post-launch support', '7 days', '14 days', '30 days'],
      ['Delivery time', '7–10 days', '2–3 weeks', '3–5 weeks'],
    ],
    notes: ['<strong>Included in every website:</strong> SSL certificate, basic security setup, social media links, and a short video showing how to edit your site.'],
  },
  {
    id: 'woocommerce', title: 'Online Stores', subtitle: 'WooCommerce', kind: 'tiers', billing: 'one-off',
    lead: 'A full shop on WordPress that you own outright, with no platform subscription.',
    tiers: [
      { name: 'Starter Store', price: '£400' },
      { name: 'Standard Store', price: '£900' },
    ],
    rows: [
      ['Products uploaded', 'Up to 20', 'Up to 100'],
      ['Payments (Stripe, PayPal, cards)', Y, Y],
      ['Shipping & tax setup (UK VAT)', Y, Y],
      ['Product search & filters', 'Basic', 'Advanced'],
      ['Customer reviews', N, Y],
      ['Abandoned-cart & order emails', 'Basic order emails', Y],
      ['Basic SEO for products', Y, Y],
      ['Revision rounds', '2', '3'],
      ['Post-launch support', '14 days', '30 days'],
      ['Delivery time', '2–3 weeks', '3–5 weeks'],
    ],
    notes: ['<strong>Extra products:</strong> £25 per 10 products.'],
  },
  {
    id: 'shopify', title: 'Online Stores', subtitle: 'Shopify', kind: 'tiers', billing: 'one-off',
    lead: 'A fast route to selling online, set up and branded on Shopify.',
    tiers: [
      { name: 'Starter Shop', price: '£500', from: true },
      { name: 'Standard Shop', price: '£900', from: true },
    ],
    rows: [
      ['Theme setup & branding', Y, 'Customised theme'],
      ['Products uploaded', 'Up to 20', 'Up to 100'],
      ['Collections & navigation', Y, Y],
      ['Payments, shipping & taxes', Y, Y],
      ['Policy pages (returns, privacy, terms)', Y, Y],
      ['Recommended apps setup', N, Y],
      ['Post-launch support', '14 days', '30 days'],
      ['Delivery time', '1–2 weeks', '2–4 weeks'],
    ],
    notes: ['<strong>Product image retouching (optional):</strong> background removal, colour correction and resizing, from £1 per image, with bulk discounts. The final price depends on the number of products and images.'],
  },
  {
    id: 'apps', title: 'Custom Apps', subtitle: 'For your business', kind: 'steps', billing: 'one-off',
    lead: "Have a process that's slow, manual or spread across spreadsheets? We build simple, tailor-made apps for small and medium businesses.",
    examples: ['Booking systems', 'Client portals', 'Quote calculators', 'Inventory trackers', 'Lead dashboards'],
    steps: [
      { name: 'Discovery workshop', what: 'Requirements, scope, simple mockup and fixed quote. Credited in full if you go ahead.', price: '£150' },
      { name: 'MVP app', what: 'Core features, secure login, deployment, 30 days of support.', price: '£1,500', from: true },
      { name: 'Advanced app', what: 'Integrations, payments, admin panel, more user roles.', price: 'Quoted per project' },
    ],
    notes: ['<strong>Optional app support plan:</strong> £75 per month (hosting checks, bug fixes, small updates).'],
  },
  {
    id: 'social', title: 'Social Media Management', subtitle: 'Monthly', kind: 'tiers', billing: 'monthly',
    lead: 'Consistent, on-brand posting handled for you, from planning to reporting.',
    tiers: [
      { name: 'Starter', price: '£350' },
      { name: 'Growth', price: '£550', popular: true },
      { name: 'Pro', price: '£850' },
    ],
    rows: [
      ['Platforms', '1', 'Instagram, Facebook, TikTok', 'Instagram, Facebook, TikTok'],
      ['Designed posts', '12', '16', '24'],
      ['Short videos (up to 30 sec)', '1', '2, shared across platforms', '4, shared across platforms'],
      ['Captions & hashtags', Y, Y, Y],
      ['Content calendar', Y, Y, Y],
      ['Scheduling & posting', Y, Y, Y],
      ['Community management (comments & DMs)', N, 'Basic', 'Full'],
      ['Strategy call', N, 'Quarterly', 'Monthly'],
      ['Performance report', N, 'Monthly', 'Monthly with recommendations'],
    ],
    notes: ['Ad spend is paid separately.', '<strong>Extra platform:</strong> £100 per month.'],
  },
  {
    id: 'seo', title: 'SEO', subtitle: 'Monthly', kind: 'tiers', billing: 'monthly',
    lead: 'Steady work to help the right customers find you on Google.',
    tiers: [
      { name: 'Starter', price: '£450' },
      { name: 'Growth', price: '£750', popular: true },
      { name: 'Pro', price: '£950' },
    ],
    rows: [
      ['Initial SEO audit', Y, Y, Y],
      ['Keyword research', 'Local focus', 'Local + national', 'Full competitor-based'],
      ['On-page fixes (titles, descriptions, headings)', Y, Y, Y],
      ['Google Business Profile optimisation', Y, Y, Y],
      ['Blog articles', N, '2 per month', '4 per month'],
      ['Link building', N, Y, Y],
      ['Technical SEO fixes', N, 'Basic', 'Full'],
      ['Competitor tracking', N, N, Y],
      ['Monthly report', Y, Y, 'Yes + strategy call'],
    ],
    notes: ['SEO takes time. Most clients see clear movement within 3 to 6 months.'],
  },
  {
    id: 'care', title: 'Website Care Plans', subtitle: 'Monthly', kind: 'tiers', billing: 'monthly',
    lead: 'Keep your site updated, backed up and secure after launch.',
    tiers: [
      { name: 'Basic', price: '£40' },
      { name: 'Standard', price: '£60' },
      { name: 'Premium', price: '£80' },
    ],
    rows: [
      ['Plugin, theme & core updates', Y, Y, Y],
      ['Daily or weekly backups', Y, Y, Y],
      ['Security scans & uptime monitoring', Y, Y, Y],
      ['Content changes included', N, '1 hour', '2 hours'],
      ['Monthly speed check', N, N, Y],
      ['Priority response', N, N, Y],
    ],
    notes: ['Hosting and domain management available at cost plus a small admin fee.'],
  },
];

export const bundles = [
  { name: 'Launch', includes: 'Business website + 3 months of Growth social media', saving: '10% off the website', detail: 'Website £450 instead of £500' },
  { name: 'Visibility', includes: 'Business website + 3 months of Growth SEO', saving: '10% off the website', detail: 'Website £450 instead of £500' },
  { name: 'Complete', includes: 'Business website + Growth social media + Growth SEO (3-month minimum)', saving: '10% off the website and 5% off the monthly retainers', detail: 'Website £450 instead of £500 · Retainers £1,235 a month instead of £1,300' },
];

export const addons = [
  ['Copywriting', '£40', 'per page'],
  ['Logo & simple brand kit', '£150', ''],
  ['Google Business Profile setup', '£80', ''],
  ['Email newsletter setup', '£120', ''],
  ['Extra short video', '£60', ''],
  ['Extra revision round', '£40', ''],
];

export const process = [
  ['Discovery', 'A short call to understand your business, goals and budget.'],
  ['Proposal', 'A clear scope, timeline and price for the package you choose.'],
  ['Build and launch', 'Regular updates, then review and approval before anything goes live.'],
  ['Support and growth', 'Care plans and monthly marketing keep results improving.'],
];

export const terms = [
  '<strong>Websites, stores and apps:</strong> 50% to start, 50% before launch or handover.',
  "<strong>Social media and SEO:</strong> billed monthly in advance, with a 3-month minimum, then 30 days' notice to cancel.",
  'Prices are in GBP and exclude VAT where applicable.',
  'Domains, hosting, premium plugins, stock images and ad spend are paid by the client.',
  'The client provides content, images and logins by the agreed date; delays move the timeline.',
  'Revision rounds are as listed in each package; extra rounds are charged at the add-on rate.',
  'Full ownership of the finished work transfers to you on final payment.',
  `Payment by ${company.paymentMethods}.`,
];
