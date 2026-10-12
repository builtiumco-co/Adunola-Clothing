# Adunola Clothing

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

- `/`: the brand message, services, custom-ordering process, deposit and delivery information, FAQs, and enquiry invitation.
- `/about`: the owner-confirmed brand story, motto, craftsmanship, affordability, and personal approach.
- `/services`: custom dresses and gowns, two-piece outfits, trousers and tops, casual/formal wear, corporate outfits, native/traditional wear, and sewing with customer-supplied fabric.
- `/the-experience`: custom ordering, quotes, measurements, payment, production, fittings, and collection/delivery.
- `/contact`: business WhatsApp, email, Akure location, Instagram, and a TikTok search link.
- `/policies`: confirmed order information, a distinction between custom and ready-to-wear returns, and a request to agree on unspecified terms before committing.
- `/privacy`: how the form, browser-tab draft, external contact links, and customer photograph permissions work.
- `/enquire`: validated custom enquiry including service, occasion, fabric preference, budget, collection/delivery, and delivery location. Drafts stay in the current browser tab’s session storage and can be cleared.
- `/our-work`, `/our-work/:slug`, `/shop`: coming-soon notices only. Original portfolio and product photos, stock, prices, cart, and checkout are deliberately on hold at the user's request.

The business WhatsApp destination is **09032022101 / +234 903 202 2101**, and email is **olawalebunmi05@gmail.com**. The enquiry form prepares a message; the visitor sends it in WhatsApp. There is no server-side enquiry database or automatic sending. Set the public `VITE_WHATSAPP_NUMBER` build-time override only if the owner changes the destination number.

Confirmed ordering facts: a 70% bank-transfer deposit before production; the remaining 30% according to agreed terms; approximately 3–5 working days for straightforward orders, subject to design and workload; urgent orders according to availability; measurement guidance and fittings where needed; collection in Akure and local/nationwide delivery with fees agreed by location and service.

## Content still awaiting the owner

- Original photographs of Adunola garments, customer orders, creative process, and ready-to-wear products; product prices, sizes, inventory, and purchase terms before enabling the shop.
- Exact cancellation deadlines, deposit refund conditions, separate custom/ready-to-wear return rules, and the fitting-adjustment period. The site asks customers to confirm these directly before paying; it does not invent non-refundable deposits or a return window.
- The exact TikTok profile URL. The supplied name is “adunola clothing,” which contains a space and is not a usable handle. The current link is explicitly a TikTok search, not a guessed profile.
- Permission-backed customer reviews and photographs. No testimonials, ratings, store street address, or opening hours have been invented.
- Bank account details are obtained directly from the business after discussing an order; the site does not collect payment or publish an invented account.

## Existing inspiration photographs

The photographs previously supplied in `Shop.zip` are retained unchanged under `public/images/`. The home page uses only `scarlet-bloom.jpg`, explicitly labelled **Style inspiration**. These photos are not presented as an original Adunola portfolio or purchasable stock. The other files and legacy concept content remain available for reference without active galleries or product pages.

Fonts and icons are served locally. There are no analytics trackers, advertising cookies, or external image requests.

## Browser tests

```sh
npx playwright install chromium
npm run build
npm test
```

When `/usr/bin/chromium` is available, tests use it automatically; a separate browser download is unnecessary. An alternative system browser can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Otherwise Playwright uses its installed Chromium.

The test suite covers desktop and mobile navigation, home inspiration image loading, the portfolio/shop hold, service selection, form validation, the owner-confirmed WhatsApp recipient and full enquiry message, draft restoration and clearing, contact links, delivery anchors, FAQ accordions, fallback routes, viewport overflow, and automated WCAG accessibility checks. Tests verify the enquiry URL without contacting WhatsApp or sending a message.

## Static hosting

Build with `npm ci && npm run build`, serve `dist/`, and route application paths back to `index.html` so direct visits to outfit and enquiry pages work. Netlify-style redirects and Vercel rewrites are included. The business contact number is public configuration, not a secret.

GitHub Actions runs the production build and browser tests for pushes to `main` and pull requests. Pushing the repository does not publish the website; connect a static hosting provider when a live deployment is wanted.
