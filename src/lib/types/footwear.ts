import { Retailers } from "./retailer";

export type MarketTrend =
  | "rise"
  | "stable"
  | "decline"
  | "volatile"
  | "emerging"
  | "falling sharply";

export type SustainabilityRating =
  | "Standard"
  | "Sustainable Materials"
  | "Eco-Friendly Production"
  | "Recycled Materials"
  | "Carbon Neutral"
  | "Vegan";

export type FitType =
  | "True to size"
  | "Runs small"
  | "Runs large"
  | "Slim Fit"
  | "Loose Fit"
  | "Oversized";

export type WidthType =
  | "Extra Narrow (2A)"
  | "Narrow (B)"
  | "Standard (D)"
  | "Wide (2E)"
  | "Extra Wide (4E)"
  | "Ultra Wide (6E)"
  | "Super Wide (8E)";

export type Category =
  | "Casual Wear"
  | "Lifestyle"
  | "Basketball"
  | "Hiking"
  | "Running"
  | "Tennis"
  | "Soccer"
  | "Cross-Trainers"
  | "Water Shoe"
  | "Indoor Mat"
  | "Slip-On"
  | "Flats"
  | "Heels"
  | "Boots"
  | "Workwear"
  | "Trail Running"
  | "Cycling"
  | "Formal";

export const categoryTypeColors: Record<Category, string> = {
  "Casual Wear":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Lifestyle:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Basketball:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Hiking:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  Running: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  Tennis: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300",
  Soccer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Cross-Trainers":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Water Shoe": "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
  "Indoor Mat":
    "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
  "Slip-On": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  Flats: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  Heels: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
  Boots: "bg-brown-100 text-brown-800 dark:bg-brown-900 dark:text-brown-300",
  Workwear: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  "Trail Running":
    "bg-olive-100 text-olive-800 dark:bg-olive-900 dark:text-olive-300",
  Cycling: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  Formal: "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300",
};

export type Color =
  | "Black"
  | "White"
  | "Red"
  | "Blue"
  | "Green"
  | "Yellow"
  | "Orange"
  | "Purple"
  | "Pink"
  | "Brown"
  | "Grey"
  | "Beige"
  | "Multi-Color";

export type StockStatus =
  | "In Stock"
  | "Out of Stock"
  | "Limited Stock"
  | "Pre-Order"
  | "Backordered"
  | "Discontinued";

export const stockStatusColors: Record<StockStatus, string> = {
  "In Stock":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Out of Stock": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "Limited Stock":
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  "Pre-Order": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Backordered:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Discontinued: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

export interface Footwear {
  id: number;
  brand: string;
  model: string;
  category: Category;
  colorway: Color[];
  releaseYear: number;
  material: string;
  priceCAD: number;
  resalePriceCAD?: number;
  marketTrend: MarketTrend;
  fit: FitType;
  width: WidthType;
  wideFitSizes?: number[];
  comfortRatingOn5: number;
  durabilityRatingOn5: number;
  sustainability: SustainabilityRating;
  bestFor: Category[];
  availableSizesUS: number[];
  stockStatus: StockStatus;
  retailers: Retailers;
  imageUrl: string; // the main image for footwear pages
  imageUrls: string[]; // other images for a gallery (top, side, etc.)
}
