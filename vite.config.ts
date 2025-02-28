import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

// This should be the defalt tanstack router vite config. Full API available at: https://tanstack.com/router/latest/docs/api/file-based-routing
// {
//   "routesDirectory": "./src/routes",
//   "generatedRouteTree": "./src/routeTree.gen.ts",
//   "routeFileIgnorePrefix": "-",
//   "quoteStyle": "single"
// }

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const envDefaults = {
    TANSTACK_DEVTOOLS: env.TANSTACK_DEVTOOLS || "false",
  };

  return {
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@css": path.resolve(__dirname, "./src/css"),
      },
    },
    define: {
      "import.meta.env.TANSTACK_DEVTOOLS": JSON.stringify(
        envDefaults.TANSTACK_DEVTOOLS
      ),
    },
  };
});
