# Kernel & Co. — Nut shop website

A small, static-feeling Next.js + Tailwind site for a nut wholesale/retail business.

## What's inside

```
src/
├── app/
│   ├── page.tsx               ← Homepage
│   ├── layout.tsx             ← Wraps every page (header + footer)
│   ├── globals.css            ← Colors, fonts, custom styles
│   ├── about/page.tsx         ← Brand story
│   ├── contact/page.tsx       ← Contact form
│   ├── wholesale/page.tsx     ← B2B inquiry page (hotels/bars)
│   └── products/
│       ├── cashews/page.tsx
│       ├── pistachios/page.tsx
│       └── almonds/page.tsx
└── components/
    ├── Header.tsx
    ├── Footer.tsx
    └── ProductPage.tsx        ← Reused by all 3 product pages
```

## Run it

You'll need Node.js installed. On Linux it's usually:

```bash
sudo apt install nodejs npm
# or use nvm — recommended: https://github.com/nvm-sh/nvm
```

Then in this folder:

```bash
npm install      # downloads dependencies (one-time)
npm run dev      # starts the dev server
```

Open http://localhost:3000 in your browser.

## How to change stuff (cheat sheet for poopy-kaki brain)

**Want to change a color?** → `tailwind.config.js` has all the warm/rustic colors named. Change `terracotta`, `clay`, `roast`, etc. once and they update everywhere.

**Want to change the text on the homepage?** → `src/app/page.tsx`. Just look for the words you want to change and edit them.

**Want to add a 4th product?**
1. Make a new folder: `src/app/products/walnuts/`
2. Add `page.tsx` inside it (copy from `cashews/page.tsx` and edit the values)
3. Add it to the menu in `src/components/Header.tsx`

**Want to change the fonts?** → top of `src/app/globals.css`. The `@import url(...)` line pulls in Google Fonts. Pick others from fonts.google.com.

**Want to make the contact form actually send emails?** → Right now it just shows a success message. Look up "Formspree" or "Resend" — both are easy to wire up later.

## Things still to do (when ready)

- [ ] Real photos of the nuts (the SVG illustrations are placeholders)
- [ ] Real prices, real phone, real email, real address
- [ ] Real grower/origin stories (the about page has placeholder copy)
- [ ] Wire up the forms to actually send mail
- [ ] Buy a domain, deploy to Vercel (free, takes 5 min)
- [ ] Add legal pages: privacy, terms, allergen info, food safety cert
