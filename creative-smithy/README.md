# Creative Smithy — Pricing

Client price list for Creative Smithy, built from one data file so the web page and PDF never disagree.

| File | What it is |
| --- | --- |
| `data.mjs` | All prices, packages, terms and contact details. Edit this. |
| `build.mjs` | Generates the page and the PDF. |
| `index.html` | Pricing page (standalone, responsive, light/dark). |
| `Creative-Smithy-Pricing.pdf` | 6-page A4 PDF to send to clients. |
| `print.html` | Print layout the PDF is rendered from. |
| `artifact.html` | Same page without the HTML skeleton, for hosted previews. |

## Rebuild

```bash
node build.mjs          # page + PDF (needs Playwright with Chromium)
node build.mjs --no-pdf # page only
```

To make a PDF for a specific client, set `preparedFor` in `data.mjs` and rebuild. The issue date and
"valid until" date (30 days) are set from the build date. Fill in `company` contact fields to show
them on the page and in the PDF; empty fields are hidden.
