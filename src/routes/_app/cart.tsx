import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="text-2xl">
        This is where the cart of the user should be displayed.
      </div>
      <Link to="/checkout">
        <Button size="lg">Proceed to Checkout</Button>
      </Link>
    </div>
  );
}
