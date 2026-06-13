import { Settings2, Clock, Coins, Sprout, Users, Moon, Gift, ShieldCheck } from "lucide-react";
import { SYSTEMS } from "@/data/systems";
import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

const CATEGORY_META: Record<string, { label: string; icon: ReactNode; tint: string }> = {
  time:    { label: "Time & Cycles",    icon: <Clock className="h-3.5 w-3.5" />,     tint: "text-sky-400" },
  economy: { label: "Economy & Shop",   icon: <Coins className="h-3.5 w-3.5" />,     tint: "text-amber-400" },
  social:  { label: "Guilds & Events",  icon: <Users className="h-3.5 w-3.5" />,      tint: "text-violet-400" },
  growth:  { label: "Growth & Decay",   icon: <Sprout className="h-3.5 w-3.5" />,     tint: "text-lime-400" },
  steal:   { label: "Stealing & Risk",  icon: <Moon className="h-3.5 w-3.5" />,       tint: "text-rose-400" },
};

const CATEGORY_ORDER = ["time", "economy", "social", "growth", "steal"];

export function SystemsPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    systems: SYSTEMS.filter((s) => s.category === cat),
  })).filter((g) => g.systems.length > 0);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Settings2 className="h-7 w-7 text-emerald-400" /> Game Systems
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          The underlying rules that drive Grow A Garden 2 — time cycles, the
          economy, social events, and the bits that bite you back at night.
        </p>
      </div>

      <div className="space-y-8">
        {grouped.map(({ cat, systems }) => {
          const meta = CATEGORY_META[cat];
          return (
            <section key={cat}>
              <h2
                className={`text-sm font-semibold uppercase tracking-wider mb-3 inline-flex items-center gap-2 ${meta.tint}`}
              >
                {meta.icon} {meta.label}
              </h2>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {systems.map((s) => (
                  <Card
                    key={s.slug}
                    className="h-full hover:border-emerald-400/40 transition-all"
                  >
                    <CardContent className="p-5 space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-xl shrink-0">
                          <span aria-hidden>{s.emoji}</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold leading-tight">
                            {s.title}
                          </h3>
                          <p className="text-xs text-emerald-400 font-medium">
                            {s.short}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.detail}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}

        <section className="rounded-2xl border border-border/60 bg-card/40 p-6">
          <div className="flex items-start gap-3">
            <Gift className="h-5 w-5 text-emerald-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg">Active code</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Redeem in-game for free seeds. Codes expire, so check back
                often.
              </p>
              <code className="mt-3 inline-block rounded-md bg-secondary px-3 py-1.5 text-sm font-mono text-emerald-400">
                TEAMGREENBEAN
              </code>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-6 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm">Community-sourced</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
              These are the rules players have observed and reported. Values
              shift with patches — verify against the live changelog before
              planning around specific numbers.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
