import { Sprout } from "lucide-react";

/**
 * Generic Suspense fallback for lazy-loaded route pages.
 * On-brand (emerald sprout) and intentionally simple — only visible
 * for a few hundred ms while the chunk downloads.
 */
export function PageSkeleton() {
  return (
    <div
      className="container py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <Sprout className="h-8 w-8 text-emerald-400 animate-pulse" />
      <p className="text-sm">Growing…</p>
    </div>
  );
}
