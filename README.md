# PixelRoar Next

New Next.js site for PixelRoar Creative Studio, based on the public content at https://pixelroar.ai.studio/ (checked 23 November 2026). The original PixelRoar logo was downloaded from that site into `public/pixelroar-logo.png`, and the black, electric-blue and violet theme follows its existing palette.

## Run

```powershell
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run build` for a production build.

## Content and design

Services, brand positioning, email, phone, social links and Islamabad location were checked against the existing website and public PixelRoar profiles. The selected-work names come from the public Behance profile. Visual treatments in the work cards are original illustrations, not actual client work thumbnails. The 3D hero uses CSS transforms and pointer movement, with reduced-motion support.

The site has not been published. It includes browser favicon files, app icons, a web manifest, robots rules, and a sitemap for `pixelroar.ai.studio`. Google will display the new favicon only after this build replaces the public site and Google recrawls it; local development changes cannot update search results.

## Inquiry form with Resend

The form sends inquiries to `pixelroar.cs@gmail.com` through the server-side route in `app/api/inquiry/route.ts`. Create `.env.local` from `.env.example` and set:

- `RESEND_API_KEY` — a Resend sending key.
- `RESEND_FROM_EMAIL` — a sender on a domain verified in Resend, for example `PixelRoar <hello@your-verified-domain.com>`.

Restart the dev server after setting them. With no credentials, the form displays an honest error and offers direct email and WhatsApp links; it does not claim the inquiry was sent. The API key is never exposed to the browser. See [Resend's Next.js guide](https://resend.com/nextjs) and [domain guidance](https://resend.com/changelog/new-domains-workflow).
