import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SiteLayout } from "@/components/layout/site-layout";
import { PageSkeleton } from "@/components/layout/page-skeleton";

// Per-route lazy load: each page becomes its own chunk so the initial
// bundle only ships the layout + route shell. Pages are named exports,
// so we shim the resolved module into a default export for React.lazy.
const HomePage = lazy(() =>
  import("@/pages/home-page").then((m) => ({ default: m.HomePage }))
);
const CropsPage = lazy(() =>
  import("@/pages/crops-page").then((m) => ({ default: m.CropsPage }))
);
const CropDetailPage = lazy(() =>
  import("@/pages/crop-detail-page").then((m) => ({
    default: m.CropDetailPage,
  }))
);
const PetsPage = lazy(() =>
  import("@/pages/pets-page").then((m) => ({ default: m.PetsPage }))
);
const GearsPage = lazy(() =>
  import("@/pages/gears-page").then((m) => ({ default: m.GearsPage }))
);
const EggsPage = lazy(() =>
  import("@/pages/eggs-page").then((m) => ({ default: m.EggsPage }))
);
const SeedPacksPage = lazy(() =>
  import("@/pages/seed-packs-page").then((m) => ({
    default: m.SeedPacksPage,
  }))
);
const SprinklersPage = lazy(() =>
  import("@/pages/sprinklers-page").then((m) => ({
    default: m.SprinklersPage,
  }))
);
const CurrenciesPage = lazy(() =>
  import("@/pages/currencies-page").then((m) => ({
    default: m.CurrenciesPage,
  }))
);
const MutationsPage = lazy(() =>
  import("@/pages/mutations-page").then((m) => ({
    default: m.MutationsPage,
  }))
);
const CalculatorPage = lazy(() =>
  import("@/pages/calculator-page").then((m) => ({
    default: m.CalculatorPage,
  }))
);
const ComparePage = lazy(() =>
  import("@/pages/compare-page").then((m) => ({ default: m.ComparePage }))
);
const SystemsPage = lazy(() =>
  import("@/pages/systems-page").then((m) => ({ default: m.SystemsPage }))
);
const NotFoundPage = lazy(() =>
  import("@/pages/not-found-page").then((m) => ({
    default: m.NotFoundPage,
  }))
);

const wrap = (node: React.ReactNode) => (
  <Suspense fallback={<PageSkeleton />}>{node}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: wrap(<HomePage />) },
      { path: "crops", element: wrap(<CropsPage />) },
      { path: "crops/:slug", element: wrap(<CropDetailPage />) },
      { path: "pets", element: wrap(<PetsPage />) },
      { path: "gears", element: wrap(<GearsPage />) },
      { path: "eggs", element: wrap(<EggsPage />) },
      { path: "seed-packs", element: wrap(<SeedPacksPage />) },
      { path: "sprinklers", element: wrap(<SprinklersPage />) },
      { path: "currencies", element: wrap(<CurrenciesPage />) },
      { path: "mutations", element: wrap(<MutationsPage />) },
      { path: "calculator", element: wrap(<CalculatorPage />) },
      { path: "compare", element: wrap(<ComparePage />) },
      { path: "systems", element: wrap(<SystemsPage />) },
      { path: "*", element: wrap(<NotFoundPage />) },
    ],
  },
]);

export function App() {
  // The route tracker is now inside <SiteLayout> itself, rendered
  // as a child of <Outlet /> so it has the Router context it needs.
  return <RouterProvider router={router} />;
}
