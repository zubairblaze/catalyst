export type Location = {
  slug: string;
  city: string;
  emirate: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  highlights: string[];
};

export const locations: Location[] = [
  {
    slug: 'business-setup-dubai',
    city: 'Dubai',
    emirate: 'Dubai',
    seoTitle: 'Business Setup in Dubai | Company Formation & Trade Licence',
    metaDescription:
      'Set up your company in Dubai with expert business setup consultants — mainland and free zone formation, trade licences, visas and bank account assistance.',
    h1: 'Business Setup in Dubai',
    intro:
      'Dubai is the beating heart of the UAE economy — home to DMCC, IFZA, Meydan and dozens of free zones, plus a thriving mainland market. Whether you are launching a consultancy, a trading company or an e-commerce brand, The Catalyst handles your Dubai company formation end to end.',
    highlights: ['Mainland & DED licensing', 'IFZA, Meydan, DMCC & Dubai South', 'Investor & family visas', 'Corporate bank account introductions'],
  },
  {
    slug: 'business-setup-abu-dhabi',
    city: 'Abu Dhabi',
    emirate: 'Abu Dhabi',
    seoTitle: 'Business Setup in Abu Dhabi | Company Formation Consultants',
    metaDescription:
      'Start your business in Abu Dhabi with expert company formation — mainland licensing, free zone setup (ADGM, KEZAD), visas and compliance support.',
    h1: 'Business Setup in Abu Dhabi',
    intro:
      'The UAE capital combines a stable, well-regulated environment with strong government and energy-sector demand. The Catalyst supports Abu Dhabi mainland and free zone formation, including ADGM and KEZAD, with full visa and compliance support.',
    highlights: ['ADED mainland licensing', 'ADGM & KEZAD free zones', 'Government-sector readiness', 'End-to-end compliance'],
  },
  {
    slug: 'business-setup-sharjah',
    city: 'Sharjah',
    emirate: 'Sharjah',
    seoTitle: 'Business Setup in Sharjah | Free Zone & Mainland Company Formation',
    metaDescription:
      'Affordable business setup in Sharjah — SHAMS, SAIF Zone and mainland company formation with trade licences, visas and bank account assistance.',
    h1: 'Business Setup in Sharjah',
    intro:
      'Sharjah offers outstanding value with easy access to Dubai. Through SHAMS, SAIF Zone and mainland licensing, The Catalyst helps founders launch cost-effectively without sacrificing credibility.',
    highlights: ['SHAMS & SAIF Zone', 'Cost-effective packages', 'Media & professional activities', 'Fast setup process'],
  },
  {
    slug: 'business-setup-ajman',
    city: 'Ajman',
    emirate: 'Ajman',
    seoTitle: 'Business Setup in Ajman | Ajman Free Zone Company Formation',
    metaDescription:
      'Set up your company in Ajman with Ajman Free Zone and mainland formation — competitive pricing, trade licences, visas and compliance support.',
    h1: 'Business Setup in Ajman',
    intro:
      'Ajman Free Zone is a favourite for SMEs and industrial businesses seeking low-cost, flexible licensing. The Catalyst manages your Ajman formation, visas and compliance from start to finish.',
    highlights: ['Ajman Free Zone', 'Industrial & SME activities', 'Competitive pricing', 'Warehousing options'],
  },
  {
    slug: 'business-setup-ras-al-khaimah',
    city: 'Ras Al Khaimah',
    emirate: 'Ras Al Khaimah',
    seoTitle: 'Business Setup in Ras Al Khaimah | RAKEZ Company Formation',
    metaDescription:
      'Business setup in Ras Al Khaimah with RAKEZ — trading, industrial and SME company formation, trade licences, visas and compliance support.',
    h1: 'Business Setup in Ras Al Khaimah',
    intro:
      'RAKEZ is one of the UAE’s most competitive free zones for trading and industrial activities. The Catalyst helps you leverage RAK’s value pricing and manufacturing infrastructure with full formation support.',
    highlights: ['RAKEZ licensing', 'Industrial & manufacturing', 'Excellent value', 'Trading & SME activities'],
  },
  {
    slug: 'business-setup-al-ain',
    city: 'Al Ain',
    emirate: 'Abu Dhabi',
    seoTitle: 'Business Setup in Al Ain | Company Formation Consultants',
    metaDescription:
      'Start your business in Al Ain with expert company formation — mainland licensing, visas, corporate tax and bank account assistance.',
    h1: 'Business Setup in Al Ain',
    intro:
      'The Garden City offers a growing local market within the Abu Dhabi emirate. The Catalyst supports Al Ain mainland formation, visas and ongoing compliance so you can serve the region with confidence.',
    highlights: ['ADED mainland licensing', 'Local market access', 'Visa & PRO services', 'Bookkeeping & tax support'],
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
