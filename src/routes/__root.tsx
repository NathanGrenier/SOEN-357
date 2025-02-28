import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { Navbar } from "@/components/navbar";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      {import.meta.env.TANSTACK_DEVTOOLS == "true" && (
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      )}
    </>
  ),
});
