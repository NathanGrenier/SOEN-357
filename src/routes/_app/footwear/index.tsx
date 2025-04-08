import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import footwearDataJson from "@/lib/assets/data/footwear.json";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Category,
  categoryTypeColors,
  Footwear,
  StockStatus,
  stockStatusColors,
  sustainabilityRatingList,
  stockStatusList,
  categoryList,
  fitTypeList,
} from "@/lib/types/footwear";
import { cn, duplicateFootwear } from "@/lib/utils/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ListFilter,
  Search,
} from "lucide-react";
import StarRating from "@/components/star-rating";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-mediaquery";
import { calculateOrderSummary } from "@/lib/utils/cartUtils";
import { TAX_RATE } from "@/lib/constants";

export const ALL_CATEGORIES = "All Categories";

export const Route = createFileRoute("/_app/footwear/")({
  validateSearch: (search: Record<string, unknown>) => {
    const page =
      typeof search.page === "number"
        ? search.page
        : typeof search.page === "string"
          ? parseInt(search.page, 10) || 1
          : 1;

    const query = typeof search.query === "string" ? search.query : "";

    const category =
      typeof search.category === "string" ? search.category : ALL_CATEGORIES;

    return {
      page,
      query,
      category,
    } as {
      page?: number;
      query?: string;
      category?: string;
    };
  },

  loader: () => {
    let footwearData = footwearDataJson as Footwear[];

    // Duplicate data for development mode
    if (process.env.NODE_ENV === "development") {
      console.log("Development mode - duplicating footwear data");
      footwearData = duplicateFootwear(footwearData, 20);
    }

    return footwearData;
  },
  component: RouteComponent,
});

