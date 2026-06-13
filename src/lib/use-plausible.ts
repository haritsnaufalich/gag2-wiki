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
 * Hooks up Plausible pageview tracking for the hash-routed SPA.
 *
 * Plausible auto-tracks full-page navigations, but the app uses
 * hash routing (#/crops, #/calculator, ...) so we manually fire a
 * `pageview` event on every route change. We dedupe consecutive
 * identical routes so the "back" button across the same page
 * doesn't double-count.
 *
 * Also exposes a `track()` helper for custom engagement events
 * (calculator use, compare use, theme change).
 */
export function usePlausible() {
  const location = useLocation();
  const lastPath = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.plausible !== "function") return;
    const path = location.pathname + location.search + location.hash;
    if (path === lastPath.current) return;
    lastPath.current = path;
    window.plausible("pageview");
  }, [location]);

  const track = (event: string, props?: Record<string, string | number | boolean>) => {
    if (typeof window === "undefined") return;
    if (typeof window.plausible !== "function") return;
    window.plausible(event, props ? { props } : undefined);
  };

  return { track };
}
