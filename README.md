# Nicolás Quiroga — Portfolio

A handcrafted personal portfolio built with Next.js 14+, Tailwind CSS, and Framer Motion. Dark theme, electric accents, brutalist-meets-editorial design.

---

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Customize Content

All content lives in a single file:

```
src/data/portfolio.ts
```

zero hardcoded strings in components.

### Changing your accent color

Edit `src/app/globals.css` and `src/components/ui/Cursor.tsx` — search for `#00ff87` and replace with your hex.

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Click **Deploy** — no config needed.

The project is static-friendly out of the box.
