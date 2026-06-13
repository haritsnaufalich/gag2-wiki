import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { SiteLayout } from "@/components/layout/site-layout";
import { HomePage } from "@/pages/home-page";
import { CropsPage } from "@/pages/crops-page";
import { CropDetailPage } from "@/pages/crop-detail-page";
import { MutationsPage } from "@/pages/mutations-page";
import { CalculatorPage } from "@/pages/calculator-page";
import { SystemsPage } from "@/pages/systems-page";
import { ComparePage } from "@/pages/compare-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { usePlausible } from "@/lib/use-plausible";

const router = createHashRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "crops", element: <CropsPage /> },
      { path: "crops/:slug", element: <CropDetailPage /> },
      { path: "mutations", element: <MutationsPage /> },
      { path: "calculator", element: <CalculatorPage /> },
      { path: "compare", element: <ComparePage /> },
      { path: "systems", element: <SystemsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function RouterWithTracking() {
  // Fires a Plausible `pageview` on every hash-route change.
  usePlausible();
  return <RouterProvider router={router} />;
}

export function App() {
  return <RouterWithTracking />;
}
