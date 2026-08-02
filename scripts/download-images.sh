#!/usr/bin/env bash
# Download the Higgsfield-generated site images into public/images/.
# Run this from the project root on a machine with normal internet access:
#   bash scripts/download-images.sh
# Then set USE_LOCAL = true in src/lib/images.ts to serve the local copies.

set -euo pipefail

CDN="https://d8j0ntlcm91z4.cloudfront.net/user_38lHSxcUJfNcAg9aD6xcFUQ4rlj"
DIR="public/images"
mkdir -p "$DIR"

download() {
  local name="$1" file="$2"
  echo "→ $name"
  curl -fSL -o "$DIR/$name.webp" "$CDN/$file"
}

download "home-hero-meeting"               "hf_20260802_070524_df8b4150-0a05-4d32-8e0e-7a469162d0e4_min.webp"
download "service-business-setup"          "hf_20260802_061755_71f1f5ec-2ee1-4dc4-bec0-64d599dc6303_min.webp"
download "service-business-banking"        "hf_20260802_061759_ea4a0107-d52f-4c1a-8f41-84935ad88a1b_min.webp"
download "service-taxation-bookkeeping"    "hf_20260802_061802_736af083-7e06-4708-a315-b41a1e838422_min.webp"
download "service-immigration-citizenship" "hf_20260802_061805_c0f805dc-e890-4a10-82e4-42d104e3a941_min.webp"
download "about-team"                       "hf_20260802_061807_b2a9f003-5088-47e4-8e2a-2956541359e8_min.webp"
download "blog-business-setup"              "hf_20260802_061817_c0a683d5-2d17-4b01-b48a-a1130381d2d7_min.webp"
download "blog-freezones"                   "hf_20260802_070529_eb2ad5d8-24d7-4ad5-8ec6-9c4f92bc3925_min.webp"
download "blog-mainland"                     "hf_20260802_070734_7be27f58-a9df-43eb-bf48-0d47e0472488_min.webp"
download "blog-banking"                     "hf_20260802_061820_9b7d2e90-b662-4169-9872-8d419e6e3385_min.webp"
download "blog-taxation"                    "hf_20260802_061824_f983482b-7fe0-4ed9-80d6-8db96f22a839_min.webp"
download "blog-immigration"                 "hf_20260802_061829_71edc195-4c40-46a7-936b-ccf33fe999d6_min.webp"

echo ""
echo "✓ Downloaded $(ls -1 "$DIR"/*.webp | wc -l | tr -d ' ') images to $DIR"
echo "  Next: set USE_LOCAL = true in src/lib/images.ts"
