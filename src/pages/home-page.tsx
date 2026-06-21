import { ArrowRight, Sprout, Sparkles, Calculator, PawPrint, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CROPS } from "@/data/crops";
import { WIKI_STATS } from "@/data/index";
import { TIERS, type TierId } from "@/data/tiers";
import { TierBadge } from "@/components/crops/tier-badge";
import { useTheme } from "@/components/theme/theme-provider";

type QuickLink = {
  to: string;
  title: string;
  desc: string;
  Icon: typeof Sprout;
  accent: "emerald" | "amber" | "violet" | "rose";
};

const ACCENT_RING: Record<QuickLink["accent"], string> = {
  emerald: "group-hover:border-emerald-400/60 group-focus-visible:border-emerald-400",
  amber: "group-hover:border-amber-400/60 group-focus-visible:border-amber-400",
  violet: "group-hover:border-violet-400/60 group-focus-visible:border-violet-400",
  rose: "group-hover:border-rose-400/60 group-focus-visible:border-rose-400",
};

const ACCENT_ICON: Record<QuickLink["accent"], string> = {
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  violet: "text-violet-400",
  rose: "text-rose-400",
};

export function HomePage() {
  const { theme } = useTheme();
  const dark = theme !== "garden";

  const quickLinks: QuickLink[] = [
    {
      to: "/crops",
      title: "Crops",
      desc: `Browse the ${WIKI_STATS.totalCrops}-crop catalog with values, weights and stock chances.`,
      Icon: Sprout,
      accent: "emerald",
    },
    {
      to: "/calculator",
      title: "Calculator",
      desc: "Estimate Sheckle yield from mutations, friend boost and weight.",
      Icon: Calculator,
      accent: "amber",
    },
    {
      to: "/mutations",
      title: "Mutations",
      desc: `Compare ${WIKI_STATS.totalMutations} variants and weather/event mutations.`,
      Icon: Sparkles,
      accent: "violet",
    },
    {
      to: "/pets",
      title: "Pets",
      desc: `${WIKI_STATS.totalPets} companions with rarity, cost and obtainment sources.`,
      Icon: PawPrint,
      accent: "rose",
    },
  ];

  const featuredCrops = TIERS
    .slice()
    .sort((a, b) => a.order - b.order)
    .flatMap((tier) =>
      CROPS.filter((c) => c.tier === tier.id && c.obtainment !== "unknown" && c.obtainment !== "event")
    )
    .slice(0, 4);

  return (
    <div className="flex flex-col">
      <section
        className="relative overflow-hidden border-b border-border/40"
        style={{
          background: dark
            ? "radial-gradient(ellipse at top, rgba(16,185,129,0.18) 0%, transparent 60%)"
            : "radial-gradient(ellipse at top, rgba(16,185,129,0.08) 0%, transparent 60%)",
        }}
      >
        <div className="container max-w-4xl py-24 md:py-32 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
            Live - {WIKI_STATS.totalCrops} crops - {WIKI_STATS.totalMutations} mutations - {WIKI_STATS.totalTiers} tiers
          </p>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            The companion wiki for
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Grow A Garden 2
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Crops, mutations, pets, calculators and systems sourced from the
            canonical wiki, condensed for fast lookup. No login, no ads, no
            third-party trackers beyond anonymous page-view stats.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/crops"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Browse Crops <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Open Calculator
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="quick-links-heading" className="container max-w-5xl py-16 md:py-20">
        <h2 id="quick-links-heading" className="sr-only">
          Quick links
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((q) => (
            <li key={q.to}>
              <Link
                to={q.to}
                className={`group block h-full rounded-xl border border-border/60 bg-card/40 p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${ACCENT_RING[q.accent]}`}
              >
                <q.Icon className={`h-6 w-6 ${ACCENT_ICON[q.accent]}`} aria-hidden />
                <h3 className="mt-4 font-semibold text-base">{q.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{q.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  Open <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="featured-heading" className="container max-w-5xl pb-16 md:pb-20">
        <div className="flex items-baseline justify-between gap-4 mb-5">
          <h2 id="featured-heading" className="text-lg font-semibold tracking-tight">
            Featured crops
          </h2>
          <Link
            to="/crops"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 rounded-sm"
          >
            View all {WIKI_STATS.totalCrops} <ArrowRight className="inline h-3 w-3" aria-hidden />
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCrops.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/crops/${c.slug}`}
                className="block h-full rounded-lg border border-border/60 bg-card/40 p-4 transition-colors hover:border-emerald-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-2xl" aria-hidden>{c.emoji}</div>
                  <TierBadge tier={c.tier as TierId} />
                </div>
                <h3 className="mt-3 font-semibold text-sm leading-tight">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {c.blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container max-w-5xl pb-20">
        <Card className="overflow-hidden border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-card/40 to-card/40">
          <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-amber-400/15 shrink-0">
              <Gift className="h-6 w-6 text-amber-400" aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base">Active in-game code</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Redeem in Grow A Garden 2 for free seeds. Codes expire, so check back often.
              </p>
            </div>
            <code className="self-start sm:self-center inline-block rounded-md bg-secondary px-4 py-2 text-base font-mono font-semibold text-emerald-400 tracking-wider">
              {WIKI_STATS.activeCode}
            </code>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
