import { Navbar } from "@/components/navbar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: PathlessLayoutComponent,
});

function PathlessLayoutComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}
