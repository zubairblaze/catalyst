export type BlogCategory =
  | 'Business Setup'
  | 'Banking'
  | 'Taxation'
  | 'Immigration';

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string };

import type { ImageKey } from './images';

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  image: ImageKey;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  date: string; // ISO
  readMinutes: number;
  author: string;
  keywords: string[];
  body: ContentBlock[];
};

export const categories: { name: BlogCategory; slug: string; blurb: string }[] = [
  { name: 'Business Setup', slug: 'business-setup', blurb: 'Company formation, free zones & licensing in the UAE.' },
  { name: 'Banking', slug: 'banking', blurb: 'Corporate accounts, trade finance & SME funding.' },
  { name: 'Taxation', slug: 'taxation', blurb: 'Corporate tax, VAT, bookkeeping & compliance.' },
  { name: 'Immigration', slug: 'immigration', blurb: 'Golden Visa, residency & citizenship by investment.' },
];

export const posts: BlogPost[] = [
  {
    slug: 'how-to-start-a-business-in-uae-2026',
    title: 'How to Start a Business in the UAE in 2026: A Step-by-Step Guide',
    category: 'Business Setup',
    image: 'blog-business-setup',
    excerpt:
      'From choosing a jurisdiction to opening a bank account, here is the complete, up-to-date roadmap for launching a company in the UAE this year.',
    seoTitle: 'How to Start a Business in UAE in 2026 | Step-by-Step Guide',
    metaDescription:
      'A step-by-step 2026 guide to starting a business in the UAE — choosing mainland vs free zone, licensing, visas, bank accounts and corporate tax registration.',
    date: '2026-01-14',
    readMinutes: 8,
    author: 'The Catalyst Team',
    keywords: ['Start a business in Dubai', 'Business Setup UAE', 'Company Formation UAE', 'UAE company registration'],
    body: [
      { type: 'p', text: 'The UAE remains one of the most attractive places on earth to start a business — zero personal income tax, world-class infrastructure, and a strategic position between East and West. But the path from idea to trading licence has several decisions that shape your costs, ownership and tax position for years. Here is how to get it right in 2026.' },
      { type: 'h2', text: '1. Define your business activity' },
      { type: 'p', text: 'Every UAE licence is tied to one or more approved activities. Your activity determines which authority can license you, whether you need external approvals, and which visas you can sponsor. Start here, because it drives every subsequent choice.' },
      { type: 'h2', text: '2. Choose mainland, free zone or offshore' },
      { type: 'p', text: 'This is the single most important decision. Mainland companies can trade anywhere in the UAE and bid for government work. Free zone companies offer streamlined setup, tax incentives and 100% ownership but typically trade within their zone or internationally. Offshore companies are used for holding and asset protection, not local trade.' },
      { type: 'ul', items: ['Mainland — best for local B2C, retail and government contracts', 'Free zone — best for services, trading, e-commerce and holding', 'Offshore — best for asset protection and international structuring'] },
      { type: 'h2', text: '3. Select the right jurisdiction' },
      { type: 'p', text: 'There are more than 40 free zones in the UAE, each with its own pricing, activity list and visa allocations. IFZA, Meydan, SHAMS, RAKEZ, DMCC and Dubai South are among the most popular. The cheapest zone is rarely the right one — match the zone to your activity and visa needs.' },
      { type: 'h2', text: '4. Reserve your trade name and apply for the licence' },
      { type: 'p', text: 'Once the structure is set, you reserve a trade name, secure initial approval, and submit your incorporation documents. With paperwork in order, free zone licences are often issued within 3–7 working days.' },
      { type: 'h2', text: '5. Process visas and Emirates ID' },
      { type: 'p', text: 'Your licence comes with a visa quota. As the owner you can apply for an investor visa, then sponsor family and staff. Each visa involves entry permit, medical, Emirates ID and stamping.' },
      { type: 'h2', text: '6. Open a corporate bank account' },
      { type: 'p', text: 'Banking is where many founders stall. UAE banks are compliance-driven, so a well-prepared application matters. Have a clear business model, proof of address, and a documented source of funds ready.' },
      { type: 'h2', text: '7. Register for corporate tax and VAT' },
      { type: 'p', text: 'With corporate tax now in force, most companies must register regardless of expected liability. If your taxable supplies exceed AED 375,000 you must also register for VAT. Get this right from day one to avoid penalties.' },
      { type: 'quote', text: 'The founders who move fastest are the ones who make the structure decision correctly the first time — everything downstream depends on it.' },
      { type: 'h2', text: 'Ready to start?' },
      { type: 'p', text: 'The Catalyst handles every step above under one roof — structure, licence, visas, banking introductions and tax registration — with transparent pricing and a dedicated consultant. Book a free consultation and we will map your fastest, most cost-effective route to launch.' },
    ],
  },
  {
    slug: 'best-free-zones-in-uae-for-startups',
    title: 'The Best Free Zones in the UAE for Startups',
    category: 'Business Setup',
    image: 'blog-freezones',
    excerpt:
      'IFZA, Meydan, SHAMS, RAKEZ and more — how to choose the free zone that gives your startup the best value, activity fit and visa allocation.',
    seoTitle: 'Best Free Zones in UAE for Startups | Comparison Guide',
    metaDescription:
      'Compare the best UAE free zones for startups — IFZA, Meydan Free Zone, SHAMS, RAKEZ and DMCC — on cost, activities, visas and location.',
    date: '2026-01-09',
    readMinutes: 7,
    author: 'The Catalyst Team',
    keywords: ['Best Free Zones in UAE for Startups', 'Free Zone Company Setup', 'IFZA company formation', 'RAKEZ company formation'],
    body: [
      { type: 'p', text: 'With more than 40 free zones to choose from, picking the right one can feel overwhelming. The good news: for most startups the shortlist comes down to a handful of proven zones. Here is how the leading options compare.' },
      { type: 'h2', text: 'IFZA (Dubai)' },
      { type: 'p', text: 'One of the most cost-effective Dubai zones, popular for consultancy, trading and holding activities. Flexible packages and a broad activity list make it a default choice for lean startups.' },
      { type: 'h2', text: 'Meydan Free Zone (Dubai)' },
      { type: 'p', text: 'A prestigious Dubai address with a fast digital setup process — attractive for e-commerce and professional services that value the Dubai brand.' },
      { type: 'h2', text: 'SHAMS (Sharjah)' },
      { type: 'p', text: 'Media, creative and professional activities at a competitive price point, with easy access to Dubai.' },
      { type: 'h2', text: 'RAKEZ (Ras Al Khaimah)' },
      { type: 'p', text: 'Excellent value for industrial, trading and SME activities, with strong warehousing and manufacturing options.' },
      { type: 'h2', text: 'DMCC (Dubai)' },
      { type: 'p', text: 'The world’s leading free zone for commodities and a premium ecosystem for trading, crypto and fintech — a higher price point that buys credibility.' },
      { type: 'h2', text: 'How to choose' },
      { type: 'ul', items: ['Match the zone’s activity list to exactly what you will do', 'Count the visas you need now and in 12 months', 'Weigh location and address prestige against budget', 'Check renewal costs, not just year-one pricing'] },
      { type: 'p', text: 'The Catalyst compares live pricing across every major zone and recommends the best fit for your activity and growth plan — no bias, just the right answer.' },
    ],
  },
  {
    slug: 'mainland-vs-free-zone-companies',
    title: 'Mainland vs Free Zone Companies in the UAE: Which Is Right for You?',
    category: 'Business Setup',
    image: 'blog-mainland',
    excerpt:
      'Ownership, trade rights, cost and tax — a clear, side-by-side comparison to help you choose the right structure for your UAE company.',
    seoTitle: 'Mainland vs Free Zone Companies UAE | Which to Choose',
    metaDescription:
      'Mainland vs free zone company in the UAE — compare ownership, trading rights, office requirements, cost and corporate tax to choose the right structure.',
    date: '2026-01-05',
    readMinutes: 6,
    author: 'The Catalyst Team',
    keywords: ['Mainland vs Free Zone Companies', 'Mainland Company Formation', 'Free Zone Company Setup'],
    body: [
      { type: 'p', text: 'Mainland or free zone? It is the question every UAE founder asks first. Both are excellent — the right answer depends on who your customers are and how you plan to grow.' },
      { type: 'h2', text: 'Trading rights' },
      { type: 'p', text: 'Mainland companies can trade directly with the UAE local market and bid for government contracts. Free zone companies trade within their zone and internationally; selling into the mainland usually requires a distributor or a mainland branch.' },
      { type: 'h2', text: 'Ownership' },
      { type: 'p', text: 'Both structures now allow 100% foreign ownership for the vast majority of activities, so ownership is rarely the deciding factor it once was.' },
      { type: 'h2', text: 'Office and cost' },
      { type: 'p', text: 'Free zones often accept flexi-desk packages, keeping year-one costs low. Mainland activities may require a physical tenancy (Ejari), which adds cost but unlocks the local market.' },
      { type: 'h2', text: 'Corporate tax' },
      { type: 'p', text: 'Qualifying free zone persons may access a 0% rate on qualifying income if they meet substance requirements, while mainland companies fall under the standard regime. Structuring matters — get advice before you commit.' },
      { type: 'quote', text: 'If you sell to UAE consumers or the government, think mainland. If you sell services, trade or hold assets, a free zone is usually cheaper and simpler.' },
      { type: 'p', text: 'Still unsure? The Catalyst models both options against your activity, customers and budget so you can decide with confidence.' },
    ],
  },
  {
    slug: 'why-uae-banks-reject-business-accounts',
    title: 'Why UAE Banks Reject Business Accounts (and How to Get Approved)',
    category: 'Banking',
    image: 'blog-banking',
    excerpt:
      'Account rejections are almost always avoidable. Here are the real reasons UAE banks decline corporate applications — and how to pass compliance the first time.',
    seoTitle: 'Why UAE Banks Reject Business Accounts | How to Get Approved',
    metaDescription:
      'Learn why UAE banks reject business bank accounts and how to get approved — KYC, source of funds, activity mismatch and banking readiness explained.',
    date: '2026-01-11',
    readMinutes: 6,
    author: 'The Catalyst Team',
    keywords: ['Why UAE Banks Reject Business Accounts', 'Business Bank Account UAE', 'Corporate Bank Account Opening UAE', 'KYC preparation'],
    body: [
      { type: 'p', text: 'A declined bank account can stall a business for weeks. The frustrating part is that most rejections are avoidable — they come down to a handful of predictable compliance issues.' },
      { type: 'h2', text: '1. Incomplete or inconsistent KYC' },
      { type: 'p', text: 'Missing documents, mismatched names or an unclear ownership chart are the fastest way to a decline. Banks need a complete, consistent picture of who owns and controls the company.' },
      { type: 'h2', text: '2. Activity mismatch' },
      { type: 'p', text: 'If your licensed activity does not match the transactions you describe, compliance teams flag it. Your activity, website and account narrative must all tell the same story.' },
      { type: 'h2', text: '3. Unclear source of funds' },
      { type: 'p', text: 'Banks must understand where your money comes from. Vague answers or undocumented funds create risk in their eyes. Prepare clear, evidenced explanations.' },
      { type: 'h2', text: '4. High-risk profile' },
      { type: 'p', text: 'Certain nationalities, activities or jurisdictions attract enhanced due diligence. This does not mean rejection — it means your application must be stronger and better documented.' },
      { type: 'h2', text: 'How to get approved' },
      { type: 'ol', items: ['Prepare a complete, consistent KYC pack', 'Align your activity, website and narrative', 'Document your source of funds clearly', 'Apply to banks that fit your profile', 'Rehearse the compliance interview'] },
      { type: 'p', text: 'The Catalyst structures your application to pre-empt each of these issues and introduces you to the banks most likely to approve your profile.' },
    ],
  },
  {
    slug: 'uae-corporate-tax-explained',
    title: 'UAE Corporate Tax Explained: What Every Business Needs to Know',
    category: 'Taxation',
    image: 'blog-taxation',
    excerpt:
      'Rates, thresholds, free zone treatment and Small Business Relief — a plain-English guide to UAE corporate tax and what to do about it.',
    seoTitle: 'UAE Corporate Tax Explained | Rates, Thresholds & Registration',
    metaDescription:
      'A plain-English guide to UAE corporate tax — the 9% rate, the AED 375,000 threshold, free zone treatment, Small Business Relief and registration deadlines.',
    date: '2026-01-07',
    readMinutes: 7,
    author: 'The Catalyst Team',
    keywords: ['UAE Corporate Tax Explained', 'Corporate Tax UAE', 'Corporate tax registration', 'Corporate tax consultant'],
    body: [
      { type: 'p', text: 'Corporate tax is now a fact of doing business in the UAE. The rules are business-friendly by global standards, but they still require registration, record-keeping and timely filing. Here is what you need to know.' },
      { type: 'h2', text: 'The headline rate' },
      { type: 'p', text: 'UAE corporate tax applies at 9% on taxable profits above AED 375,000, with a 0% rate on profits up to that threshold. This keeps small businesses lightly taxed while remaining competitive internationally.' },
      { type: 'h2', text: 'Who must register' },
      { type: 'p', text: 'Most businesses must register for corporate tax regardless of whether they expect to pay it — including many free zone companies. Registration is a compliance obligation, not just a payment trigger.' },
      { type: 'h2', text: 'Free zone treatment' },
      { type: 'p', text: 'Qualifying free zone persons may enjoy a 0% rate on qualifying income, but only if they meet substance, audit and documentation requirements. Getting this wrong can cost the benefit entirely.' },
      { type: 'h2', text: 'Small Business Relief' },
      { type: 'p', text: 'Eligible small businesses can elect for Small Business Relief, simplifying compliance and reducing the tax burden during the early years. We assess whether you qualify.' },
      { type: 'h2', text: 'What to do now' },
      { type: 'ul', items: ['Register within the applicable deadline for your licence', 'Keep clean, IFRS-aligned books', 'Assess free zone qualifying income eligibility', 'File accurately and on time'] },
      { type: 'p', text: 'The Catalyst handles registration, bookkeeping and filing so your corporate tax position is compliant and optimised from day one.' },
    ],
  },
  {
    slug: 'uae-golden-visa-requirements',
    title: 'UAE Golden Visa Requirements: Who Qualifies and How to Apply',
    category: 'Immigration',
    image: 'blog-immigration',
    excerpt:
      'Investors, entrepreneurs, professionals and talent — the routes to a 10-year UAE Golden Visa, the thresholds involved, and how the application works.',
    seoTitle: 'UAE Golden Visa Requirements | Eligibility & How to Apply',
    metaDescription:
      'UAE Golden Visa requirements explained — eligibility for investors, entrepreneurs, professionals and talent, plus documents and the application process.',
    date: '2026-01-03',
    readMinutes: 6,
    author: 'The Catalyst Team',
    keywords: ['UAE Golden Visa Requirements', 'Golden Visa UAE', 'Long-term residency UAE', 'Investor Golden Visa'],
    body: [
      { type: 'p', text: 'The UAE Golden Visa offers 5 or 10 years of renewable residency without the need for a local sponsor — a powerful base for entrepreneurs, investors and skilled professionals. Here are the main routes and how to qualify.' },
      { type: 'h2', text: 'Investors and entrepreneurs' },
      { type: 'p', text: 'Property investors, business owners and founders of qualifying start-ups can secure long-term residency by meeting defined investment or business-value thresholds.' },
      { type: 'h2', text: 'Skilled professionals' },
      { type: 'p', text: 'Professionals in fields such as medicine, engineering, science, education and technology can qualify based on salary level and qualifications, typically with an approved employment position.' },
      { type: 'h2', text: 'Outstanding talent' },
      { type: 'p', text: 'Exceptional individuals in culture, sport, science and innovation may be nominated for the Golden Visa on the basis of achievement.' },
      { type: 'h2', text: 'The application process' },
      { type: 'ol', items: ['Confirm your eligibility route', 'Prepare and attest the required documents', 'Submit the nomination or application', 'Complete medical and Emirates ID', 'Receive your Golden Visa and residency'] },
      { type: 'p', text: 'The Catalyst assesses your strongest eligibility route and manages the entire application — for you and your family — from first review to approval.' },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function postsByCategory(cat: BlogCategory) {
  return posts.filter((p) => p.category === cat);
}

export function relatedPosts(slug: string, limit = 3) {
  const current = getPost(slug);
  if (!current) return posts.slice(0, limit);
  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, limit);
}
