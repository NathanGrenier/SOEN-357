import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { DefaultNotFoundRoute } from "./components/default-not-found-route";
import { AuthProvider } from "@/hooks/use-auth";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// If the 404 page stops working, may need to try a differenthistory type: https://tanstack.com/router/latest/docs/framework/react/guide/history-types

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: DefaultNotFoundRoute,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
      <Toaster richColors />
    </StrictMode>
  );
}
