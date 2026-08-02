export type ServiceSection = {
  title: string;
  description: string;
  items: string[];
};

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  icon: string; // key used by IconBadge
  name: string;
  shortName: string;
  tagline: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroLead: string;
  overview: string;
  keywords: string[];
  sections: ServiceSection[];
  whyChooseUs?: string[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: 'business-setup',
    icon: 'building',
    name: 'UAE Business Setup',
    shortName: 'Business Setup',
    tagline: 'Company Formation, Free Zones & Mainland Licensing',
    seoTitle: 'Business Setup in UAE | Company Formation Dubai & Free Zones',
    metaDescription:
      'Launch your business in Dubai and across the UAE with expert company formation services, free zone setup, mainland licensing, visas and compliance support.',
    h1: 'Business Setup Services in UAE',
    heroLead:
      'Start your business in the UAE with complete support — from licensing to visa processing and corporate structuring. Mainland, Free Zone and Offshore, handled end to end.',
    overview:
      'Choosing where and how to incorporate is the most important decision you will make as a founder in the UAE. The Catalyst guides you through mainland, free zone and offshore options, matching the right jurisdiction, licence and visa allocation to your activity, budget and growth plans — then handling the paperwork so you can focus on trading.',
    keywords: [
      'Business Setup UAE',
      'Company Formation Dubai',
      'Company Registration UAE',
      'Business License UAE',
      'Free Zone Company Setup',
      'Mainland Company Formation',
      'UAE Investor Visa',
      'Dubai Trade License',
    ],
    sections: [
      {
        title: 'Mainland Company Formation',
        description:
          'Trade freely across the UAE and win government contracts with a Department of Economy licence. We advise on activity selection, local service agents and 100% foreign-ownership eligibility.',
        items: [
          'Professional License',
          'Commercial License',
          'Industrial License',
          'E-commerce License',
          'Mainland company setup in Dubai',
        ],
      },
      {
        title: 'Free Zone Company Formation',
        description:
          'Zero corporate tax thresholds, full repatriation and streamlined licensing across the UAE’s leading free zones. We match your activity to the most cost-effective zone.',
        items: ['IFZA', 'Meydan Free Zone', 'SHAMS', 'SPC', 'RAKEZ', 'DMCC', 'Dubai South', 'Ajman Free Zone'],
      },
      {
        title: 'Offshore Company Formation',
        description:
          'Protect assets and expand globally with a compliant offshore structure for holding, IP and international trade.',
        items: ['Asset Protection', 'International Holding Structures', 'Global Expansion'],
      },
      {
        title: 'Visas & Corporate Services',
        description:
          'Everything you need after the licence — residency for you and your family, banking introductions and ongoing PRO support.',
        items: [
          'Investor Visa',
          'Partner & Family Visa',
          'Emirates ID',
          'Corporate Bank Account Assistance',
          'Office Solutions',
          'PRO & Document Clearing Services',
        ],
      },
    ],
    whyChooseUs: [
      'Fast, transparent setup process',
      'Government liaison & PRO support',
      'A dedicated consultant from day one',
      'Transparent, all-inclusive pricing',
      'End-to-end compliance handled for you',
    ],
    faqs: [
      {
        q: 'How long does it take to set up a company in the UAE?',
        a: 'Most free zone companies are incorporated within 3–7 working days once documents are in order. Mainland licences typically take 5–10 working days depending on the activity and approvals required.',
      },
      {
        q: 'Can a foreigner own 100% of a UAE company?',
        a: 'Yes. Free zone companies have always allowed 100% foreign ownership, and the majority of mainland commercial and professional activities now permit full foreign ownership as well. We confirm eligibility for your specific activity.',
      },
      {
        q: 'What is the difference between a mainland and a free zone company?',
        a: 'A mainland company can trade directly anywhere in the UAE and bid for government work, while a free zone company enjoys simplified setup, tax incentives and 100% ownership but generally trades within its zone or internationally. We recommend the structure that fits your customers and margins.',
      },
      {
        q: 'Do I need a physical office to get a trade licence?',
        a: 'Requirements vary by jurisdiction. Many free zones accept flexi-desk or virtual-office packages, while some mainland activities require a tenancy (Ejari). We include the most cost-effective compliant option in your quote.',
      },
    ],
  },
  {
    slug: 'business-banking',
    icon: 'bank',
    name: 'Business Banking Consultancy',
    shortName: 'Business Banking',
    tagline: 'Corporate Accounts, Trade Finance & SME Funding',
    seoTitle: 'Business Banking Consultancy UAE | Corporate Bank Account Assistance',
    metaDescription:
      'Get expert guidance for UAE business bank account opening, banking compliance, trade finance, SME funding and financial advisory services.',
    h1: 'Business Banking Consultancy in UAE',
    heroLead:
      'We assist startups, SMEs and established companies in securing the right banking relationships and financial solutions — from account opening to trade finance and working capital.',
    overview:
      'Opening a corporate bank account in the UAE has become increasingly compliance-driven, and a weak application is the number-one reason accounts are delayed or declined. The Catalyst positions your company for approval — structuring your documentation, preparing you for KYC, and introducing you to the local, digital and neo-banks most likely to say yes to your profile.',
    keywords: [
      'Business Bank Account UAE',
      'Corporate Bank Account Opening UAE',
      'Banking Consultancy UAE',
      'SME Finance UAE',
      'Trade Finance UAE',
      'Business Funding UAE',
    ],
    sections: [
      {
        title: 'Business Bank Account Opening',
        description:
          'Introductions to the banks that fit your activity, shareholding and turnover — with your file structured to pass compliance the first time.',
        items: ['UAE Local Banks', 'Digital Banks', 'Neo Banks', 'Startup accounts', 'Corporate account opening'],
      },
      {
        title: 'Banking Advisory & Readiness',
        description:
          'Get application-ready. We review your corporate structure and documentation against bank KYC expectations before you apply.',
        items: [
          'Account Structuring',
          'Compliance Preparation',
          'KYC Documentation Review',
          'Banking Readiness Assessment',
        ],
      },
      {
        title: 'Business Funding & Trade Finance',
        description:
          'Fuel growth with the right facilities — from working capital lines to trade instruments that keep goods moving.',
        items: [
          'Working Capital',
          'SME Loans',
          'Trade Finance & Letters of Credit',
          'Invoice Financing',
          'POS Financing',
        ],
      },
      {
        title: 'Financial Advisory',
        description:
          'Build a credit profile that lenders trust and a structure that scales with you.',
        items: ['Business Credit Profile Review', 'Financial Structuring', 'SME finance strategy'],
      },
    ],
    whyChooseUs: [
      'Relationships across local, digital & neo-banks',
      'Applications structured to pass KYC',
      'Trade finance & working-capital expertise',
      'Honest guidance on realistic approval odds',
    ],
    faqs: [
      {
        q: 'Why are UAE business bank accounts often rejected?',
        a: 'The most common reasons are incomplete KYC documentation, an unclear business model, a mismatch between the licensed activity and the intended transactions, or high-risk shareholding. We pre-empt each of these before you apply.',
      },
      {
        q: 'How long does it take to open a corporate bank account?',
        a: 'With a well-prepared file, most accounts are approved within 2–4 weeks. Complex ownership structures or high-risk activities can take longer, which is why banking readiness matters.',
      },
      {
        q: 'Can a newly formed company get a bank account?',
        a: 'Yes. New companies open accounts every day — the key is presenting a credible business plan, clear source of funds and complete documentation. We match your profile to banks that actively onboard start-ups.',
      },
      {
        q: 'Do you help with SME financing and trade finance?',
        a: 'Yes. Beyond account opening we advise on working capital lines, SME loans, letters of credit, invoice financing and POS financing, and help you present a fundable credit profile.',
      },
    ],
  },
  {
    slug: 'taxation-bookkeeping',
    icon: 'calculator',
    name: 'Taxation & Bookkeeping',
    shortName: 'Tax & Bookkeeping',
    tagline: 'Corporate Tax, VAT, Accounting & Compliance',
    seoTitle: 'Corporate Tax, VAT & Bookkeeping Services UAE',
    metaDescription:
      'Professional bookkeeping, VAT registration, VAT filing, corporate tax compliance and accounting services for UAE businesses.',
    h1: 'Taxation & Accounting Services in UAE',
    heroLead:
      'Stay compliant with UAE regulations through professional accounting, bookkeeping, VAT and corporate tax services — accurate books, filed on time, every time.',
    overview:
      'With corporate tax now in force and VAT firmly established, clean books are no longer optional — they are the foundation of compliance and better decisions. The Catalyst runs your finance function end to end: day-to-day bookkeeping, VAT and corporate tax registration and filing, and the regulatory compliance (AML, UBO, ESR) that keeps your licence in good standing.',
    keywords: [
      'Corporate Tax UAE',
      'VAT Services UAE',
      'Bookkeeping UAE',
      'Accounting Services UAE',
      'VAT registration UAE',
      'Corporate tax registration',
      'Tax consultant UAE',
    ],
    sections: [
      {
        title: 'Accounting & Bookkeeping',
        description:
          'Accurate, up-to-date records that give you a real-time view of your business and keep you audit-ready.',
        items: ['Monthly Bookkeeping', 'Financial Statements', 'Management Reports', 'Outsourced accounting'],
      },
      {
        title: 'VAT Services',
        description:
          'Register, file and stay compliant with UAE VAT — no missed deadlines, no avoidable penalties.',
        items: ['VAT Registration', 'VAT Return Filing', 'VAT Compliance Review', 'VAT consultancy'],
      },
      {
        title: 'Corporate Tax Services',
        description:
          'Navigate UAE corporate tax with confidence — from registration and assessment to accurate, on-time filing.',
        items: ['Corporate Tax Registration', 'Tax Assessment', 'Corporate Tax Filing', 'Corporate tax consultant'],
      },
      {
        title: 'Compliance Services',
        description:
          'Meet every regulatory obligation attached to your UAE licence with proactive, documented compliance.',
        items: ['AML Compliance', 'UBO Compliance', 'ESR Compliance', 'Internal Controls'],
      },
      {
        title: 'CFO Services',
        description:
          'Senior financial leadership on demand — the numbers, forecasts and cash discipline of a full finance team.',
        items: ['Financial Planning', 'Budgeting', 'Cash Flow Management'],
      },
    ],
    whyChooseUs: [
      'FTA-aligned VAT & corporate tax expertise',
      'On-time filing with zero-surprise deadlines',
      'Cloud bookkeeping with monthly reporting',
      'AML, UBO & ESR compliance covered',
    ],
    faqs: [
      {
        q: 'Does my UAE company need to register for corporate tax?',
        a: 'Most UAE businesses must register for corporate tax regardless of whether they expect to pay it. We handle registration and confirm your obligations, reliefs and any Small Business Relief eligibility.',
      },
      {
        q: 'When is VAT registration mandatory in the UAE?',
        a: 'VAT registration is mandatory once taxable supplies exceed AED 375,000 in a 12-month period, and voluntary above AED 187,500. We assess your turnover and register you on time to avoid penalties.',
      },
      {
        q: 'Do free zone companies pay corporate tax?',
        a: 'Qualifying free zone persons may benefit from a 0% rate on qualifying income, but they must still register and meet substance and documentation requirements. We assess your eligibility and keep you compliant.',
      },
      {
        q: 'Can you take over bookkeeping that is behind?',
        a: 'Yes. We regularly bring backlogged accounts up to date, reconcile prior periods and put a clean monthly process in place so you stay current going forward.',
      },
    ],
  },
  {
    slug: 'immigration-citizenship',
    icon: 'globe',
    name: 'Residency & Citizenship Programs',
    shortName: 'Residency & Citizenship',
    tagline: 'Golden Visa, Global Residency & Second Citizenship',
    seoTitle: 'Golden Visa & Citizenship by Investment Consultants UAE',
    metaDescription:
      'Explore residency and citizenship by investment programs including UAE Golden Visa, Caribbean citizenship and European residency options.',
    h1: 'Residency & Citizenship Programs',
    heroLead:
      'Secure global mobility through investment-based residency and citizenship programs — the UAE Golden Visa, European residency and Caribbean second citizenship, advised end to end.',
    overview:
      'A second residency or citizenship is one of the most effective ways to protect your family, your assets and your freedom to travel. The Catalyst provides independent, due-diligence-led advice across the leading programs — assessing which route fits your goals and budget, then managing the application from investment to approval.',
    keywords: [
      'Golden Visa UAE',
      'Citizenship by Investment',
      'Residency by Investment',
      'Second Passport Programs',
      'Caribbean citizenship',
      'European residency programs',
    ],
    sections: [
      {
        title: 'Residency by Investment',
        description:
          'Long-term residency in the UAE and Europe through property, business or fund investment.',
        items: ['UAE Golden Visa', 'Portugal Residency', 'Greece Golden Visa', 'Malta Residency'],
      },
      {
        title: 'Citizenship by Investment',
        description:
          'A second passport and visa-free travel through the world’s most established citizenship programs.',
        items: ['St. Kitts & Nevis', 'Dominica', 'Antigua & Barbuda', 'Grenada', 'St. Lucia'],
      },
      {
        title: 'Family Applications',
        description:
          'Bring the whole family — most programs allow you to include your spouse, children and dependent parents.',
        items: ['Spouse Inclusion', 'Children Inclusion', 'Dependent Parents'],
      },
      {
        title: 'Advisory Services',
        description:
          'Independent, discreet guidance from first assessment to approved application.',
        items: ['Due Diligence', 'Investment Assessment', 'Application Management'],
      },
    ],
    whyChooseUs: [
      'Independent, program-agnostic advice',
      'Full family inclusion planning',
      'Rigorous due-diligence support',
      'Discreet, end-to-end application management',
    ],
    faqs: [
      {
        q: 'What is the UAE Golden Visa and who qualifies?',
        a: 'The Golden Visa is a 5 or 10-year renewable UAE residency for investors, entrepreneurs, skilled professionals and outstanding talent. We assess your eligibility route — property, company or talent — and manage the application.',
      },
      {
        q: 'What is the difference between residency and citizenship by investment?',
        a: 'Residency by investment gives you the right to live in a country (e.g. the UAE or Portugal), while citizenship by investment grants a passport and, usually, visa-free travel. We help you choose based on mobility, tax and family goals.',
      },
      {
        q: 'How long does a Caribbean citizenship program take?',
        a: 'Most Caribbean citizenship-by-investment programs are completed in roughly 4–8 months from application to passport, subject to due diligence. We manage the timeline and documentation throughout.',
      },
      {
        q: 'Can I include my family in the application?',
        a: 'Yes. Nearly all programs allow you to include your spouse and children, and many also permit dependent parents. We structure the application to cover your whole family cost-effectively.',
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
