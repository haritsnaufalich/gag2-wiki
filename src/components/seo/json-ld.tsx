/**
 * SEO helper: renders a `<script type="application/ld+json">` tag.
 *
 * The `dangerouslySetInnerHTML` route is the standard pattern for
 * JSON-LD in React. The content is JSON we built ourselves, so it's
 * safe to inject without escaping. Search engines and other
 * structured-data consumers parse the rendered HTML and read the
 * JSON-LD payload; React itself does not execute the script.
 *
 * If you need per-page metadata, render one of these at the top of
 * the page component, e.g.:
 *
 *   <JsonLd schema={{
 *     "@context": "https://schema.org",
 *     "@type": "Article",
 *     "headline": "Bamboo - Grow A Garden 2 Wiki",
 *     "url": "https://haritsnaufalich.github.io/gag2-wiki/crops/bamboo",
 *   }} />
 */

export const SITE_URL = "https://haritsnaufalich.github.io/gag2-wiki";
export const SITE_NAME = "Grow A Garden 2 Wiki";
export const SITE_DESCRIPTION =
  "Community-driven crop database, mutations, calculators, and tools for Grow A Garden 2 on Roblox.";

export const PUBLISHER = {
  "@type": "Person",
  name: "haritsnaufalich",
  url: "https://github.com/haritsnaufalich",
} as const;

export const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Site-wide WebSite schema (static; matches the one in index.html). */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: PUBLISHER,
} as const;
