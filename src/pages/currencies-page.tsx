import { Coins, Wallet, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  CURRENCY_PACKS,
  ROBUX_FEATURES,
  FRIEND_BOOST_PCT_PER_FRIEND,
  FRIEND_BOOST_MAX_FRIENDS,
} from "@/data/currencies";
import { trackOnce } from "@/lib/use-plausible";

export function CurrenciesPage() {
  trackOnce("Currencies browse", "currencies:all", {});
  return (
    <div className="container py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Coins className="h-7 w-7 text-amber-400" /> Currencies
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          GAG2 uses two currencies: <strong className="text-foreground">Sheckles</strong> (the
          in-game primary currency, shown as <code className="text-emerald-400">¢</code>)
          and <strong className="text-foreground">Robux</strong> (Roblox's premium
          currency for cosmetic and time-skip purchases).
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-emerald-400" />
            <h2 className="font-semibold">Friend boost</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Every friend in the same server grants a{" "}
            <span className="text-emerald-400 font-medium">
              +{FRIEND_BOOST_PCT_PER_FRIEND}% Sheckle boost
            </span>
            , up to a maximum of{" "}
            <span className="text-emerald-400 font-medium">
              +{FRIEND_BOOST_PCT_PER_FRIEND * FRIEND_BOOST_MAX_FRIENDS}%
            </span>{" "}
            at {FRIEND_BOOST_MAX_FRIENDS} friends.
          </p>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Wallet className="h-4 w-4 text-amber-400" /> Sheckle packs (Robux)
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        {CURRENCY_PACKS.map((p) => (
          <Card key={p.amount} className="hover:border-emerald-400/40 transition-all">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">
                {p.amount.toLocaleString()} ¢
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {p.priceRobux.toLocaleString()} R$
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Coins className="h-4 w-4 text-amber-400" /> Robux features
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ROBUX_FEATURES.map((f) => (
          <Card key={f.slug} className="hover:border-emerald-400/40 transition-all">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold leading-tight">{f.name}</h3>
                <span className="text-sm font-mono text-amber-400 shrink-0">
                  {typeof f.costRobux === "number"
                    ? `${f.costRobux.toLocaleString()} R$`
                    : f.costRobux}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.effect}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
