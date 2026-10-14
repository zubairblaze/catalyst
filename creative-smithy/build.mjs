// Builds the Creative Smithy pricing page and PDF from data.mjs.
//   node build.mjs            -> index.html, print.html, Creative-Smithy-Pricing.pdf
//   node build.mjs --no-pdf   -> HTML only
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import * as D from './data.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = (f) => join(here, f);

const today = new Date();
const fmtDate = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const validUntil = new Date(today.getTime() + D.validDays * 864e5);

const FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@500&display=swap';

const ANVIL = `<svg class="mark" viewBox="0 0 32 24" aria-hidden="true"><path fill="currentColor" d="M1 3h30v5l-8 2-2 4 4 6H7l4-6-2-4-6-2.5z"/><path fill="var(--brass)" d="M24 0h3l-1.5 2z"/></svg>`;
const CHECK = `<svg class="tick" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const cell = (v) =>
  v === 'Yes' ? `<span class="yes">${CHECK}<span class="sr">Included</span></span>`
  : v === '–' ? `<span class="no" aria-label="Not included">–</span>`
  : v;
const price = (t) => `${t.from ? '<span class="from">from</span> ' : ''}${t.price}`;
const per = (s) => (s.billing === 'monthly' ? '<span class="per">/ month</span>' : '');

const contactBits = [
  D.company.contactName, D.company.email, D.company.phone, D.company.website,
].filter(Boolean);

/* ---------------------------------------------------------------- web page */

function webSection(s, i) {
  const num = String(i + 1).padStart(2, '0');
  const head = `<header class="sec-head">
      <p class="eyebrow"><span class="num">${num}</span>${s.subtitle}${s.billing === 'monthly' ? ' · billed monthly' : ' · one-off price'}</p>
      <h2>${s.title}</h2>
      <p class="lead">${s.lead}</p>
    </header>`;
  const notes = s.notes?.length ? `<ul class="notes">${s.notes.map((n) => `<li>${n}</li>`).join('')}</ul>` : '';

  if (s.kind === 'steps') {
    return `<section class="sec" id="${s.id}">${head}
      <ul class="chips" aria-label="Examples">${s.examples.map((e) => `<li>${e}</li>`).join('')}</ul>
      <ol class="steps">${s.steps.map((st) => `<li class="step">
        <h3>${st.name}</h3><p>${st.what}</p><p class="price">${price(st)}</p></li>`).join('')}</ol>
      ${notes}</section>`;
  }

  const n = s.rows.length;
  const cards = s.tiers.map((t, ti) => `<article class="tier${t.popular ? ' popular' : ''}" style="--rows:${n + 2}">
      <div class="tier-top">
        ${t.popular ? '<span class="badge">Most popular</span>' : ''}
        <h3>${t.name}</h3>
        <p class="price">${price(t)} ${per(s)}</p>
      </div>
      <dl>${s.rows.map((r) => `<div class="row"><dt>${r[0]}</dt><dd>${cell(r[ti + 1])}</dd></div>`).join('')}</dl>
    </article>`).join('');
  return `<section class="sec" id="${s.id}">${head}
    <div class="tiers cols-${s.tiers.length}">${cards}</div>${notes}</section>`;
}

function webPage() {
  const navItems = [
    ...D.sections.map((s) => [s.id, s.id === 'woocommerce' ? 'WooCommerce' : s.id === 'shopify' ? 'Shopify' : s.title.replace('Social Media Management', 'Social media').replace('Website Care Plans', 'Care plans')]),
    ['bundles', 'Bundles'], ['addons', 'Add-ons'], ['terms', 'Terms'],
  ];
  return `<title>Creative Smithy Pricing</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Creative Smithy price list: websites, online stores, custom apps, social media, SEO and care plans.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>
