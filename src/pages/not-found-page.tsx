import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="container py-24 text-center">
      <div className="text-6xl mb-4">🧭</div>
      <h1 className="text-3xl font-bold tracking-tight">Lost in the garden</h1>
      <p className="text-muted-foreground mt-2 max-w-md mx-auto">
        We couldn't find that page. It may have been moved, or it never grew
        here in the first place.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">
          <Compass className="h-4 w-4" /> Back to home
        </Link>
      </Button>
    </div>
  );
}
