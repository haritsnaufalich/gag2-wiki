/**
 * Design tokens for the GAG2 Wiki.
 *
 * Use these for cases Tailwind classes can't reach — SVG fills/strokes,
 * inline `style={}` blocks, canvas, dynamic CSS, third-party widgets.
 * For component-level styling in JSX, prefer Tailwind classes
 * directly: the hex values here mirror Tailwind's palette (emerald-400,
 * amber-400, etc.) so visual consistency is automatic when both systems
 * agree.
 *
 * If you find yourself hardcoding a hex / rgb / shadow / radius anywhere
 * outside Tailwind, reach for these tokens first.
 */

/** Brand and accent colors (hex). Mirrors Tailwind's palette. */
export const colors = {
  emerald400: "#34d399",
  emerald500: "#10b981",
  amber400:   "#fbbf24",
  rose500:    "#f43f5e",
  sky400:     "#38bdf8",
  violet400:  "#a78bfa",
  lime500:    "#84cc16",
  slate900:   "#0f172a",
} as const;

/** Same colors in `rgb(R G B)` form — for SVG attribute contexts. */
export const rgb = {
  emerald400: "rgb(52 211 153)",
  amber400:   "rgb(251 191 36)",
  slate900:   "rgb(15 23 42)",
} as const;

/** Palette used by `value-curve-chart.tsx`. */
export const chart = {
  /** Power-law fit line. */
  curve: rgb.emerald400,
  /** Observed data points (amber for contrast against the emerald line). */
  point: rgb.amber400,
  /** Dark stroke around points so they pop on light backgrounds too. */
  pointRing: rgb.slate900,
} as const;

/** Typography. The same family is loaded via index.html `<link>`. */
export const font = {
  family: "'Poppins', system-ui, sans-serif",
} as const;

export type ColorToken = keyof typeof colors;
export type RgbToken = keyof typeof rgb;
export type ChartToken = keyof typeof chart;
