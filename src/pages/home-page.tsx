import { Link } from "react-router-dom";
import { ArrowRight, Sprout, Sparkles, Calculator, Layers, Settings2, GitCompare, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CROPS, TIERS, WIKI_STATS } from "@/data";
import { formatNumber } from "@/lib/utils";

const QUICK_FEATURES = [
  { icon: Sprout, title: "Crop Database", desc: "30 crops across 8 tiers.", href: "/crops" },
  { icon: Sparkles, title: "Mutations", desc: "Gold, Rainbow, Electric…", href: "/mutations" },
  { icon: Calculator, title: "Value Calculator", desc: "Stack mutations, see totals.", href: "/calculator" },
  { icon: GitCompare, title: "Compare", desc: "Side-by-side ROI breakdown.", href: "/compare" },
  { icon: Layers, title: "Tier Progression", desc: "Common → Super → Pack drops.", href: "/crops" },
  { icon: Settings2, title: "Game Systems", desc: "Time, economy, stealing rules.", href: "/systems" },
];

export function HomePage() {
  const featured = CROPS.filter((c) => c.tier === "legendary").slice(0, 4);
  const packSeeds = CROPS.filter((c) => c.tier === "unknown").slice(0, 5);

  return (
    <div className="bg-emerald-ambient">
      {/* Hero */}
      <section className="container pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-full w-2 rounded-full bg-emerald-400" />
            </span>
            Live · v{WIKI_STATS.version} · Updated {WIKI_STATS.lastUpdated}
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-balance">
            The companion wiki for{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Grow A Garden 2
            </span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl text-balance">
            {WIKI_STATS.totalCrops} crops across {WIKI_STATS.totalTiers} tiers,{" "}
            {WIKI_STATS.totalMutations} mutations, plus calculators and
            comparison tools that actually respect the math.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/crops">
                Browse Crops <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/calculator">Open Calculator</Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            <Stat label="Crops" value={WIKI_STATS.totalCrops.toString()} />
            <Stat label="Tiers" value={WIKI_STATS.totalTiers.toString()} />
            <Stat label="Mutations" value={WIKI_STATS.totalMutations.toString()} />
            <Stat label="Systems" value={WIKI_STATS.totalSystems.toString()} />
          </div>
        </div>
      </section>

      {/* Active Code banner */}
      <section className="container">
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-400/10 text-emerald-400">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Active code
              </div>
              <code className="font-mono text-lg text-emerald-400">
                {WIKI_STATS.activeCode}
              </code>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Redeem in-game for 3 free Green Bean seeds. Codes expire — check
            the systems page for more.
          </p>
        </div>
      </section>

      {/* Quick features */}
      <section className="container py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_FEATURES.map(({ icon: Icon, title, desc, href }) => (
            <Link key={title} to={href} className="group">
              <Card className="h-full p-5 transition-all hover:border-emerald-400/40 hover:-translate-y-0.5">
                <Icon className="h-5 w-5 text-emerald-400" />
                <h3 className="mt-3 font-semibold group-hover:text-emerald-400 transition-colors">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Unknown seeds strip */}
      <section className="container pb-10">
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              the wiki drops
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Pack-exclusive seeds with no shop listing. Roll to obtain.
            </p>
          </div>
          <Link
            to="/crops#tier-pack"
            className="text-sm text-emerald-400 hover:underline inline-flex items-center gap-1"
          >
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {packSeeds.map((c) => (
            <Link
              key={c.slug}
              to={`/crops/${c.slug}`}
              className="rounded-xl border border-border/60 bg-card/60 p-3 hover:border-fuchsia-400/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{c.emoji}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-400" />
              </div>
              <h3 className="mt-2 font-medium text-sm group-hover:text-fuchsia-400 transition-colors">
                {c.name}
              </h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Pack exclusive
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured crops */}
      <section className="container py-10">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured · Legendary
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              The chase that defines top-tier plots.
            </p>
          </div>
          <Link
            to="/crops"
            className="text-sm text-emerald-400 hover:underline inline-flex items-center gap-1"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c) => (
            <Link
              key={c.slug}
              to={`/crops/${c.slug}`}
              className="group rounded-xl border border-border/60 bg-card/60 p-5 hover:border-emerald-400/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{c.emoji}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {c.tier}
                </span>
              </div>
              <h3 className="mt-3 font-semibold group-hover:text-emerald-400 transition-colors">
                {c.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {c.blurb}
              </p>
              <div className="mt-3 text-xs text-muted-foreground">
                Base value ·{" "}
                <span className="text-foreground font-medium">
                  {formatNumber(c.baseValue)}
                </span>{" "}
                ¢
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tier ladder */}
      <section className="container py-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-1">
          Tier Ladder
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Visual progression from common to pack drops.
        </p>
        <Card className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            {TIERS.map((t, i) => {
              const count = CROPS.filter((c) => c.tier === t.id).length;
              return (
                <div key={t.id} className="flex items-center gap-2">
                  <Link
                    to={`/crops#tier-${t.id}`}
                    className="group flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 hover:border-emerald-400/40 transition-all"
                  >
                    <span className={`h-2 w-2 rounded-full ${t.dotClass}`} />
                    <span className="text-sm font-medium">{t.label}</span>
                    <span className="text-xs text-muted-foreground">
                      · {count}
                    </span>
                  </Link>
                  {i < TIERS.length - 1 && (
                    <span className="text-muted-foreground/40">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/60 p-3">
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  );
}
