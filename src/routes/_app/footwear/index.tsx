import { createFileRoute, Link } from "@tanstack/react-router";
import footwearData from "@/lib/assets/data/footwear.json";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/_app/footwear/")({
  component: RouteComponent,
});

// Tanstack Virtualizer would have been good if we had hundreds or thousands of
// items to render. This obviously isn't the case for this project, but it's
// still good knowledge if you ever do similar frontend work for a project.
function RouteComponent() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Browse Available Footwear</h1>
      <ScrollArea className="h-96">
        <div className="space-y-2">
          {footwearData.map((shoe) => (
            <Card key={shoe.id} className="py-2 px-4">
              <Link
                //@ts-expect-error Type '`/footwear/${number}`' is not assignable to type '"/" | "/about" | "/footwear/$id" | "/footwear" | "." | ".."'
                to={`/footwear/${shoe.id}`}
                className="block text-blue-600 hover:underline"
              >
                {/* See how the data is configured in /lib/assets/data/footwear.json. */}
                {shoe.brand} {shoe.model} - {shoe.category}
              </Link>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default RouteComponent;