// Custom hook to manage all footwear filters and pagination
function useFootwearFilters(initialData: Footwear[]) {
  // Get search params from URL
  const { page = 1, query = "", category = ALL_CATEGORIES } = Route.useSearch();
  const navigate = Route.useNavigate();

  // Calculate min and max prices based on total price
  const minMaxPrices = useMemo(() => {
    const totals = initialData.map(
      (shoe) =>
        calculateOrderSummary([{ ...shoe, quantity: 1 }], TAX_RATE).total
    );
    const minPrice = Math.floor(Math.min(...totals) / 100) * 100;
    const maxPrice = Math.ceil(Math.max(...totals) / 100) * 100;
    return [minPrice, maxPrice];
  }, [initialData]);

  // State for all filters
  const [searchQuery, setSearchQuery] = useState(query);
  const [filterCategory, setFilterCategory] = useState<string>(category);
  const [currentPage, setCurrentPage] = useState(page);
  const [priceRange, setPriceRange] = useState(minMaxPrices);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSustainability, setSelectedSustainability] = useState<
    string[]
  >([]);
  const [selectedFitTypes, setSelectedFitTypes] = useState<string[]>([]);
  const [selectedStockStatus, setSelectedStockStatus] = useState<string[]>([]);
  const itemsPerPage = 20;

  if (itemsPerPage % 20 !== 0 && process.env.NODE_ENV === "development") {
    console.log("Items per page should be a multiple of 4");
  }

  // Filter footwear based on all criteria
  const filteredFootwear = useMemo(() => {
    return initialData.filter((shoe) => {
      const matchesSearch =
        shoe.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filterCategory === ALL_CATEGORIES || shoe.category === filterCategory;

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(shoe.brand);

      const matchesSustainability =
        selectedSustainability.length === 0 ||
        selectedSustainability.includes(shoe.sustainability);

      const matchesFitType =
        selectedFitTypes.length === 0 || selectedFitTypes.includes(shoe.fit);

      const matchesStockStatus =
        selectedStockStatus.length === 0 ||
        selectedStockStatus.includes(shoe.stockStatus);

      const totalPrice = calculateOrderSummary(
        [{ ...shoe, quantity: 1 }],
        TAX_RATE
      ).total;
      const matchesPrice =
        totalPrice >= priceRange[0] && totalPrice <= priceRange[1];

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesSustainability &&
        matchesFitType &&
        matchesStockStatus &&
        matchesPrice
      );
    });
  }, [
    initialData,
    searchQuery,
    filterCategory,
    selectedBrands,
    selectedSustainability,
    selectedFitTypes,
    selectedStockStatus,
    priceRange,
  ]);

  // Pagination calculations
  const totalItems = filteredFootwear.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFootwear.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Update URL with current filters
  const updateUrl = useCallback(
    (
      newPage: number,
      newQuery: string,
      newCategory: string,
      newPriceRange?: number[],
      newBrands?: string[],
      newSustainability?: string[],
      newFitTypes?: string[],
      newStockStatus?: string[]
    ) => {
      const searchParams: Record<string, string | number> = {
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

      // Update other state variables even though they're not in URL
      if (newPriceRange) setPriceRange(newPriceRange);
      if (newBrands) setSelectedBrands(newBrands);
      if (newSustainability) setSelectedSustainability(newSustainability);
      if (newFitTypes) setSelectedFitTypes(newFitTypes);
      if (newStockStatus) setSelectedStockStatus(newStockStatus);
    },
    [navigate]
  );

  // Reset to first page when filters change
  useEffect(() => {
    updateUrl(page, searchQuery, filterCategory);
  }, [page, searchQuery, filterCategory, updateUrl]);

  // Filter actions
  const applyFilters = () => {
    updateUrl(
      1,
      searchQuery,
      filterCategory,
      priceRange,
      selectedBrands,
      selectedSustainability,
      selectedFitTypes,
      selectedStockStatus
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedSustainability([]);
    setSelectedFitTypes([]);
    setSelectedStockStatus([]);
    setPriceRange(minMaxPrices);
    setSearchQuery("");
    setFilterCategory(ALL_CATEGORIES);
    updateUrl(1, "", ALL_CATEGORIES);
  };

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (newCategory: string) => {
    updateUrl(1, searchQuery, newCategory);
  };

  const handlePageChange = (newPage: number) => {
    updateUrl(newPage, searchQuery, filterCategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    searchQuery,
    filterCategory,
    currentPage,
    priceRange,
    minMaxPrices,
    selectedBrands,
    selectedSustainability,
    selectedFitTypes,
    selectedStockStatus,
    filteredFootwear,
    currentItems,
    totalItems,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    setSelectedBrands,
    setSelectedSustainability,
    setSelectedFitTypes,
    setSelectedStockStatus,
    setPriceRange,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    applyFilters,
    resetFilters,
  };
}

function RouteComponent() {
  const footwearData = Route.useLoaderData();
  const categories = [ALL_CATEGORIES, ...categoryList];

  const {
    searchQuery,
    filterCategory,
    currentPage,
    priceRange,
    minMaxPrices,
    selectedBrands,
    selectedSustainability,
    selectedFitTypes,
    selectedStockStatus,
    filteredFootwear,
    currentItems,
    totalItems,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    setSelectedBrands,
    setSelectedSustainability,
    setSelectedFitTypes,
    setSelectedStockStatus,
    setPriceRange,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    applyFilters,
    resetFilters,
  } = useFootwearFilters(footwearData);

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
      <PageHeader />

      <SearchFilterSection
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        filterCategory={filterCategory}
        handleCategoryChange={handleCategoryChange}
        categories={categories}
      />

      <div className="mb-6 flex flex-col space-y-6">
        <Tabs defaultValue="grid" className="mb-6">
          <div className="flex w-full justify-between">
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <FilterSheet
              searchQuery={searchQuery}
              filterCategory={filterCategory}
              priceRange={priceRange}
              selectedBrands={selectedBrands}
              selectedSustainability={selectedSustainability}
              selectedFitTypes={selectedFitTypes}
              selectedStockStatus={selectedStockStatus}
              handleSearchChange={handleSearchChange}
              handleCategoryChange={handleCategoryChange}
              setPriceRange={setPriceRange}
              setSelectedBrands={setSelectedBrands}
              setSelectedSustainability={setSelectedSustainability}
              setSelectedFitTypes={setSelectedFitTypes}
              setSelectedStockStatus={setSelectedStockStatus}
              resetFilters={resetFilters}
              applyFilters={applyFilters}
              categories={categories}
              footwearData={footwearData}
              minMaxPrices={minMaxPrices}
            />
          </div>

          <TabsContent value="grid">
            <ProductGrid items={currentItems} />
          </TabsContent>

          <TabsContent value="list">
            <ProductList items={currentItems} />
          </TabsContent>
        </Tabs>
      </div>

      {filteredFootwear.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <FootwearPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            renderPageNumbers={renderPageNumbers}
          />

          <div className="text-muted-foreground text-center text-sm">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, totalItems)} of {totalItems} sneakers
          </div>
        </>
      )}
    </div>
  );
}

