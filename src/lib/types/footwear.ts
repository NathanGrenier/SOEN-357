import { Retailers } from "./retailer";

export type MarketTrend = 'rise' | 'stable' | 'decline' | 'volatile' | 'emerging' | 'falling sharply';

export type SustainabilityRating = 
  | 'Standard' 
  | 'Sustainable Materials' 
  | 'Eco-Friendly Production' 
  | 'Recycled Materials' 
  | 'Carbon Neutral' 
  | 'Vegan';

export type FitType = 
  | 'True to size' 
  | 'Runs small' 
  | 'Runs large' 
  | 'Slim Fit' 
  | 'Loose Fit' 
  | 'Oversized';

export type WidthType = 
  | 'Extra Narrow (2A)' 
  | 'Narrow (B)' 
  | 'Standard (D)' 
  | 'Wide (2E)' 
  | 'Extra Wide (4E)' 
  | 'Ultra Wide (6E)' 
  | 'Super Wide (8E)';

export type UsageType = 
  | 'Casual Wear' 
  | 'Basketball' 
  | 'Hiking' 
  | 'Running' 
  | 'Tennis' 
  | 'Soccer' 
  | 'Cross-Trainers' 
  | 'Water Shoe' 
  | 'Indoor Mat' 
  | 'Slip-On' 
  | 'Flats' 
  | 'Heels' 
  | 'Boots' 
  | 'Workwear' 
  | 'Trail Running' 
  | 'Cycling' 
  | 'Formal';

export type Color = 
  | 'Black' 
  | 'White' 
  | 'Red' 
  | 'Blue' 
  | 'Green' 
  | 'Yellow' 
  | 'Orange' 
  | 'Purple' 
  | 'Pink' 
  | 'Brown' 
  | 'Grey' 
  | 'Beige' 
  | 'Multi-Color';

export type StockStatus = 
  | 'In Stock' 
  | 'Out of Stock' 
  | 'Limited Stock' 
  | 'Pre-Order' 
  | 'Backordered' 
  | 'Discontinued';

export interface Footwear {
  id: number;
  brand: string;
  model: string;
  category: string;
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
  bestFor: UsageType[];
  availableSizesUS: number[];
  stockStatus: StockStatus;
  retailers: Retailers;
  imageUrl: string; // the main image for footwear pages
  imageUrls: string[]; // other images for a gallery (top, side, etc.)
}
