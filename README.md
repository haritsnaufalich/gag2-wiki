# 🌱 Grow A Garden 2 — Wiki Clone

A fan-made, dark-themed, emerald-accented clone of the [Grow A Garden 2 Wiki](https://growagarden2wiki.com/crops/) crop database. Built as a fast, static, single-page app deployable to GitHub Pages.

![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Vite%20%2B%20Tailwind%20%2B%20shadcn-3ecf8e?style=flat-square)
![Theme](https://img.shields.io/badge/Theme-Dark%20%2B%20Emerald-10b981?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=flat-square)

## ✨ Features

- 🌽 **28 crops** across **7 tiers** + an unclassified bucket
- 🔍 **Live search & filter** by name, tag, tier, or multi-harvest preference
- 🧬 **Mutation catalog** with rarity badges and stacking math
- 🧮 **Value calculator** that multiplies base value × quantity × mutation multipliers
- 🌑 **Dark-first theme** with **Supabase emerald** (`#3ecf8e`) accents
- 🔤 **Poppins** font, antialiased
- 📱 **Responsive** — mobile drawer nav, sticky filter bar, scrollable tier sections
- 🪶 **Static output** — no backend, deployable to any static host

## 🚀 Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build locally
```

## 🚢 Deploy to GitHub Pages

This repo includes a ready-to-use GitHub Actions workflow at `.github/workflows/deploy.yml`. To enable:

1. Push this repository to GitHub.
2. In your repo settings → **Pages**, set Source = **GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site will be available at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

The router uses **hash-based** routing (`createHashRouter`) so deep links like `/#/crops/carrot` work on any static host without server rewrites.

## 🎨 Theme

| Token | Value | Purpose |
|---|---|---|
| `--background` | `hsl(0 0% 4%)` | Page background |
| `--card` | `hsl(0 0% 9%)` | Surface cards |
| `--primary` | `hsl(155 76% 52%)` | Supabase emerald `#3ecf8e` |
| `--ring` | `hsl(155 76% 52%)` | Focus rings |
| Font | Poppins (300–800) | Body, headings |
| Rendering | `-webkit-font-smoothing: antialiased` | Crisp type |

The brand palette is exposed as Tailwind colors: `text-emerald-400`, `bg-emerald-400/10`, `ring-emerald-400/30`, etc.

## 🗂 Project structure

```
src/
├── components/
│   ├── ui/          # shadcn-style primitives (button, card, badge, input, …)
│   ├── layout/      # Header, Footer, SiteLayout
│   └── crops/       # CropCard, TierSection, TierBadge, SearchFilter
├── data/
│   ├── crops.ts     # 28 crop records
│   ├── tiers.ts     # Tier metadata
│   └── mutations.ts # Mutation catalog
├── lib/
│   └── utils.ts     # cn(), formatters, slugify
├── pages/
│   ├── home-page.tsx
│   ├── crops-page.tsx
│   ├── crop-detail-page.tsx
│   ├── mutations-page.tsx
│   ├── calculator-page.tsx
│   └── not-found-page.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 🧪 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | `tsc --noEmit` |

## 📝 Data & attribution

This is a **fan-made** project. It is not affiliated with Roblox Corporation or the original wiki authors. The crop database is sourced from the public community wiki and re-described in our own words. Stats shown (grow times, base values) are community estimates for wiki-completeness — verify against in-game data for competitive use.

## 📄 License

MIT — see [LICENSE](./LICENSE).
