import { cn } from "@/lib/utils";
import type { TierId } from "@/data/tiers";
import { TIER_MAP } from "@/data/tiers";

interface TierBadgeProps {
  tier: TierId;
  size?: "sm" | "md";
  className?: string;
}

export function TierBadge({ tier, size = "sm", className }: TierBadgeProps) {
  const t = TIER_MAP[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-background/60 font-medium",
        t.borderClass,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", t.dotClass)} />
      {t.label}
    </span>
  );
}

export function TierDot({ tier, className }: { tier: TierId; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        TIER_MAP[tier].dotClass,
        className
      )}
    />
  );
}