/* Layout: a forge-ledger — tight sticky section index, then each service as a row of tier "ingots" aligned on a shared subgrid. */
:root{
  --paper:#F2F3F5; --surface:#FFFFFF; --ink:#17202B; --muted:#5A6472; --line:#D9DEE5;
  --brass:#A3591A; --brass-ink:#FFFFFF; --brass-soft:#F5E7D8; --iron:#1C2632; --iron-ink:#EEF1F4;
  --display:"Bricolage Grotesque", "Avenir Next", "Segoe UI", system-ui, sans-serif;
  --body:"Figtree", "Segoe UI", system-ui, -apple-system, sans-serif;
  --mono:"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
  --r:10px;
}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){
  --paper:#0F141A; --surface:#171E27; --ink:#E8ECF1; --muted:#9AA4B1; --line:#2A3440;
  --brass:#E39A55; --brass-ink:#1A1108; --brass-soft:#2D2116; --iron:#0A0E13; --iron-ink:#E8ECF1; color-scheme:dark } }
:root[data-theme="dark"]{
  --paper:#0F141A; --surface:#171E27; --ink:#E8ECF1; --muted:#9AA4B1; --line:#2A3440;
  --brass:#E39A55; --brass-ink:#1A1108; --brass-soft:#2D2116; --iron:#0A0E13; --iron-ink:#E8ECF1; color-scheme:dark }

*{box-sizing:border-box}
html{scroll-behavior:smooth; scroll-padding-top:72px}
@media (prefers-reduced-motion: reduce){ html{scroll-behavior:auto} }
body{background:var(--paper); color:var(--ink); font:400 16px/1.55 var(--body); margin:0}
.wrap{max-width:1120px; margin:0 auto; padding-left:max(16px, env(safe-area-inset-left, 0px)); padding-right:max(16px, env(safe-area-inset-right, 0px))}
h1,h2,h3{font-family:var(--display); text-wrap:balance; margin:0; letter-spacing:-0.01em}
p{margin:0}
a{color:inherit}
:focus-visible{outline:2px solid var(--brass); outline-offset:2px; border-radius:4px}
.sr{position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap}
.mark{width:30px; height:auto; display:block}

/* masthead */
.mast{background:var(--iron); color:var(--iron-ink)}
.mast .wrap{padding-block:28px 56px; display:grid; gap:40px}
.brand{display:flex; align-items:center; gap:12px; font:700 20px/1 var(--display); letter-spacing:-0.01em}
.hero{display:grid; gap:20px; max-width:62ch}
.hero .eyebrow{color:var(--brass)}
.hero h1{font-size:clamp(2.4rem, 6vw, 4.4rem); font-weight:800; line-height:0.98}
.hero p.intro{font-size:1.125rem; color:color-mix(in srgb, var(--iron-ink) 78%, transparent)}
.facts{display:flex; flex-wrap:wrap; gap:8px 24px; margin:0; padding:0; list-style:none; font:500 12px/1.4 var(--mono); text-transform:uppercase; letter-spacing:0.08em; color:color-mix(in srgb, var(--iron-ink) 70%, transparent)}
.facts li::before{content:"◆"; color:var(--brass); margin-right:8px; font-size:9px; vertical-align:2px}

/* section index */
.index{position:sticky; top:env(safe-area-inset-top, 0px); z-index:5; background:color-mix(in srgb, var(--paper) 92%, transparent); backdrop-filter:blur(8px); border-bottom:1px solid var(--line)}
.index ul{display:flex; gap:4px; list-style:none; margin:0; padding:10px 0; overflow-x:auto; scrollbar-width:none}
.index a{display:block; white-space:nowrap; text-decoration:none; font:500 14px/1 var(--body); color:var(--muted); padding:8px 12px; border-radius:999px}
.index a:hover{color:var(--ink); background:var(--surface)}

/* sections */
main .wrap{display:grid; gap:88px; padding-block:64px 96px}
.sec{display:grid; gap:28px; min-width:0}
.sec-head{display:grid; gap:10px; max-width:65ch}
.eyebrow{font:500 12px/1.3 var(--mono); text-transform:uppercase; letter-spacing:0.1em; color:var(--muted); display:flex; gap:12px; align-items:baseline}
.eyebrow .num{color:var(--brass)}
.sec h2{font-size:clamp(1.8rem, 3.6vw, 2.6rem); font-weight:800; line-height:1.05}
.lead{color:var(--muted); font-size:1.0625rem}

/* tiers on a shared subgrid so rows line up across cards */
.tiers{display:grid; gap:16px; align-items:start}
.tiers.cols-3{grid-template-columns:repeat(3, minmax(0,1fr))}
.tiers.cols-2{grid-template-columns:repeat(2, minmax(0,1fr)); max-width:760px}
.tier{background:var(--surface); border:1px solid var(--line); border-radius:var(--r); display:grid; grid-template-rows:auto 1fr; min-width:0}
.tier.popular{border-color:var(--brass); box-shadow:0 0 0 1px var(--brass)}
.tier-top{padding:22px 22px 18px; display:grid; gap:6px; border-bottom:1px solid var(--line); position:relative}
.tier h3{font-size:1.25rem; font-weight:700}
.price{font:800 2.25rem/1 var(--display); font-variant-numeric:tabular-nums; letter-spacing:-0.02em}
.from,.per{font:500 0.8125rem/1 var(--body); color:var(--muted); letter-spacing:0}
.badge{position:absolute; top:-11px; right:18px; background:var(--brass); color:var(--brass-ink); font:500 11px/1 var(--mono); text-transform:uppercase; letter-spacing:0.08em; padding:6px 10px; border-radius:999px}
.tier dl{margin:0; padding:6px 22px 14px}
.row{display:grid; grid-template-columns:minmax(0,1fr) auto; gap:12px; padding:10px 0; border-bottom:1px dashed var(--line); align-items:baseline}
.row:last-child{border-bottom:0}
.row dt{color:var(--muted); font-size:0.875rem}
.row dd{margin:0; text-align:right; font-weight:600; font-size:0.9375rem; max-width:17ch}
.yes{color:var(--brass); display:inline-flex}
.tick{width:18px; height:18px}
.no{color:var(--muted); opacity:0.6}

.notes{list-style:none; margin:0; padding:0; display:grid; gap:8px; max-width:75ch; color:var(--muted); font-size:0.9375rem}
.notes li{padding-left:18px; position:relative}
.notes li::before{content:""; position:absolute; left:0; top:0.6em; width:8px; height:2px; background:var(--brass)}
.notes strong{color:var(--ink); font-weight:600}

/* apps */
.chips{display:flex; flex-wrap:wrap; gap:8px; list-style:none; margin:0; padding:0}
.chips li{border:1px solid var(--line); border-radius:999px; padding:6px 12px; font-size:0.875rem; color:var(--muted)}
.steps{list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:16px; counter-reset:s}
.step{background:var(--surface); border:1px solid var(--line); border-radius:var(--r); padding:22px; display:grid; grid-template-rows:auto 1fr auto; gap:10px; counter-increment:s}
.step h3{font-size:1.125rem; display:flex; gap:10px; align-items:baseline}
.step h3::before{content:"Step " counter(s); font:500 11px/1 var(--mono); text-transform:uppercase; letter-spacing:0.08em; color:var(--brass)}
.step p{color:var(--muted); font-size:0.9375rem}
.step .price{color:var(--ink); font-size:1.625rem}

/* bundles */
.bundles{display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:16px}
.bundle{background:var(--iron); color:var(--iron-ink); border-radius:var(--r); padding:24px; display:grid; grid-template-rows:auto auto 1fr auto; gap:12px}
.bundle h3{font-size:1.5rem; font-weight:800}
.bundle .inc{color:color-mix(in srgb, var(--iron-ink) 75%, transparent); font-size:0.9375rem}
.bundle .save{color:var(--brass); font:700 1.0625rem/1.3 var(--display); align-self:end}
.bundle .det{font:500 12px/1.5 var(--mono); color:color-mix(in srgb, var(--iron-ink) 65%, transparent); border-top:1px solid color-mix(in srgb, var(--iron-ink) 18%, transparent); padding-top:12px}

/* add-ons: price ledger */
.ledger{list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); column-gap:40px; max-width:900px}
.ledger li{display:flex; align-items:baseline; gap:10px; padding:14px 0; border-bottom:1px solid var(--line)}
.ledger .name{font-weight:600}
.ledger .dots{flex:1; border-bottom:1px dotted var(--line); transform:translateY(-4px); min-width:16px}
.ledger .amt{font:700 1.125rem/1 var(--display); font-variant-numeric:tabular-nums}
.ledger .unit{color:var(--muted); font-size:0.8125rem}

/* process */
.process{list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:0; border-top:2px solid var(--ink)}
.process li{padding:18px 20px 0 0; display:grid; gap:6px; counter-increment:p}
.process{counter-reset:p}
.process li::before{content:counter(p, decimal-leading-zero); font:500 12px/1 var(--mono); color:var(--brass)}
.process h3{font-size:1.125rem}
.process p{color:var(--muted); font-size:0.9375rem}

.terms{columns:2 320px; column-gap:40px; margin:0; padding:0; list-style:none; font-size:0.9375rem; color:var(--muted)}
.terms li{break-inside:avoid; padding:10px 0 10px 18px; position:relative; border-bottom:1px solid var(--line)}
.terms li::before{content:""; position:absolute; left:0; top:1.15em; width:8px; height:2px; background:var(--brass)}
.terms strong{color:var(--ink); font-weight:600}

/* close */
.close{background:var(--iron); color:var(--iron-ink)}
.close .wrap{padding-block:64px; display:grid; gap:16px; max-width:1120px}
.close h2{font-size:clamp(2rem, 4.5vw, 3.2rem); font-weight:800; max-width:18ch}
.close p{max-width:60ch; color:color-mix(in srgb, var(--iron-ink) 78%, transparent); font-size:1.0625rem}
.close .contact{font:500 14px/1.6 var(--mono); color:var(--iron-ink); display:flex; flex-wrap:wrap; gap:6px 24px; user-select:all}
.cta{justify-self:start; background:var(--brass); color:var(--brass-ink); text-decoration:none; font-weight:600; padding:12px 20px; border-radius:999px}
.foot{font:500 12px/1.4 var(--mono); color:color-mix(in srgb, var(--iron-ink) 55%, transparent); display:flex; align-items:center; gap:10px; margin-top:24px}

@media (max-width: 900px){
  .tiers.cols-3, .steps, .bundles{grid-template-columns:minmax(0,1fr)}
  .process{grid-template-columns:repeat(2, minmax(0,1fr)); row-gap:24px}
}
@media (max-width: 640px){
  .tiers.cols-2, .ledger{grid-template-columns:minmax(0,1fr)}
  .process{grid-template-columns:minmax(0,1fr)}
  main .wrap{gap:64px; padding-block:48px 72px}
}
</style>

<div class="mast"><div class="wrap">
  <div class="brand">${ANVIL}<span>${D.company.name}</span></div>
  <div class="hero">
    <p class="eyebrow">Price list · ${today.getFullYear()}</p>
    <h1>Digital Services &amp; Packages</h1>
    <p class="intro">${D.intro}</p>
    <ul class="facts"><li>Prices in GBP</li><li>Excluding VAT</li><li>Valid ${D.validDays} days</li><li>Bundle and save</li></ul>
  </div>
</div></div>

<nav class="index" aria-label="Services"><div class="wrap"><ul>
  ${navItems.map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join('')}
</ul></div></nav>

<main><div class="wrap">
  ${D.sections.map(webSection).join('\n')}

  <section class="sec" id="bundles">
    <header class="sec-head"><p class="eyebrow"><span class="num">08</span>Combine and save</p><h2>Bundles</h2>
      <p class="lead">Pair a Business website with monthly marketing and pay less for both.</p></header>
    <div class="bundles">${D.bundles.map((b) => `<article class="bundle"><h3>${b.name}</h3><p class="inc">${b.includes}</p><p class="save">${b.saving}</p><p class="det">${b.detail}</p></article>`).join('')}</div>
  </section>

  <section class="sec" id="addons">
    <header class="sec-head"><p class="eyebrow"><span class="num">09</span>Extras</p><h2>Add-ons</h2>
      <p class="lead">Add these to any package.</p></header>
    <ul class="ledger">${D.addons.map(([n, a, u]) => `<li><span class="name">${n}</span><span class="dots"></span><span class="amt">${a}</span>${u ? `<span class="unit">${u}</span>` : ''}</li>`).join('')}</ul>
  </section>

  <section class="sec" id="process">
    <header class="sec-head"><p class="eyebrow"><span class="num">10</span>Process</p><h2>How we work</h2></header>
    <ol class="process">${D.process.map(([h, p]) => `<li><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
  </section>

  <section class="sec" id="terms">
    <header class="sec-head"><p class="eyebrow"><span class="num">11</span>The small print</p><h2>Terms &amp; payment</h2></header>
    <ul class="terms">${D.terms.map((t) => `<li>${t}</li>`).join('')}</ul>
  </section>
</div></main>

<section class="close" id="next"><div class="wrap">
  <p class="eyebrow" style="color:var(--brass)">Next steps</p>
  <h2>Ready to get started?</h2>
  <p>Book a free 20-minute call or reply to this message. We'll agree your package, then send a short agreement and the first invoice.</p>
  ${D.company.bookingLink ? `<a class="cta" href="${D.company.bookingLink}">Book a free 20-minute call</a>` : ''}
  ${contactBits.length ? `<p class="contact">${contactBits.map((c) => `<span>${c}</span>`).join('')}</p>` : ''}
  <p class="foot">${ANVIL}<span>${D.company.name} · Prices valid ${D.validDays} days from ${fmtDate(today)}</span></p>
</div></section>
`;
}

/* ------------------------------------------------------------------- PDF */

function printSection(s, i) {
  const num = String(i + 1).padStart(2, '0');
  const head = `<header class="sh"><span class="num">${num}</span><div><h2>${s.title} <span class="sub">${s.subtitle}</span></h2><p class="lead">${s.lead}</p></div>
    <span class="bill">${s.billing === 'monthly' ? 'Per month' : 'One-off'}</span></header>`;
  const notes = s.notes?.length ? `<div class="notes">${s.notes.map((n) => `<p>${n}</p>`).join('')}</div>` : '';
  if (s.kind === 'steps') {
    return `<section class="psec">${head}
      <p class="examples"><span>Examples</span> ${s.examples.join(' · ')}</p>
      <table class="grid steps"><thead><tr><th>Step</th><th>What you get</th><th class="r">Price</th></tr></thead><tbody>
      ${s.steps.map((st) => `<tr><td class="lbl">${st.name}</td><td>${st.what}</td><td class="r pr">${price(st)}</td></tr>`).join('')}
      </tbody></table>${notes}</section>`;
  }
  const pop = s.tiers.map((t) => !!t.popular);
  const colgroup = `<colgroup><col class="c-lbl">${s.tiers.map(() => '<col>').join('')}</colgroup>`;
  return `<section class="psec">${head}
    <table class="grid t${s.tiers.length}">${colgroup}<thead>
      <tr class="names"><th></th>${s.tiers.map((t) => `<th class="${t.popular ? 'pop' : ''}">${t.popular ? '<span class="badge">Most popular</span>' : ''}${t.name}</th>`).join('')}</tr>
      <tr class="prices"><th class="lbl">Price${s.billing === 'monthly' ? ' per month' : ''}</th>${s.tiers.map((t) => `<td class="${t.popular ? 'pop' : ''}">${price(t)}</td>`).join('')}</tr>
    </thead><tbody>
      ${s.rows.map((r) => `<tr><td class="lbl">${r[0]}</td>${r.slice(1).map((v, k) => `<td class="${pop[k] ? 'pop' : ''}">${cell(v)}</td>`).join('')}</tr>`).join('')}
    </tbody></table>${notes}</section>`;
}

function printPage() {
  const toc = [
    ...D.sections.map((s) => `${s.title} <em>${s.subtitle}</em>`),
    'Bundles', 'Add-ons', 'How we work', 'Terms &amp; payment',
  ];
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8">
<title>${D.company.name} — Digital Services &amp; Packages</title>
<link rel="stylesheet" href="${FONTS}">
<style>
:root{
  --paper:#FFFFFF; --ink:#17202B; --muted:#5A6472; --line:#D9DEE5; --tint:#F3F4F6;
  --brass:#A3591A; --brass-soft:#F7EBDD; --iron:#1C2632; --iron-ink:#EEF1F4;
  --display:"Bricolage Grotesque", sans-serif; --body:"Figtree", sans-serif; --mono:"JetBrains Mono", monospace;
}
@page{ size:A4; margin:14mm 15mm 16mm;
  @bottom-left{ content:"${D.company.name}  ·  Digital Services & Packages"; font:500 7.5pt "JetBrains Mono", monospace; color:#8A93A0; letter-spacing:0.06em; text-transform:uppercase }
  @bottom-right{ content:"Page " counter(page) " of " counter(pages); font:500 7.5pt "JetBrains Mono", monospace; color:#8A93A0 } }
@page cover{ margin:0; @bottom-left{content:none} @bottom-right{content:none} }
*{box-sizing:border-box}
html,body{margin:0; background:var(--paper); color:var(--ink); font:400 9.5pt/1.5 var(--body); -webkit-print-color-adjust:exact; print-color-adjust:exact}
h1,h2,h3{font-family:var(--display); margin:0; letter-spacing:-0.01em}
p{margin:0}
.mark{width:34px; display:block}

/* cover */
.cover{page:cover; height:297mm; background:var(--iron); color:var(--iron-ink); padding:20mm 18mm; display:grid; grid-template-rows:auto 1fr auto; break-after:page; position:relative; overflow:hidden}
.cover .brand{display:flex; align-items:center; gap:12px; font:700 16pt/1 var(--display)}
.cover .mid{align-self:center; display:grid; gap:8mm}
.cover .eyebrow{font:500 9pt/1 var(--mono); letter-spacing:0.12em; text-transform:uppercase; color:var(--brass)}
.cover h1{font-size:54pt; line-height:0.95; font-weight:800; max-width:11ch}
.cover .intro{font-size:12.5pt; line-height:1.5; max-width:120mm; color:#BCC4CF}
.cover .meta{display:grid; grid-template-columns:repeat(4, auto); justify-content:space-between; gap:4mm 8mm; border-top:1px solid #3A4654; padding-top:7mm}
.cover .meta div{display:grid; gap:2mm}
.cover .meta dt{font:500 7.5pt/1 var(--mono); letter-spacing:0.1em; text-transform:uppercase; color:#8A96A5}
.cover .meta dd{margin:0; font:600 10.5pt/1.35 var(--body); white-space:nowrap}
.cover .toc{list-style:none; margin:0; padding:0; columns:2; column-gap:10mm; font-size:10pt; color:#BCC4CF; counter-reset:t}
.cover .toc li{counter-increment:t; padding:1.6mm 0; border-bottom:1px solid #2C3846; break-inside:avoid}
.cover .toc li::before{content:counter(t, decimal-leading-zero); font:500 8pt var(--mono); color:var(--brass); margin-right:4mm}
.cover .toc em{font-style:normal; color:#7F8B9A}
.cover .glow{position:absolute; right:-40mm; top:-30mm; width:150mm; height:150mm; border-radius:50%; background:radial-gradient(circle, rgba(227,154,85,0.28), rgba(227,154,85,0) 65%)}
.cover > *{position:relative}

/* sections */
.psec{break-inside:avoid; margin-bottom:5mm}
.psec.brk{break-before:page}
.sh{display:grid; grid-template-columns:auto 1fr auto; gap:5mm; align-items:start; padding-bottom:2.5mm; margin-bottom:3mm; border-bottom:2px solid var(--ink)}
.sh .num{font:500 9pt/1 var(--mono); color:var(--brass); padding-top:2.2mm}
.sh h2{font-size:18pt; font-weight:800; line-height:1.05}
.sh .sub{font-weight:500; color:var(--muted); font-size:13pt}
.sh .lead{color:var(--muted); margin-top:1.5mm; font-size:9.5pt}
.sh .bill{font:500 7.5pt/1 var(--mono); text-transform:uppercase; letter-spacing:0.1em; color:var(--muted); border:1px solid var(--line); border-radius:99px; padding:2mm 3mm; white-space:nowrap; margin-top:1.5mm}

table.grid{width:100%; border-collapse:collapse; table-layout:fixed}
table.grid col.c-lbl{width:34%}
table.t2 col.c-lbl{width:44%}
.grid th,.grid td{padding:1.45mm 3mm; text-align:left; vertical-align:top; border-bottom:1px solid var(--line); font-size:8.6pt; line-height:1.4}
.grid tbody tr:last-child td{border-bottom:0}
.grid td.lbl, .grid th.lbl{color:var(--muted); font-weight:400}
.grid td:not(.lbl){font-weight:600}
.grid .pop{background:var(--brass-soft)}
.grid thead tr.names th{font:700 11pt/1.2 var(--display); padding-top:3mm; border-bottom:0; position:relative}
.grid thead tr.names th.pop{border-radius:3mm 3mm 0 0}
.grid .badge{display:block; font:500 6.5pt/1 var(--mono); letter-spacing:0.1em; text-transform:uppercase; color:var(--brass); margin-bottom:1.2mm}
.grid thead tr.prices td{font:800 17pt/1 var(--display); font-variant-numeric:tabular-nums; padding-bottom:2.5mm; border-bottom:1px solid var(--ink)}
.grid thead tr.prices th{vertical-align:bottom; border-bottom:1px solid var(--ink); font-size:8.5pt; padding-bottom:2.5mm}
.from{font:500 8pt var(--body); color:var(--muted); letter-spacing:0}
.yes{color:var(--brass); display:inline-flex}
.tick{width:12pt; height:12pt}
.no{color:#A7AFBA; font-weight:400}
.sr{display:none}
.steps th{font:500 7.5pt/1 var(--mono); letter-spacing:0.1em; text-transform:uppercase; color:var(--muted); border-bottom:1px solid var(--ink)}
.steps col{width:auto}
.steps td.lbl{color:var(--ink); font-weight:700; width:30%}
.steps td.pr{font:800 12pt/1.2 var(--display); white-space:nowrap}
.r{text-align:right !important}
.examples{font-size:9pt; margin-bottom:3mm; color:var(--ink)}
.examples span{font:500 7.5pt var(--mono); letter-spacing:0.1em; text-transform:uppercase; color:var(--brass); margin-right:2mm}

.notes{margin-top:3mm; display:grid; gap:1.2mm; font-size:8.5pt; color:var(--muted); padding-left:4mm; border-left:2px solid var(--brass)}
.notes strong{color:var(--ink); font-weight:600}

.bundles{display:grid; grid-template-columns:repeat(3, 1fr); gap:4mm}
.bundle{background:var(--iron); color:var(--iron-ink); border-radius:3mm; padding:4.5mm; display:grid; grid-template-rows:auto auto 1fr auto; gap:2mm}
.bundle h3{font-size:13pt; font-weight:800}
.bundle .inc{color:#BCC4CF; font-size:8.5pt}
.bundle .save{color:#E39A55; font:700 10pt/1.3 var(--display); align-self:end}
.bundle .det{font:500 7.3pt/1.5 var(--mono); color:#9AA5B3; border-top:1px solid #3A4654; padding-top:2.5mm}

.two{display:grid; grid-template-columns:1fr 1fr; gap:10mm}
.ledger{list-style:none; margin:0; padding:0; columns:2; column-gap:10mm}
.ledger li{break-inside:avoid}
.ledger li{display:flex; align-items:baseline; gap:2mm; padding:1.6mm 0; border-bottom:1px solid var(--line)}
.ledger .dots{flex:1; border-bottom:1px dotted #B9C0CA; transform:translateY(-1mm)}
.ledger .name{font-weight:600}
.ledger .amt{font:700 11pt var(--display)}
.ledger .unit{color:var(--muted); font-size:8pt}
.process{list-style:none; margin:0; padding:0; counter-reset:p}
.process{display:grid; grid-template-columns:repeat(4, 1fr); gap:6mm}
.process li{counter-increment:p; display:grid; gap:1.5mm; align-content:start}
.process li::before{content:counter(p, decimal-leading-zero); font:500 9pt/1 var(--mono); color:var(--brass)}
.process h3{font-size:10.5pt}
.process p{color:var(--muted); font-size:8.8pt}
.terms{list-style:none; margin:0; padding:0; columns:2; column-gap:10mm; font-size:8.8pt; color:var(--muted)}
.terms li{break-inside:avoid; padding:1.1mm 0 1.1mm 4mm; position:relative; border-bottom:1px solid var(--line)}
.terms li::before{content:""; position:absolute; left:0; top:3.2mm; width:2mm; height:0.5mm; background:var(--brass)}
.terms strong{color:var(--ink); font-weight:600}

.next{background:var(--iron); color:var(--iron-ink); border-radius:3mm; padding:5mm 7mm; display:grid; grid-template-columns:1fr auto; gap:6mm; align-items:end; break-inside:avoid}
.next h2{font-size:17pt; font-weight:800}
.next p{color:#BCC4CF; margin-top:1mm; max-width:115mm}
.next .contact{font:500 8.5pt/1.7 var(--mono); color:var(--iron-ink); text-align:right}
.next .contact a{color:#E39A55; text-decoration:none}
</style></head><body>

<section class="cover">
  <div class="glow"></div>
  <div class="brand">${ANVIL.replace('var(--brass)', '#E39A55')}<span>${D.company.name}</span></div>
  <div class="mid">
    <p class="eyebrow">Client price list · ${today.getFullYear()}</p>
    <h1>Digital Services &amp; Packages</h1>
    <p class="intro">${D.intro}</p>
    <ol class="toc">${toc.map((t) => `<li>${t}</li>`).join('')}</ol>
  </div>
  <dl class="meta">
    ${D.preparedFor ? `<div><dt>Prepared for</dt><dd>${D.preparedFor}</dd></div>` : ''}
    <div><dt>Issued</dt><dd>${fmtDate(today)}</dd></div>
    <div><dt>Valid until</dt><dd>${fmtDate(validUntil)}</dd></div>
    <div><dt>Currency</dt><dd>GBP, excl. VAT</dd></div>
    ${contactBits.length ? `<div><dt>Contact</dt><dd>${contactBits.join('<br>')}</dd></div>` : ''}
  </dl>
</section>

${D.sections.map((s, i) => printSection(s, i).replace('class="psec"', `class="psec${[0, 1, 3, 5].includes(i) ? ' brk' : ''}"`)).join('\n')}

<section class="psec brk">
  <header class="sh"><span class="num">08</span><div><h2>Bundles</h2><p class="lead">Pair a Business website with monthly marketing and pay less for both.</p></div><span class="bill">Combine &amp; save</span></header>
  <div class="bundles">${D.bundles.map((b) => `<article class="bundle"><h3>${b.name}</h3><p class="inc">${b.includes}</p><p class="save">${b.saving}</p><p class="det">${b.detail}</p></article>`).join('')}</div>
</section>

<section class="psec">
  <header class="sh"><span class="num">09</span><div><h2>Add-ons</h2></div><span class="bill">Add to any package</span></header>
  <ul class="ledger">${D.addons.map(([n, a, u]) => `<li><span class="name">${n}</span><span class="dots"></span><span class="amt">${a}</span>${u ? `<span class="unit">${u}</span>` : ''}</li>`).join('')}</ul>
</section>

<section class="psec">
  <header class="sh"><span class="num">10</span><div><h2>How we work</h2></div><span class="bill">First call to results</span></header>
  <ol class="process">${D.process.map(([h, p]) => `<li><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
</section>

<section class="psec">
  <header class="sh"><span class="num">11</span><div><h2>Terms &amp; payment</h2></div></header>
  <ul class="terms">${D.terms.map((t) => `<li>${t}</li>`).join('')}</ul>
</section>

<section class="next">
  <div><h2>Ready to get started?</h2>
  <p>Book a free 20-minute call or reply to this email. We'll agree your package, then send a short agreement and the first invoice.</p></div>
  <div class="contact">
    ${D.company.bookingLink ? `<div><a href="${D.company.bookingLink}">Book a call →</a></div>` : ''}
    ${contactBits.map((c) => `<div>${c}</div>`).join('')}
    <div style="margin-top:2mm;color:#8A96A5">${D.company.name}</div>
  </div>
</section>
</body></html>`;
}

/* ----------------------------------------------------------------- write */

const web = webPage();
writeFileSync(out('artifact.html'), web); // body-only page for hosted preview
writeFileSync(out('index.html'), `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head>
<body>
${web}
</body></html>
`);
writeFileSync(out('print.html'), printPage());

if (!process.argv.includes('--no-pdf')) {
  // Uses a local or global Playwright install (npm i -D playwright).
  const { createRequire } = await import('node:module');
  const { execSync } = await import('node:child_process');
  let pw;
  try { pw = createRequire(import.meta.url)('playwright'); }
  catch { pw = createRequire(join(execSync('npm root -g').toString().trim(), 'noop.js'))('playwright'); }
  const { chromium } = pw;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pathToFileURL(out('print.html')).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out('Creative-Smithy-Pricing.pdf'), preferCSSPageSize: true, printBackground: true });
  await browser.close();
}
console.log('built');
