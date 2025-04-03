import { createFileRoute } from "@tanstack/react-router";
import { SellSneakers } from "@/components/sell/SellSneakers";

export const Route = createFileRoute("/_app/sell")({
  component: SellPage,
});

function SellPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
        Sell Your Sneakers
      </h1>
      <SellSneakers />
    </div>
  );
}
