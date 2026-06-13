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

export function App() {
  // The route tracker is now inside <SiteLayout> itself, rendered
  // as a child of <Outlet /> so it has the Router context it needs.
  return <RouterProvider router={router} />;
}