// Page header with title and description
const PageHeader = React.memo(function PageHeader() {
  return (
    <div className="mb-8 flex flex-col items-center">
      <h1 className="mb-3 text-center text-3xl font-bold md:text-5xl">
        Sneaker Collection
      </h1>
      <p className="text-muted-foreground max-w-2xl text-center">
        Browse our curated collection of premium footwear from top brands around
        the world.
      </p>
    </div>
  );
});

// Search and filter section
interface SearchFilterSectionProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterCategory: string;
  handleCategoryChange: (category: string) => void;
  categories: string[];
}

const SearchFilterSection = React.memo(function SearchFilterSection({
  searchQuery,
  handleSearchChange,
  filterCategory,
  handleCategoryChange,
  categories,
}: SearchFilterSectionProps) {
  return (
    <div className="mb-8 flex flex-col justify-center gap-4 md:flex-row">
      <div className="relative h-10">
        <Search
          size="20"
          className="absolute top-4.5 right-2 z-10 -translate-y-1/2 transform text-gray-500"
        />
        <Input
          placeholder="Search by brand or model"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-lg"
        />
      </div>
      <div className="w-full cursor-pointer md:w-[150px]">
        <CategoriesComboBoxResponsive
          selectedCategory={filterCategory}
          setFilterCategory={handleCategoryChange}
          allCategories={categories}
        />
      </div>
    </div>
  );
});

// Empty state component
const EmptyState = React.memo(function EmptyState() {
  return (
    <div className="bg-muted/20 rounded-lg border py-12 text-center">
      <h2 className="text-2xl font-semibold">No sneakers found</h2>
      <p className="text-muted-foreground mt-2">
        Try different search terms or filters
      </p>
    </div>
  );
});

// Product grid view
interface ProductViewProps {
  items: Footwear[];
}

const ProductGrid = React.memo(function ProductGrid({
  items,
}: ProductViewProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((shoe, index) => (
        <ProductCard key={shoe.id || index} shoe={shoe} />
      ))}
    </div>
  );
});

// Product card component
interface ProductCardProps {
  shoe: Footwear;
}

const ProductCard = React.memo(function ProductCard({
  shoe,
}: ProductCardProps) {
  const total = calculateOrderSummary(
    [{ ...shoe, quantity: 1 }],
    TAX_RATE
  ).total;
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link to="/footwear/$id" params={{ id: String(shoe.id) }}>
          <Card className="flex h-full flex-col overflow-hidden py-2 transition-shadow hover:shadow-md">
            <div className="bg-background relative aspect-square w-full">
              <img
                src={shoe.imageUrl}
                alt={`${shoe.brand} ${shoe.model}`}
                className="h-full w-full object-contain"
                onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
              />
              {/* Stock status badge */}
              <StockStatusBadge
                status={shoe.stockStatus}
                className="absolute top-2 right-2"
              >
                {shoe.stockStatus}
              </StockStatusBadge>
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1 pr-2">
                  <div className="font-semibold">{shoe.brand}</div>
                  <div className="text-muted-foreground text-sm">
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
              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="text-primary font-medium">
                  ${total.toFixed(2)} CAD
                </div>
                <div className="flex items-center gap-1">
                  <StarRating rating={shoe.comfortRatingOn5} />
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </HoverCardTrigger>
      <ProductHoverCardContent shoe={shoe} />
    </HoverCard>
  );
});

