# Good Mood Cruises — splash site

A single-page marketing site for Good Mood Cruises, an independent cruise travel
agency. No build step, no dependencies: three static files you can drop on any
host.

```
index.html    markup + content
styles.css    all styling (custom properties at the top of the file)
script.js     sticky header, mobile nav, scroll reveals, form handling
```

## Run it locally

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy

Any static host works — GitHub Pages, Netlify, Cloudflare Pages, S3. For GitHub
Pages, enable Pages on this repo and point it at the branch root.

## What to customize

| Thing | Where |
|---|---|
| Colors, fonts, spacing | `:root` custom properties at the top of `styles.css` |
| Copy, itineraries, prices | `index.html` — each section is commented |
| Card artwork | `.art-*` gradient rules in `styles.css`; swap in photos with `background-image` |
| Contact details | `index.html` (`#plan` section and footer) and `INBOX` in `script.js` |
| Reviews | `#reviews` section in `index.html` |

### Placeholders to replace before launch

- **Phone number** `(555) 010-2468` is a reserved fictional number.
- **Email** `hello@goodmoodcruises.com` appears in `index.html` (twice in the
  quote section, once in the footer) and as `INBOX` in `script.js`.
- **Stats, fares and reviews** in the hero, destination cards and `#reviews` are
  illustrative — swap in real figures and permissioned testimonials.
- **CLIA / ASTA membership** in the footer — remove if not accurate.

### The quote form

There is no backend, so the form validates in the browser and then opens the
visitor's email client with the answers prefilled. To post to a real endpoint,
replace the `window.location.href = 'mailto:...'` line in `script.js` with a
`fetch()` to your form service or CRM.

## Notes

- Responsive down to 320px; mobile nav below 760px.
- Honors `prefers-reduced-motion` (drops waves, sun bob and scroll reveals).
- Skip link, labeled form fields, inline validation messages, visible focus
  rings, `aria-live` status on submit.
- Fonts load from Google Fonts with system-serif/sans fallbacks, so the page
  still renders offline.
