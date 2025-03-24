import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import footwearDataJson from "@/lib/assets/data/footwear.json";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Category,
  categoryTypeColors,
  Footwear,
  StockStatus,
  stockStatusColors,
} from "@/lib/types/footwear";
import { cn, duplicateFootwear } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import StarRating from "@/components/star-rating";
import ScrollToTopButton from "@/components/scroll-to-top";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const Route = createFileRoute("/_app/footwear/")({
  validateSearch: (search: Record<string, unknown>) => {
    const page =
      typeof search.page === "number"
        ? search.page
        : typeof search.page === "string"
          ? parseInt(search.page, 10) || 1
          : 1;

    const query =
      typeof search.query === "string"
        ? search.query
        : typeof search.query === "number"
          ? String(search.query)
          : "";

    const category =
      typeof search.category === "string" ? search.category : "all";

    return { page, query, category };
  },
  component: RouteComponent,
});

function RouteComponent() {
  // Get search params from URL
  const { page, query, category } = Route.useSearch();

  // State now starts with values from URL
  const [searchQuery, setSearchQuery] = useState(query);
  const [filterCategory, setFilterCategory] = useState(category);
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = 20; // Should be a multiple of 4

  const navigate = Route.useNavigate();

  let footwearData = footwearDataJson as Footwear[];

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...Array.from(new Set(footwearData.map((shoe) => shoe.category))),
  ];

  if (process.env.NODE_ENV === "development") {
    console.log("Development mode - duplicating footwear data");
    footwearData = duplicateFootwear(footwearData, 20);
  }

  // Filter footwear based on search query and category
  const filteredFootwear = footwearData.filter((shoe) => {
    const matchesSearch =
      shoe.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || shoe.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalItems = filteredFootwear.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Update URL when params change
  const updateUrl = useCallback(
    (newPage: number, newQuery: string, newCategory: string) => {
      const searchParams = {
        page: newPage,
        query: newQuery,
        category: newCategory,
      };

      void navigate({
        search: searchParams,
        replace: true,
      });

      setCurrentPage(newPage);
      setSearchQuery(newQuery);
      setFilterCategory(newCategory);
    },
    [navigate]
  );

  // Reset to first page when filters change
  useEffect(() => {
    // Update URL and local state
    updateUrl(1, searchQuery, filterCategory);
  }, [searchQuery, filterCategory, updateUrl]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFootwear.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle search query changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
  };

  // Handle category changes
  const handleCategoryChange = (newCategory: string) => {
    updateUrl(1, searchQuery, newCategory);
  };

  // Change page handler
  const handlePageChange = (newPage: number) => {
    updateUrl(newPage, searchQuery, filterCategory);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={i === currentPage}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={1 === currentPage}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is > 3
      if (currentPage > 3) {
        pageNumbers.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the beginning or end
      if (currentPage <= 3) {
        endPage = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 3, 2);
      }

      // Render middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={i === currentPage}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if current page is < totalPages - 2
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              isActive={totalPages === currentPage}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 text-center">
          Sneaker Collection
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Browse our curated collection of premium footwear from top brands
          around the world.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search by brand, model or category..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        <Select value={filterCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full md:w-[200px] cursor-pointer">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="grid" className="mb-6">
        <TabsList className="grid w-[200px] grid-cols-2">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        {/* Grid View */}
        <TabsContent value="grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((shoe, index) => (
              <HoverCard key={index} openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Link to="/footwear/$id" params={{ id: String(shoe.id) }}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="aspect-square w-full overflow-hidden relative">
                        <img
                          src={shoe.imageUrl}
                          alt={`${shoe.brand} ${shoe.model}`}
                          className="object-cover w-full h-full"
                        />

                        {/* Stock status badge */}
                        <StockStatusBadge
                          status={shoe.stockStatus}
                          className="absolute top-2 right-6"
                        >
                          {shoe.stockStatus}
                        </StockStatusBadge>
                      </div>
                      <div className="p-4 h-[120px] flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="font-semibold truncate">
                              {shoe.brand}
                            </div>
                            <div className="text-sm text-muted-foreground truncate">
                              {shoe.model}
                            </div>
                          </div>
                          <CategoryBadge
                            category={shoe.category}
                            className="flex-shrink-0"
                          >
                            {shoe.category}
                          </CategoryBadge>
                        </div>

                        {/* Price and comfort rating */}
                        <div className="flex justify-between items-center mt-auto pt-2">
                          <div className="font-medium text-primary">
                            ${shoe.priceCAD} CAD
                          </div>
                          <div className="flex items-center gap-1">
                            <StarRating rating={shoe.comfortRatingOn5} />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col justify-between">
                        <span className="font-medium text-muted-foreground">
                          Release Year:
                        </span>
                        <p>{shoe.releaseYear}</p>
                      </div>
                      <div className="flex flex-col justify-between">
                        <span className="font-medium text-muted-foreground">
                          Material:
                        </span>
                        <p className="truncate">{shoe.material}</p>
                      </div>
                      <div className="flex flex-col justify-between">
                        <span className="font-medium text-muted-foreground">
                          Durability:
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <StarRating rating={shoe.durabilityRatingOn5} />
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <span className="font-medium text-muted-foreground">
                          Sustainability:
                        </span>
                        <p className="truncate">{shoe.sustainability}</p>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </TabsContent>

        {/* List View (for mobile) */}
        <TabsContent value="list">
          <div className="space-y-4">
            {currentItems.map((shoe, index) => (
              <HoverCard key={index} openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Link
                    to="/footwear/$id"
                    params={{ id: String(shoe.id) }}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring rounded-lg block"
                  >
                    <Card className="overflow-hidden transition-all hover:shadow-lg px-6">
                      <div className="flex">
                        {/* Left side - Image */}
                        <div className="w-32 h-24 relative flex-shrink-0">
                          <img
                            src={shoe.imageUrl}
                            alt={`${shoe.brand} ${shoe.model}`}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        {/* Right side - Content */}
                        <div className="p-3 flex-1 flex flex-col justify-between min-w-0">
                          {/* Top row - Brand/Model and Category */}
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0 pr-2">
                              <div className="flex items-center gap-2">
                                <div className="font-semibold truncate">
                                  {shoe.brand}
                                </div>
                                <StockStatusBadge status={shoe.stockStatus}>
                                  {shoe.stockStatus}
                                </StockStatusBadge>
                              </div>
                              <div className="text-sm text-muted-foreground truncate">
                                {shoe.model}
                              </div>
                            </div>
                            <CategoryBadge
                              category={shoe.category}
                              className="flex-shrink-0"
                            >
                              {shoe.category}
                            </CategoryBadge>
                          </div>

                          {/* Bottom row - Price and Comfort Rating */}
                          <div className="flex justify-between items-center">
                            <div className="font-medium text-primary">
                              ${shoe.priceCAD} CAD
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-muted-foreground font-medium">
                                Comfort Rating:
                              </span>
                              <StarRating rating={shoe.comfortRatingOn5} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80" align="end">
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col justify-between">
                        <span className="font-medium text-muted-foreground">
                          Release Year:
                        </span>
                        <p>{shoe.releaseYear}</p>
                      </div>
                      <div className="flex flex-col justify-between">
                        <span className="font-medium text-muted-foreground">
                          Material:
                        </span>
                        <p className="truncate">{shoe.material}</p>
                      </div>
                      <div className="flex flex-col justify-between">
                        <span className="font-medium text-muted-foreground">
                          Durability:
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <StarRating rating={shoe.durabilityRatingOn5} />
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <span className="font-medium text-muted-foreground">
                          Sustainability:
                        </span>
                        <p className="truncate">{shoe.sustainability}</p>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredFootwear.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <h2 className="text-2xl font-semibold">No sneakers found</h2>
          <p className="text-muted-foreground mt-2">
            Try different search terms or filters
          </p>
        </div>
      ) : (
        <>
          {/* Pagination */}
          <Pagination className="my-8">
            <PaginationContent className="flex flex-wrap justify-center gap-2">
              {currentPage > 1 && (
                <PaginationItem className="hidden sm:inline-flex">
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}

              {/* Mobile previous button */}
              {currentPage > 1 && (
                <PaginationItem className="sm:hidden cursor-pointer">
                  <PaginationLink
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Page Numbers - Hidden on small screens */}
              <div className="hidden sm:flex sm:flex-row sm:items-center sm:gap-1">
                {renderPageNumbers()}
              </div>

              {/* Mobile simplified pagination */}
              <PaginationItem className="sm:hidden">
                <PaginationLink isActive>
                  {currentPage} / {totalPages}
                </PaginationLink>
              </PaginationItem>

              {currentPage < totalPages && (
                <PaginationItem className="hidden sm:inline-flex cursor-pointer">
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              )}

              {/* Mobile next button */}
              {currentPage < totalPages && (
                <PaginationItem className="sm:hidden cursor-pointer">
                  <PaginationLink
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </PaginationLink>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>

          <div className="text-center text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, totalItems)} of {totalItems} sneakers
          </div>
        </>
      )}
      <ScrollToTopButton />
    </div>
  );
}

export default RouteComponent;

function CategoryBadge({
  category,
  className,
  children,
}: {
  category: Category;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(categoryTypeColors[category], className)}
    >
      {children}
    </Badge>
  );
}

function StockStatusBadge({
  status,
  className,
  children,
}: {
  status: StockStatus;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(stockStatusColors[status], className)}
    >
      {children}
    </Badge>
  );
}