// Product hover card content
const ProductHoverCardContent = React.memo(function ProductHoverCardContent({
  shoe,
}: ProductCardProps) {
  return (
    <HoverCardContent className="w-80">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground font-medium">
              Release Year:
            </span>
            <p>{shoe.releaseYear}</p>
          </div>
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground font-medium">Material:</span>
            <p className="truncate">{shoe.material}</p>
          </div>
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground font-medium">
              Durability:
            </span>
            <div className="mt-0.5 flex items-center gap-1">
              <StarRating rating={shoe.durabilityRatingOn5} />
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground font-medium">
              Sustainability:
            </span>
            <p className="truncate">{shoe.sustainability}</p>
          </div>
        </div>
      </div>
    </HoverCardContent>
  );
});

// List view
const ProductList = React.memo(function ProductList({
  items,
}: ProductViewProps) {
  return (
    <div className="flex w-full flex-col space-y-4">
      {items.map((shoe, index) => (
        <ProductListItem key={shoe.id || index} shoe={shoe} />
      ))}
    </div>
  );
});

// Product list item
const ProductListItem = React.memo(function ProductListItem({
  shoe,
}: ProductCardProps) {
  const total = calculateOrderSummary(
    [{ ...shoe, quantity: 1 }],
    TAX_RATE
  ).total;
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          to="/footwear/$id"
          params={{ id: String(shoe.id) }}
          className="focus-visible:ring-ring block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Card className="overflow-hidden px-6 transition-all hover:shadow-lg">
            <div className="flex">
              {/* Left side - Image */}
              <div className="relative h-24 w-32 flex-shrink-0">
                <img
                  src={shoe.imageUrl}
                  alt={`${shoe.brand} ${shoe.model}`}
                  className="h-full w-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                />
              </div>
              {/* Right side - Content */}
              <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
                {/* Top row - Brand/Model and Category */}
                <div className="mb-2 flex items-start justify-between">
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center gap-2 font-semibold">
                      {shoe.brand}
                      <StockStatusBadge
                        status={shoe.stockStatus}
                        className="hidden flex-shrink-0 sm:inline-block"
                      >
                        {shoe.stockStatus}
                      </StockStatusBadge>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {shoe.model}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <StockStatusBadge
                      status={shoe.stockStatus}
                      className="inline-block flex-shrink-0 sm:hidden"
                    >
                      {shoe.stockStatus}
                    </StockStatusBadge>
                    <CategoryBadge
                      category={shoe.category}
                      className="flex-shrink-0"
                    >
                      {shoe.category}
                    </CategoryBadge>
                  </div>
                </div>
                {/* Bottom row - Price and Comfort Rating */}
                <div className="flex items-center justify-between">
                  <div className="text-primary font-medium">
                    ${total.toFixed(2)} CAD
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground hidden font-medium sm:inline-block">
                      Comfort Rating:
                    </span>
                    <StarRating
                      rating={shoe.comfortRatingOn5}
                      iconSize={"h-3 w-3 sm:h-5 sm:w-5"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </HoverCardTrigger>
      <ProductHoverCardContent shoe={shoe} />
    </HoverCard>
  );
});

// Pagination component
interface FootwearPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  renderPageNumbers: () => React.ReactNode;
}

const FootwearPagination = React.memo(function FootwearPagination({
  currentPage,
  totalPages,
  handlePageChange,
  renderPageNumbers,
}: FootwearPaginationProps) {
  return (
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
          <PaginationItem className="cursor-pointer sm:hidden">
            <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
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
          <PaginationItem className="hidden cursor-pointer sm:inline-flex">
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        )}
        {/* Mobile next button */}
        {currentPage < totalPages && (
          <PaginationItem className="cursor-pointer sm:hidden">
            <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
});

// Badge components
interface CategoryBadgeProps {
  category: Category;
  className?: string;
  children: React.ReactNode;
}

const CategoryBadge = React.memo(function CategoryBadge({
  category,
  className,
  children,
}: CategoryBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(categoryTypeColors[category], className)}
    >
      {children}
    </Badge>
  );
});

interface StockStatusBadgeProps {
  status: StockStatus;
  className?: string;
  children: React.ReactNode;
}

