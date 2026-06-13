import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * UpdatePrompt — listens for an installed-but-waiting service worker
 * and shows a toast offering the user a chance to refresh.
 * The new SW does NOT auto-activate (no self.skipWaiting on install),
 * so the user keeps their current view until they click "Update".
 */
export function UpdatePrompt() {
  const [waiting, setWaiting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const onUpdate = (registration: ServiceWorkerRegistration) => {
      if (!registration.waiting) return;
      setWaiting(true);
    };

    const onStateChange = () => {
      // Fired on the new SW when it activates. The new controller is
      // now serving the page; reload to pick up the fresh cache.
      window.location.reload();
    };

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === "UPDATE_AVAILABLE") setWaiting(true);
    };

    // 1. SW may already be installed and waiting when this component mounts.
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) {
        onUpdate(reg);
        // 2. Watch for a new SW that finishes installing later.
        reg.addEventListener("updatefound", () => {
          const newSw = reg.installing;
          if (!newSw) return;
          newSw.addEventListener("statechange", () => {
            if (newSw.state === "installed" && navigator.serviceWorker.controller) {
              setWaiting(true);
            }
          });
        });
      }
    });

    // 3. Listen for explicit postMessage from the SW (in case we wire it up later).
    navigator.serviceWorker.addEventListener("message", onMessage);
    // 4. Listen for controller swap (new SW took over).
    navigator.serviceWorker.addEventListener("controllerchange", onStateChange);

    return () => {
      navigator.serviceWorker.removeEventListener("message", onMessage);
      navigator.serviceWorker.removeEventListener("controllerchange", onStateChange);
    };
  }, []);

  if (!waiting || dismissed) return null;

  const applyUpdate = () => {
    if (!navigator.serviceWorker.controller) {
      // No active controller; just reload.
      window.location.reload();
      return;
    }
    navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" });
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-emerald-400/40 bg-card p-4 shadow-2xl shadow-emerald-400/10 animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-400">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold">New version available</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            A fresh build of the wiki is ready. Reload to pick it up.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Button
              size="sm"
              onClick={applyUpdate}
              data-min-target-override="true"
            >
              Reload
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setDismissed(true)}
              data-min-target-override="true"
            >
              Later
            </Button>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss update notification"
          className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          data-min-target-override="true"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
