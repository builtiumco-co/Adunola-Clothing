# Adunola Clothings

A responsive fashion website built with React, TypeScript, and Vite. The design follows the supplied Adunola references: warm cream, deep plum, editorial serif typography, outfit inspiration, a personal design process, and a conversation-first enquiry flow.

## Develop

Use Node.js 24 (the tested cloud runtime) and npm.

```sh
cd /workspace/Adunola-Clothing
npm ci
npm run dev
```

The development server listens on port 5173. The cloud task already has an isolated checkout; use it directly rather than creating another worktree. Dependencies remain on disk, but development servers must be restarted for each new machine or task.

```sh
npm run typecheck
npm run build
npm run preview
```

The production build is in `dist/`. The preview server listens on port 4173.

## Pages and behaviour

- `/`: home, outfit carousel, featured looks, the design approach, process, FAQs, and enquiry invitation.
- `/our-work`: all four concepts with Occasion and Everyday filters.
- `/our-work/:slug`: outfit inspiration, colour story, details, and a selected-look enquiry link.
- `/the-experience`: the four-step personal design process and FAQs.
- `/enquire`: a validated enquiry form with an optional inspiration look. The draft is stored only in the current browser tab's session storage.

The form opens WhatsApp with a prepared message addressed to **+234 916 674 2722**. The visitor must send that message in WhatsApp. The website does not independently send messages or store enquiries on a server. To change the public destination number, copy `.env.example` to `.env.local`, edit `VITE_WHATSAPP_NUMBER`, and rebuild.

Fonts and icons are served locally. There is no account, payment, analytics, or third-party image dependency.

## Outfit photographs

The business selected and supplied all four photographs in `Shop.zip`. The original JPEG files are retained unchanged, including existing attribution. Generated and externally sourced alternatives are not included.

| Path | Photograph |
| --- | --- |
| `public/images/scarlet-bloom.jpg` | `Shop/download (3).jpg` — scarlet and gold leaf-print mini dress with bell sleeves |
| `public/images/golden-rhythm.jpg` | `Shop/download (2).jpg` — gold and olive patterned two-piece with a matching headwrap |
| `public/images/emerald-statement.jpg` | `Shop/download (4).jpg` — green geometric-print top and white trousers on a mannequin |
| `public/images/terracotta-muse.jpg` | `Shop/download (1).jpg` — rust and blue patterned, belted shirt dress |

Retain the original photographs and their existing attribution. The gallery presents these as inspiration concepts rather than claiming they are previously commissioned Adunola garments. Update outfit copy in `src/content.ts` when actual product details are confirmed.

## Browser tests

```sh
npx playwright install chromium
npm run build
npm test
```

When `/usr/bin/chromium` is available, tests use it automatically; a separate browser download is unnecessary. An alternative system browser can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Otherwise Playwright uses its installed Chromium.

The test suite covers desktop and mobile navigation, carousel controls, photo loading, gallery filtering, look selection, form validation, WhatsApp recipient and message contents, draft restoration, FAQ accordions, fallback routes, viewport overflow, and automated WCAG accessibility checks. Tests verify the enquiry URL without contacting WhatsApp or sending a message.

## Static hosting

Build with `npm ci && npm run build`, serve `dist/`, and route application paths back to `index.html` so direct visits to outfit and enquiry pages work. Netlify-style redirects and Vercel rewrites are included. The business contact number is public configuration, not a secret.

GitHub Actions runs the production build and browser tests for pushes to `main` and pull requests. Pushing the repository does not publish the website; connect a static hosting provider when a live deployment is wanted.