const StockStatusBadge = React.memo(function StockStatusBadge({
  status,
  className,
  children,
}: StockStatusBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(stockStatusColors[status], className)}
    >
      {children}
    </Badge>
  );
});

// Filter sheet props interface
interface FilterSheetProps {
  searchQuery: string;
  filterCategory: string;
  priceRange: number[];
  minMaxPrices: number[];
  selectedBrands: string[];
  selectedSustainability: string[];
  selectedFitTypes: string[];
  selectedStockStatus: string[];
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (newCategory: string) => void;
  setPriceRange: (value: number[]) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedSustainability: (ratings: string[]) => void;
  setSelectedFitTypes: (types: string[]) => void;
  setSelectedStockStatus: (statuses: string[]) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  categories: string[];
  footwearData: Footwear[];
}

// Filter sheet component
function FilterSheet({
  searchQuery,
  filterCategory,
  priceRange,
  minMaxPrices,
  selectedBrands,
  selectedSustainability,
  selectedFitTypes,
  selectedStockStatus,
  handleSearchChange,
  handleCategoryChange,
  setPriceRange,
  setSelectedBrands,
  setSelectedSustainability,
  setSelectedFitTypes,
  setSelectedStockStatus,
  resetFilters,
  applyFilters,
  categories,
  footwearData,
}: FilterSheetProps) {
  const allBrands = useMemo(
    () => Array.from(new Set(footwearData.map((shoe) => shoe.brand))),
    [footwearData]
  );
  const allStockStatuses = [...stockStatusList];
  const allFitTypes = [...fitTypeList];
  const allSustainability = [...sustainabilityRatingList];
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Generic function to handle checkbox changes
  const handleCheckboxChange = <T extends string>(
    isChecked: boolean | "indeterminate",
    item: T,
    selected: T[],
    setSelected: (items: T[]) => void
  ) => {
    if (isChecked === true) {
      setSelected([...selected, item]);
    } else {
      setSelected(selected.filter((i) => i !== item));
    }
  };

  return (
    <Sheet>
      <div className="flex items-center justify-center gap-2">
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            ref={triggerRef}
          >
            <ListFilter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </SheetTrigger>
        <Button variant="destructive" size="sm" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
      <SheetContent
        className="flex w-full flex-col gap-6 overflow-y-auto p-6 sm:max-w-md"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <SheetHeader className="p-4 pb-0">
          <SheetTitle>Filter Footwear</SheetTitle>
          <SheetDescription>
            Refine your search with multiple filter options
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6">
          {/* Model Search */}
          <div className="space-y-2">
            <Label htmlFor="model-search">Model Search</Label>
            <Input
              id="model-search"
              placeholder="Search by model name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          {/* Category Combobox */}
          <div className="space-y-2">
            <CategoriesComboBoxResponsive
              allCategories={categories}
              selectedCategory={filterCategory}
              setFilterCategory={handleCategoryChange}
            />
          </div>
          {/* Price Range Slider */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Price Range (CAD)</Label>
              <span className="text-muted-foreground text-sm">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              min={minMaxPrices[0]}
              max={minMaxPrices[1]}
              step={10}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value)}
              className="py-4"
            />
          </div>
          <Accordion type="multiple" className="w-full">
            {/* Brand Filter */}
            <FilterAccordionItem
              title="Brand"
              count={selectedBrands.length}
              items={allBrands}
              selectedItems={selectedBrands}
              setSelectedItems={setSelectedBrands}
              gridColumns={2}
            />
            {/* Sustainability Rating */}
            <FilterAccordionItem
              title="Sustainability"
              count={selectedSustainability.length}
              items={allSustainability}
              selectedItems={selectedSustainability}
              setSelectedItems={setSelectedSustainability}
              gridColumns={1}
            />
            {/* Fit Type Filter */}
            <FilterAccordionItem
              title="Fit Type"
              count={selectedFitTypes.length}
              items={allFitTypes}
              selectedItems={selectedFitTypes}
              setSelectedItems={setSelectedFitTypes}
              gridColumns={2}
            />
            {/* Stock Status Filter */}
            <AccordionItem value="stockStatus">
              <AccordionTrigger className="py-3">
                Stock Status
                {selectedStockStatus.length > 0 &&
                  ` (${selectedStockStatus.length})`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid max-h-36 grid-cols-2 gap-2 overflow-y-auto pt-2 pr-2">
                  {allStockStatuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={selectedStockStatus.includes(status)}
                        onCheckedChange={(checked) => {
                          handleCheckboxChange(
                            checked,
                            status,
                            selectedStockStatus,
                            setSelectedStockStatus
                          );
                        }}
                      />
                      <Label
                        htmlFor={`status-${status}`}
                        className="flex items-center text-sm"
                      >
                        <span
                          className={cn(
                            "mr-2 h-2 w-2 rounded-full",
                            stockStatusColors[status]?.split(" ")[0] || ""
                          )}
                        ></span>
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* Filter Actions */}
          <div className="flex justify-between pt-2">
            <Button variant="destructive" onClick={resetFilters}>
              Reset Filters
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Filter accordion item component
interface FilterAccordionItemProps<T extends string> {
  title: string;
  count: number;
  items: T[];
  selectedItems: T[];
  setSelectedItems: (items: T[]) => void;
  gridColumns?: number;
}

function FilterAccordionItem<T extends string>({
  title,
  count,
  items,
  selectedItems,
  setSelectedItems,
  gridColumns = 2,
}: FilterAccordionItemProps<T>) {
  const gridColumnsClass =
    gridColumns === 1
      ? "grid-cols-1"
      : gridColumns === 2
        ? "grid-cols-2"
        : gridColumns === 3
          ? "grid-cols-3"
          : "grid-cols-4";
  return (
    <AccordionItem value={title.toLowerCase()}>
      <AccordionTrigger className="py-3">
        {title}
        {count > 0 && ` (${count})`}
      </AccordionTrigger>
      <AccordionContent>
        <div
          className={`grid ${gridColumnsClass} max-h-48 gap-2 overflow-y-auto pt-2 pr-2`}
        >
          {items.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={`${title.toLowerCase()}-${item}`}
                checked={selectedItems.includes(item)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedItems([...selectedItems, item]);
                  } else {
                    setSelectedItems(selectedItems.filter((i) => i !== item));
                  }
                }}
              />
              <Label
                htmlFor={`${title.toLowerCase()}-${item}`}
                className="text-sm"
              >
                {item}
              </Label>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// Categories combobox responsive component
export function CategoriesComboBoxResponsive({
  selectedCategory,
  allCategories,
  setFilterCategory,
}: {
  selectedCategory: string | null;
  allCategories: string[];
  setFilterCategory: (status: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const typedCategories = allCategories;
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && triggerRef.current) {
      setTimeout(() => {
        triggerRef.current?.focus();
      }, 0);
    }
  };
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            className="w-full justify-between"
          >
            {selectedCategory || "Set Category"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <CategoriesList
            selectedCategory={selectedCategory || ""}
            categories={typedCategories}
            setOpen={setOpen}
            setFilterCategory={setFilterCategory}
          />
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          className="w-full justify-between"
        >
          {selectedCategory || "Set Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="mt-2 self-center">
          Filter by Category
        </DrawerTitle>
        <div className="mt-4 border-t">
          <CategoriesList
            selectedCategory={selectedCategory || ""}
            categories={typedCategories}
            setOpen={setOpen}
            setFilterCategory={setFilterCategory}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Categories list component
const CategoriesList = React.memo(function CategoriesList({
  selectedCategory,
  categories,
  setOpen,
  setFilterCategory,
}: {
  selectedCategory: string;
  categories: string[];
  setOpen: (open: boolean) => void;
  setFilterCategory: (status: string) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter categories..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {categories.map((category) => (
            <CommandItem
              key={category}
              value={category}
              onSelect={(value) => {
                setFilterCategory(value);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  category === selectedCategory ? "opacity-100" : "opacity-0"
                )}
              />
              {category === "all" ? ALL_CATEGORIES : category}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
});
export default RouteComponent;
