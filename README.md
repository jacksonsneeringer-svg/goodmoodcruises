# Good Mood Cruises — splash page

One page. The name, a cruise ship photograph, and nothing else. There are no
links, no buttons, no forms and no JavaScript — nothing on the page is
clickable or functional by design.

```
index.html    the page
styles.css    all styling (custom properties at the top of the file)
```

## Run it locally

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy

Any static host works — GitHub Pages, Netlify, Cloudflare Pages, S3. For GitHub
Pages, enable Pages on this repo and point it at the branch root.

## The photograph

The background is served straight from the Pexels CDN:

> "Cruise Ship" by David Dibert — https://www.pexels.com/photo/cruise-ship-635512/

To swap it, replace the `src` and `srcset` URLs on the `.photo` image in
`index.html` (and the credit line just below the wordmark). Pexels CDN URLs take
`?auto=compress&cs=tinysrgb&w=<width>` for sizing.

If the photo ever fails to load, the page falls back to an ocean gradient
defined on `.stage` in `styles.css`, so the wordmark always stays legible.

## What to customize

| Thing | Where |
|---|---|
| Colors | `:root` custom properties at the top of `styles.css` |
| Wordmark type and size | `.line-one` / `.line-two` in `styles.css` |
| Grade over the photo | `.tint` and `.grain` in `styles.css` |
| Photo credit | `.credit` paragraph in `index.html` |

## Notes

- Responsive down to 320px; uses `svh` so mobile browser chrome never crops the
  wordmark, plus a short-landscape breakpoint.
- Honors `prefers-reduced-motion` — the fade-in, ken-burns drift and grain
  shimmer all resolve to a still frame.
- Fonts load from Google Fonts with system serif/sans fallbacks, so the page
  still renders offline.
- `pointer-events: none` on `<body>` keeps the page literally uninteractive.
