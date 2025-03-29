import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import footwearDataJson from "@/lib/assets/data/footwear.json";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { Footwear } from "@/lib/types/footwear";
import { Card } from "@/components/ui/card";
import { Category } from "@/lib/types";

export const Route = createFileRoute("/_app/")({
  component: Index,
  loader: () => {
    const footwearData = footwearDataJson as Footwear[];
    return footwearData;
  },
});

function Index() {
  const footwearData = useLoaderData({ from: Route.id });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
      toast.success("Subscription successful!", {
        position: "bottom-right",
        duration: 3000,
      });
      form.reset();
    } else {
      toast.error("Please enter a valid email address.", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const randomImage =
    footwearData.length > 0
      ? footwearData[Math.floor(Math.random() * footwearData.length)].imageUrl
      : "/placeholder.svg?height=550&width=550";

  return (
    <div className="min-h-screen">
      <main className="bloc mx-auto w-full">
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2 md:mx-auto md:block">
                  <h1 className="text-2xl font-bold tracking-tighter md:text-4xl">
                    Step Into Style at Sneaker Hub
                  </h1>
                  <p className="text-muted-foreground max-w-[600px] md:text-xl">
                    Discover the latest and greatest in sneaker culture. From
                    limited editions to timeless classics.
                  </p>
                </div>
                <div className="mx-auto space-x-4 min-[400px]:flex-row lg:flex lg:w-full">
                  <Link to="/footwear">
                    <Button size="lg">Shop Now</Button>
                  </Link>
                  <Link to="/about">
                    <Button size="lg" variant="secondary">
                      About Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={randomImage}
                  width={550}
                  height={550}
                  alt="Featured Sneaker"
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="featured"
          className="bg-muted w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Featured Sneakers
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl">
                  Check out our most popular styles and latest drops
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {footwearData.map((item) => (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg border py-0"
                >
                  <Link
                    to="/footwear/$id"
                    params={{ id: String(item.id) }}
                    className="flex h-full flex-col"
                  >
                    <div className="overflow-hidden rounded-lg bg-white p-2">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={`${item.brand} ${item.model}`}
                        className="w-full object-cover p-4 transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {item.brand} {item.model}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.category} | Released in {item.releaseYear}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="font-bold">
                          ${item.priceCAD.toFixed(2)}
                        </span>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link to="/footwear">
                <Button variant="default" className="gap-1">
                  View All Products
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section
          id="collections"
          className="mx-auto w-full max-w-6xl py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Shop by Category
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl">
                  Find the perfect sneakers for every occasion
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Running" as Category, image: "running" },
                { name: "Basketball" as Category, image: "basketball" },
                { name: "Lifestyle" as Category, image: "lifestyle" },
              ].map((category) => {
                const categoryItem = footwearData.find(
                  (item) => item.category === category.name
                );

                return (
                  <Link
                    key={category.name}
                    className="group relative overflow-hidden rounded-lg"
                    to="/footwear"
                    search={{
                      category: category.name,
                    }}
                  >
                    <div className="aspect-[4/3] overflow-hidden dark:bg-white">
                      <img
                        src={
                          categoryItem
                            ? categoryItem.imageUrl
                            : `/placeholder.svg?height=400&width=500&text=${category.image}`
                        }
                        alt={category.name}
                        className="object-cover p-4 transition-transform group-hover:scale-105"
                      />
                      <div className="bg-muted/60 group-hover:bg-muted/40 absolute inset-0 transition-colors dark:bg-white/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-primary text-4xl font-bold dark:text-black">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-muted mx-auto w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Join the Sneaker Hub Community
                  </h2>
                  <p className="text-muted-foreground max-w-[600px] md:text-xl">
                    Get exclusive access to limited drops, special offers, and
                    sneaker news
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1 border-2 bg-white"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-muted-foreground text-xs">
                  By subscribing, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
