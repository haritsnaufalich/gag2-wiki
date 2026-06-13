import { Sparkles, Star } from "lucide-react";
import { MUTATIONS, type MutationKind } from "@/data/mutations";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const KIND_META: Record<MutationKind, { label: string; tint: string; icon: typeof Star }> = {
  variant:  { label: "Variant",  tint: "text-amber-400",   icon: Star },
  mutation: { label: "Mutation", tint: "text-violet-400", icon: Sparkles },
};

export function MutationsPage() {
  const variants = MUTATIONS.filter((m) => m.kind === "variant");
  const mutations = MUTATIONS.filter((m) => m.kind === "mutation");
  // Canonical formula: variant × (1 + Σ weather mutations). Variants are
  // the "base layer" — pick the strongest. Weather mutations stack
  // additively into the stack.
  const variantMult = Math.max(
    1,
    ...variants.map((m) => m.multiplier ?? 0).filter((v) => v > 0)
  );
  const weatherMult = MUTATIONS.filter((m) => m.kind === "mutation")
    .map((m) => m.multiplier ?? 0)
    .filter((v) => v > 0)
    .reduce((a, b) => a + b, 0);
  const allMultipliers = variantMult * (1 + weatherMult);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-emerald-400" /> Mutations
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Variants form the base layer (strongest wins); weather mutations
          stack additively into it. The combined formula is{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
            variant × (1 + Σ weather)
          </code>
          .
        </p>
      </div>

      {/* Stack preview */}
      <Card className="mb-8 overflow-hidden">
        <CardContent className="p-5 flex flex-wrap items-center gap-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            Stack all
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {MUTATIONS.map((m) => (
              <span
                key={m.slug}
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs"
              >
                <span>{m.emoji}</span>
                <span className="font-medium">{m.name}</span>
                <span className="text-muted-foreground">
                  {m.multiplier != null ? `×${m.multiplier}` : "TBA"}
                </span>
              </span>
            ))}
          </div>
          <div className="ml-auto text-right">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Combined
            </div>
            <div className="text-2xl font-bold text-emerald-400">
              ×{allMultipliers.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      <Section
        title="Variants"
        subtitle="Replace the plant visually. The most powerful single modifiers."
        items={variants}
        kind="variant"
      />
      <Section
        title="Mutations"
        subtitle="Layer on top of variants. Weather and event-driven."
        items={mutations}
        kind="mutation"
      />
    </div>
  );
}

function Section({
  title,
  subtitle,
  items,
  kind,
}: {
  title: string;
  subtitle: string;
  items: typeof MUTATIONS;
  kind: MutationKind;
}) {
  const meta = KIND_META[kind];
  const Icon = meta.icon;
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-4 w-4 ${meta.tint}`} />
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-xs text-muted-foreground">· {items.length}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <Card
            key={m.slug}
            className="h-full hover:border-emerald-400/40 transition-all"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-2xl">
                  <span aria-hidden>{m.emoji}</span>
                </div>
                <div
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full bg-background/40 border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    meta.tint
                  )}
                >
                  {m.multiplier != null ? `×${m.multiplier}` : "TBA"}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {m.blurb}
                </p>
              </div>
              <div className="pt-2 border-t border-border/40 text-xs text-muted-foreground">
                <span className="uppercase tracking-wider text-[10px]">Source</span>{" "}
                · {m.source}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
