import { createFileRoute, Link } from "@tanstack/react-router";
import footwearDataJson from "@/lib/assets/data/footwear.json";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { Footwear } from "@/lib/types/footwear";
import { Card } from "@/components/ui/card";
import { SiteLogo } from "@/components/site-logo";

export const Route = createFileRoute("/_app/")({
  component: Index,
});

function Index() {
  //const [count, setCount] = useState(0);
  // return (
  //   <div className="flex min-h-[calc(100vh-5.6rem)] items-center justify-center">
  //     <div className="flex flex-col items-center justify-center gap-4">
  //       <div className="mb-4 flex items-center gap-8">
  //         <img
  //           src={siteLogo}
  //           className="h-28 w-28"
  //           alt="Platform logo designed by Freepik"
  //         />
  //       </div>
  //       <h1 className="font-bold">Vite + React!</h1>
  //       <div className="flex flex-col items-center justify-center space-y-4">
  //         <div className="flex gap-4">
  //           <Button
  //             variant="default"
  //             size="lg"
  //             onClick={() => setCount((count) => count + 1)}
  //           >
  //             count is {count}
  //           </Button>
  //           <Button
  //             variant="outline"
  //             onClick={() => {
  //               const currentTime = new Date().toLocaleTimeString();
  //               toast.success("Event has been created!", {
  //                 description: `Created at: ${currentTime}`,
  //               });
  //             }}
  //           >
  //             Toast!
  //           </Button>
  //         </div>
  //         <p>
  //           Edit <code>src/App.tsx</code> and save to test HMR
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
  const footwearData = footwearDataJson as Footwear[];

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
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Step Into Style at Sneaker Hub
                  </h1>
                  <p className="text-muted-foreground max-w-[600px] md:text-xl">
                    Discover the latest and greatest in sneaker culture. From
                    limited editions to timeless classics.
                  </p>
                </div>
                <div className="mx-auto flex space-x-4 min-[400px]:flex-row md:w-full">
                  <Link
                    href="/footwear?page=1&query=&category=All Categories"
                    to={"/"}
                  >
                    <Button size="lg">Shop Now</Button>
                  </Link>
                  <Link href="/about" to={"/"}>
                    <Button size="lg">About Us</Button>
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
                  <div className="overflow-hidden rounded-lg bg-white p-2">
                    <img
                      src={item.imageUrl}
                      width={350}
                      height={350}
                      alt={`Sneaker ${item.model}`}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex h-1/5 flex-col justify-between p-4 md:h-2/5">
                    <div>
                      <h3 className="font-semibold">
                        {item.brand} {item.model}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.category} | Released in {item.releaseYear}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between pt-2">
                      <span className="font-bold">
                        ${item.priceCAD.toFixed(2)}
                      </span>
                      <Button size="sm" variant="outline">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="/footwear?page=1&query=&category=All Categories"
                to={"/"}
              >
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
                { name: "Running", image: "running" },
                { name: "Basketball", image: "basketball" },
                { name: "Lifestyle", image: "lifestyle" },
              ].map((category) => {
                // Filter footwearData to find the first item matching the category name
                const categoryItem = footwearData.find(
                  (item) =>
                    item.category.toLowerCase() === category.name.toLowerCase()
                );

                return (
                  <Link
                    href={`/footwear?page=1&query=&category=${category.name}`}
                    key={category.name}
                    className="group relative overflow-hidden rounded-lg"
                    to={"/"}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={
                          categoryItem
                            ? categoryItem.imageUrl
                            : `/placeholder.svg?height=400&width=500&text=${category.image}`
                        }
                        width={500}
                        height={400}
                        alt={category.name}
                        className="object-cover p-4 transition-transform group-hover:scale-105"
                      />
                      <div className="bg-muted/80 group-hover:bg-muted/50 absolute inset-0 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-primary text-4xl font-bold">
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

      <footer className="mx-auto w-full max-w-6xl py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2" to={"/"}>
                <SiteLogo size="sm" />
                <span className="text-xl font-bold">Sneaker Hub</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Your destination for premium sneakers and streetwear.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  to={"/"}
                >
                  <img
                    height="32"
                    width="32"
                    src="https://cdn.simpleicons.org/instagram"
                  />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  to={"/"}
                >
                  <img
                    height="32"
                    width="32"
                    src="https://cdn.simpleicons.org/x"
                  />
                  <span className="sr-only">X</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  to={"/"}
                >
                  <img
                    height="32"
                    width="32"
                    src="https://cdn.simpleicons.org/facebook"
                  />
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Kids
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Collections
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Order Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Store Locations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                    to={"/"}
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
            Sole Society &copy; {new Date().getFullYear()} Sneaker Hub. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
