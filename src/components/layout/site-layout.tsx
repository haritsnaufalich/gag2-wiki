import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

export function SiteLayout() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
