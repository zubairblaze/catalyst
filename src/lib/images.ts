/**
 * Site imagery generated with Higgsfield (Recraft V4.1).
 *
 * The sandbox that built this site can't download from the CDN, so the images
 * are referenced by their public Higgsfield CDN URLs by default. For production,
 * run `scripts/download-images.sh` to self-host them under public/images/, then
 * set USE_LOCAL = true below to serve the local copies (better for performance
 * and independence from the CDN).
 */

const USE_LOCAL = false;

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_38lHSxcUJfNcAg9aD6xcFUQ4rlj';

export type ImageKey =
  | 'home-hero-meeting'
  | 'service-business-setup'
  | 'service-business-banking'
  | 'service-taxation-bookkeeping'
  | 'service-immigration-citizenship'
  | 'about-team'
  | 'blog-business-setup'
  | 'blog-freezones'
  | 'blog-mainland'
  | 'blog-banking'
  | 'blog-taxation'
  | 'blog-immigration';

const remote: Record<ImageKey, string> = {
  'home-hero-meeting': `${CDN}/hf_20260802_070524_df8b4150-0a05-4d32-8e0e-7a469162d0e4_min.webp`,
  'service-business-setup': `${CDN}/hf_20260802_061755_71f1f5ec-2ee1-4dc4-bec0-64d599dc6303_min.webp`,
  'service-business-banking': `${CDN}/hf_20260802_061759_ea4a0107-d52f-4c1a-8f41-84935ad88a1b_min.webp`,
  'service-taxation-bookkeeping': `${CDN}/hf_20260802_061802_736af083-7e06-4708-a315-b41a1e838422_min.webp`,
  'service-immigration-citizenship': `${CDN}/hf_20260802_061805_c0f805dc-e890-4a10-82e4-42d104e3a941_min.webp`,
  'about-team': `${CDN}/hf_20260802_061807_b2a9f003-5088-47e4-8e2a-2956541359e8_min.webp`,
  'blog-business-setup': `${CDN}/hf_20260802_061817_c0a683d5-2d17-4b01-b48a-a1130381d2d7_min.webp`,
  'blog-freezones': `${CDN}/hf_20260802_070529_eb2ad5d8-24d7-4ad5-8ec6-9c4f92bc3925_min.webp`,
  'blog-mainland': `${CDN}/hf_20260802_070734_7be27f58-a9df-43eb-bf48-0d47e0472488_min.webp`,
  'blog-banking': `${CDN}/hf_20260802_061820_9b7d2e90-b662-4169-9872-8d419e6e3385_min.webp`,
  'blog-taxation': `${CDN}/hf_20260802_061824_f983482b-7fe0-4ed9-80d6-8db96f22a839_min.webp`,
  'blog-immigration': `${CDN}/hf_20260802_061829_71edc195-4c40-46a7-936b-ccf33fe999d6_min.webp`,
};

export function img(key: ImageKey): string {
  return USE_LOCAL ? `/images/${key}.webp` : remote[key];
}
