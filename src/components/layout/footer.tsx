import { Sprout, Github, Heart } from "lucide-react";
import { WIKI_STATS } from "@/data";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-card/30">
      <div className="container py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <Sprout className="h-4 w-4 text-emerald-400" />
            Grow A Garden 2 Wiki
          </div>
          <p className="mt-2 text-muted-foreground text-balance">
            A fan-made companion for the Roblox farming experience. Built by
            growers, for growers.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/80">
            v{WIKI_STATS.version} · Updated {WIKI_STATS.lastUpdated}
          </p>
        </div>

        <div>
          <div className="font-semibold mb-3">Browse</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#/crops" className="hover:text-foreground">Crops</a></li>
            <li><a href="#/mutations" className="hover:text-foreground">Mutations</a></li>
            <li><a href="#/calculator" className="hover:text-foreground">Calculator</a></li>
            <li><a href="#/compare" className="hover:text-foreground">Compare</a></li>
            <li><a href="#/systems" className="hover:text-foreground">Systems</a></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Active Code</div>
          <code className="inline-block rounded-md bg-secondary px-2 py-1 text-xs font-mono text-emerald-400">
            {WIKI_STATS.activeCode}
          </code>
          <p className="mt-2 text-xs text-muted-foreground">
            3 Green Bean seeds on redemption.
          </p>
        </div>

        <div>
          <div className="font-semibold mb-3">About</div>
          <ul className="space-y-2 text-muted-foreground text-xs">
            <li>Fan project — not affiliated with Roblox Corporation.</li>
            <li>Data sourced from the public community wiki, paraphrased.</li>
            <li className="flex items-center gap-1">
              Open source on <Github className="h-3.5 w-3.5 mx-1" /> GitHub.
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        Made with <Heart className="inline h-3 w-3 text-emerald-400 mx-0.5" /> for the community · {new Date().getFullYear()}
      </div>
    </footer>
  );
}
