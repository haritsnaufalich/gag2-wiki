import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

/**
 * Fire a Plausible custom event. Safe to call from anywhere
 * (theme provider, page components, effects) — no React context
 * required, no router required. No-ops if Plausible hasn't loaded
 * yet (e.g., in dev mode) or if `window.plausible` is missing.
 */
export function track(
  event: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;
  window.plausible(event, props ? { props } : undefined);
}

/**
 * Hook for hash-route pageview tracking. Call once near the root.
 * The hook does NOT need to be called by pages — they can import
 * the global `track()` directly for custom engagement events.
 */
export function usePlausible() {
  const location = useLocation();
  const lastPath = useRef<string>("");

  useEffect(() => {
    const path = location.pathname + location.search + location.hash;
    if (path === lastPath.current) return;
    lastPath.current = path;
    track("pageview");
  }, [location]);
}

/**
 * Dedupe helper — only fire if the signature (event + props) has
 * changed since the last call. Useful for toggle / continuous inputs
 * where the user might trigger the same event many times.
 */
export function trackOnce(
  event: string,
  signature: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  const w = window as Window & { __gag2_last_track__?: string };
  if (w.__gag2_last_track__ === signature) return;
  w.__gag2_last_track__ = signature;
  track(event, props);
}
