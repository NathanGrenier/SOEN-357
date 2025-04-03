import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import footwearData from "@/lib/assets/data/footwear.json";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";
import { DefaultNotFoundRoute } from "@/components/default-not-found-route";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Share2,
  Copy,
  Home,
} from "lucide-react";
import { Footwear, RetailerDetails } from "@/lib/types";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FootwearIcon from "@/components/icons/FootwearIcon";
import StarRating from "@/components/star-rating";
import { CartConfirmationDialog } from "@/components/cart-confirmation-dialog";

export const Route = createFileRoute("/_app/footwear/$id")({
  component: RouteComponent,
  loader: ({ params }) => {
    return { id: params.id };
  },
});

// Main route component
export default function RouteComponent() {
  const { id } = Route.useLoaderData();
  const footwear = (footwearData as Footwear[]).find(
    (shoe) => shoe.id === Number(id)
  );
  if (!footwear) {
    return <DefaultNotFoundRoute />;
  }
  return <FootwearDetails footwear={footwear} />;
}

// Child component containing all hooks and rendering logic
function FootwearDetails({ footwear }: { footwear: Footwear }) {
  // Valid retailer keys extracted from the footwear object
  const validRetailers = (
    Object.keys(footwear.retailers) as (keyof Footwear["retailers"])[]
  ).filter((key) => footwear.retailers[key] !== undefined);

  // Chart configuration
  const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ];
  const chartConfig = validRetailers.reduce(
    (acc, retailer, index) => {
      acc[retailer] = {
        label: retailer.charAt(0).toUpperCase() + retailer.slice(1),
        color: chartColors[index % chartColors.length],
      };
      return acc;
    },
    {} as Record<string, { label: string; color: string }>
  );

  // Price history state and effect
  const [fullPriceHistory, setFullPriceHistory] = React.useState<
    Array<Record<string, string | number>>
  >([]);
  React.useEffect(() => {
    const generatePriceHistory = () => {
      const data: Array<Record<string, string | number>> = [];
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(today.getDate() - 90 + 1);

      for (
        let d = new Date(startDate);
        d <= today;
        d.setDate(d.getDate() + 1)
      ) {
        const dateStr = d.toISOString().split("T")[0];
        const entry: Record<string, string | number> = { date: dateStr };
        validRetailers.forEach((retailer) => {
          const basePrice = footwear.retailers[retailer]!.price;
          const fluctuation = Math.floor(Math.random() * 21) - 10;
          entry[retailer] = basePrice + fluctuation;
        });
        data.push({ ...entry });
      }
      return data;
    };
    setFullPriceHistory(generatePriceHistory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footwear]);

  // Time range state
  const [timeRange, setTimeRange] = React.useState("90d");

  // Filtered price history data
  const filteredData = React.useMemo(() => {
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;
    const referenceDate = new Date();
    const startDate = new Date(referenceDate);
    startDate.setDate(referenceDate.getDate() - daysToSubtract + 1);
    return fullPriceHistory.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= referenceDate;
    });
  }, [fullPriceHistory, timeRange]);

  // Price trend calculation
  const primaryRetailer = validRetailers[0];
  let percentChange = 0;
  if (filteredData.length > 0 && primaryRetailer) {
    const firstValue = Number(filteredData[0][primaryRetailer]);
    const lastValue = Number(
      filteredData[filteredData.length - 1][primaryRetailer]
    );
    percentChange = ((lastValue - firstValue) / firstValue) * 100;
  }
  const THRESHOLD = 0.1;
  const isTrendingUp = percentChange > THRESHOLD;
  const isTrendingFlat = Math.abs(percentChange) <= THRESHOLD;

  // Available sizes state
  const availableSizes = footwear.availableSizesUS;
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const handleBuyFromUs = () => {
    if (!selectedSize) return;
    const size = Number(selectedSize);
    alert(
      `Cart/checkout handling will happen after this, passing details: Shoe ID ${footwear.id}, Size ${size}`
    );
  };

  // Add to cart state
  const handleAddToCart = () => {
    if (!selectedSize) return;
    const size = Number(selectedSize);
    toast.success(`Added to cart! You selected size ${size}.`);
  };

  // Wishlist state
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const handleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    if (!isWishlisted) {
      toast.success("Footwear added to wishlist!");
    } else {
      toast.info("Footwear removed from wishlist!");
    }
  };

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);

  // Image gallery state
  const mainImage = footwear.imageUrl || "/placeholder.svg";
  const imageGallery =
    footwear.imageUrls && footwear.imageUrls.length > 0
      ? [mainImage, ...footwear.imageUrls]
      : [mainImage];
  const [selectedImage, setSelectedImage] = React.useState(mainImage);

  return (
    <div className="mx-auto flex max-w-6xl flex-col space-y-8 p-6">
      <div className="container mx-auto mb-6 flex justify-center">
        <Breadcrumb className="py-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <div className="flex items-center gap-1">
                  <Home size="18" />
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </Link>
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <div className="flex items-center gap-1">
                  <FootwearIcon size="18" />
                  <Link
                    to="/footwear"
                    search={{ page: 1 }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Footwear
                  </Link>
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="/footwear/$id"
                  params={{ id: String(footwear.id) }}
                  className="text-primary hover:text-primary/80 border-primary font-medium transition-colors"
                >
                  {footwear.model}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Hero Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Footwear Image */}
        <div className="grid gap-6">
          <div className="border-muted-foreground mx-auto w-full max-w-md overflow-hidden rounded-xl border">
            <img
              src={selectedImage}
              alt={`${footwear.brand} ${footwear.model}`}
              className="h-auto w-full object-contain"
              onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
            />
          </div>

          {/* Desktop Thumbnails */}
          <div className="hidden justify-center gap-3 md:flex">
            {imageGallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`hover:border-muted-foreground overflow-hidden rounded-lg border transition-all hover:cursor-pointer ${
                  selectedImage === image ? "border-muted-foreground" : ""
                }`}
              >
                <div className="h-16 w-16 md:h-20 md:w-20">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-contain"
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Thumbnails */}
          <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 md:hidden">
            <div className="flex gap-2">
              {imageGallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`hover:border-muted-foreground overflow-hidden rounded-lg border transition-all ${
                    selectedImage === image ? "border-muted-foreground" : ""
                  }`}
                >
                  <div className="h-16 w-16">
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-contain"
                      onError={(e) =>
                        (e.currentTarget.src = "/placeholder.svg")
                      }
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <Card className="flex flex-col justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle className="text-3xl leading-tight font-bold">
              {footwear.brand} {footwear.model}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {footwear.category}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-center gap-4 py-4">
            <div className="space-y-1">
              <p className="text-xl font-semibold">
                Current Price: ${footwear.priceCAD}.99 CAD
              </p>
              <Badge
                variant="secondary"
                className="bg-green-100 font-medium text-green-800"
              >
                {footwear.stockStatus}
              </Badge>
            </div>
            {/* Trust signals / highlights */}
            <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
              <li>The price you see covers taxes, shipping, and handling!</li>
              <li>90-day returns with money-back guarantee</li>
              <li>Delivered with eco-friendly packaging ♻️</li>
              <li>
                Found a better deal somewhere else? We&apos;ll price-match it.
              </li>
            </ul>
            {/* Buy Directly from Us */}
            {availableSizes.length > 0 && (
              <div className="space-y-2 pt-4">
                <p className="text-muted-foreground text-sm font-medium">
                  Available Sizes (US):
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <Select
                    value={selectedSize}
                    onValueChange={(val: string) => setSelectedSize(val)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSizes.map((size: number) => (
                        <SelectItem key={size} value={size.toString()}>
                          US {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      onClick={handleBuyFromUs}
                      disabled={!selectedSize}
                    >
                      Buy Now
                    </Button>
                    <CartConfirmationDialog
                      footwear={footwear}
                      selectedSize={selectedSize ? Number(selectedSize) : null}
                      handleAddToCart={handleAddToCart}
                      onClose={() => {}}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-4">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleWishlist}>
                <Heart
                  className={`mr-2 h-4 w-4 ${
                    isWishlisted ? "fill-foreground" : ""
                  }`}
                />{" "}
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Footwear Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Footwear Details</CardTitle>
            <CardDescription>
              See information about materials, sizing, and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="font-medium">Colorway</dt>
                <dd className="text-muted-foreground text-sm">
                  {footwear.colorway.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Release Year</dt>
                <dd className="text-muted-foreground text-sm">
                  {footwear.releaseYear}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Material</dt>
                <dd className="text-muted-foreground text-sm">
                  {footwear.material}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Resale Price</dt>
                <dd className="text-muted-foreground text-sm">
                  ${footwear.resalePriceCAD} CAD
                </dd>
              </div>
              <div>
                <dt className="font-medium">Overall Market Trend</dt>
                <dd className="text-muted-foreground text-sm capitalize">
                  {footwear.marketTrend}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Fit</dt>
                <dd className="text-muted-foreground text-sm">
                  {footwear.fit}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Width</dt>
                <dd className="text-muted-foreground text-sm">
                  {footwear.width}
                </dd>
              </div>
              {/* Comfort Rating */}
              <div>
                <dt className="font-medium">Comfort</dt>
                <dd className="text-muted-foreground flex items-center gap-2 text-sm">
                  <StarRating rating={footwear.comfortRatingOn5} />
                  <span>({footwear.comfortRatingOn5}/5)</span>
                </dd>
              </div>
              {/* Durability Rating */}
              <div>
                <dt className="font-medium">Durability</dt>
                <dd className="text-muted-foreground flex items-center gap-2 text-sm">
                  <StarRating rating={footwear.durabilityRatingOn5} />
                  <span>({footwear.durabilityRatingOn5}/5)</span>
                </dd>
              </div>
              <div>
                <dt className="font-medium">Sustainability</dt>
                <dd className="text-muted-foreground text-sm">
                  {footwear.sustainability}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Best For</dt>
                <dd className="text-muted-foreground text-sm">
                  {footwear.bestFor.join(", ")}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        {/* Price History Details */}
        <Card>
          <CardHeader className="flex flex-col gap-2 border-b py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid gap-1 text-center sm:text-left">
              <CardTitle>Price History</CardTitle>
              <CardDescription>
                Choose a date range to explore prices.
              </CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[160px] rounded-lg hover:cursor-pointer sm:ml-auto"
                aria-label="Select a time range"
              >
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={filteredData}>
                <defs>
                  {validRetailers.map((retailer) => {
                    const gradientId = `fill-${retailer}`;
                    const color = chartConfig[retailer].color;
                    return (
                      <linearGradient
                        id={gradientId}
                        key={gradientId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop
                          offset="95%"
                          stopColor={color}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    );
                  })}
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value: string | number) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value: string | number) =>
                        new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                      indicator="dot"
                    />
                  }
                />
                {validRetailers.map((retailer) => (
                  <Area
                    key={String(retailer)}
                    type="natural"
                    dataKey={String(retailer)}
                    fill={`url(#fill-${retailer})`}
                    stroke={chartConfig[retailer].color}
                    stackId="a"
                  />
                ))}
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 text-sm">
            {isTrendingFlat ? (
              <div className="flex gap-2 leading-none font-medium">
                Trending flat (0.0%) this period <Minus className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex gap-2 leading-none font-medium">
                Trending {isTrendingUp ? "up" : "down"} by{" "}
                {Math.abs(percentChange).toFixed(1)}% this period{" "}
                {isTrendingUp ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
            )}
            <div className="text-muted-foreground leading-none">
              Showing price fluctuations for the last{" "}
              {timeRange === "90d"
                ? "3 months"
                : timeRange === "30d"
                  ? "30 days"
                  : "7 days"}
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Other Retailers Section */}
      <Card>
        <CardHeader>
          <CardTitle>Other Available Retailers</CardTitle>
          <CardDescription>
            Not interested in buying with us? Check out different retailers that
            you might feel comfortable with.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          {validRetailers.map((retailer) => {
            const retailerKey = String(retailer);
            const details = footwear.retailers[retailer] as RetailerDetails;
            return (
              <Button key={retailerKey} asChild>
                <a href={details.url} target="_blank" rel="noopener noreferrer">
                  {retailerKey.charAt(0).toUpperCase() + retailerKey.slice(1)} -
                  ${details.price} CAD
                </a>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Share Dialog */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone with the link will can view this footwear.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={`https://soen357.ngrenier.com/footwear/${footwear.id}`}
                readOnly
              />
            </div>
            <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
