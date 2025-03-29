import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-2xl">
        This is where the cart of the user should be displayed.
      </div>
    </div>
  );
}
