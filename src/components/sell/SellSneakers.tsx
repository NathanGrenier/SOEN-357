import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type FormData = {
  brand: string;
  model: string;
  category: string;
  colorway: string[];
  releaseYear: number;
  material: string;
  priceCAD: number;
  resalePriceCAD: number;
  marketTrend: "rise" | "fall" | "stable";
  fit: string;
  width: string;
  comfortRatingOn5: number;
  durabilityRatingOn5: number;
  sustainability: string;
  bestFor: string[];
  availableSizesUS: number[];
  stockStatus: string;
  retailers: {
    name: string;
    price: number;
    url: string;
  }[];
  imageUrl: string;
  imageUrls: string[];
  tempSize: number;
  tempQuantity: number;
};

const CATEGORIES = ["Basketball", "Running", "Lifestyle", "Skateboarding", "Training"];
const FIT_OPTIONS = ["True to size", "Runs small", "Runs large"];
const WIDTH_OPTIONS = ["Narrow (B)", "Standard (D)", "Wide (2E)", "Extra Wide (4E)", "Super Wide (8E)"];
const MARKET_TRENDS = ["rise", "fall", "stable"];
const BEST_FOR_OPTIONS = ["Casual Wear", "Running", "Basketball", "Training", "Cross-Trainers"];
const SUSTAINABILITY_OPTIONS = ["Standard", "Eco-Friendly Production", "Vegan", "Recycled Materials"];

export function SellSneakers() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FormData>();

  const onSubmit = () => {
    const currentTime = new Date().toLocaleTimeString();
    toast.success("Sneaker listing submitted successfully!", {
      description: `Submitted at: ${currentTime}`,
    });
    reset(); // Optional: clear the form after submission
  };


  const handleAddRetailer = () => {
    const retailers = watch("retailers") || [];
    setValue("retailers", [...retailers, { name: "", price: 0, url: "" }]);
  };

  const handleRemoveRetailer = (index: number) => {
    const retailers = watch("retailers") || [];
    setValue("retailers", retailers.filter((_, i) => i !== index));
  };

  const handleAddImageUrl = () => {
    const imageUrls = watch("imageUrls") || [];
    setValue("imageUrls", [...imageUrls, ""]);
  };

  const handleRemoveImageUrl = (index: number) => {
    const imageUrls = watch("imageUrls") || [];
    setValue("imageUrls", imageUrls.filter((_, i) => i !== index));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent>
      <form 
      onSubmit={(e) => {e.preventDefault();
      handleSubmit(onSubmit)(e).catch(console.error);}}
      className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
            <h6 className="text-medium italic">*Required fields</h6>
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="brand">Brand*</Label>
                <Input
                  id="brand"
                  {...register("brand", { required: "Brand is required" })}
                />
                {errors.brand && <p className="text-sm text-red-500">{errors.brand.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model*</Label>
                <Input
                  id="model"
                  {...register("model", { required: "Model is required" })}
                />
                {errors.model && <p className="text-sm text-red-500">{errors.model.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category*</Label>
                <Select
                  onValueChange={(value) => setValue("category", value)}
                  defaultValue={watch("category")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="colorway">Colorway*</Label>
                <Input
                  id="colorway"
                  placeholder="Comma-separated colors (e.g., Green, White, Black)"
                  {...register("colorway", {
                    setValueAs: (value: string) => {
                      if (!value) return [];
                      return value.split(",").map(c => c.trim()).filter(Boolean);
                    },
                    validate: (value) => {
                      const colors = Array.isArray(value) ? value : [];
                      return colors.length > 0 || "At least one color is required";
                    }
                  })}
                />
                {errors.colorway && (
                  <p className="text-sm text-red-500">{errors.colorway.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="releaseYear">Release Year*</Label>
                <Input
                  id="releaseYear"
                  type="number"
                  {...register("releaseYear", {
                    required: "Release year is required",
                    valueAsNumber: true,
                    min: { value: 1900, message: "Invalid year" },
                    max: { value: new Date().getFullYear(), message: "Future year not allowed" }
                  })}
                />
                {errors.releaseYear && <p className="text-sm text-red-500">{errors.releaseYear.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="material">Material*</Label>
                <Input
                  id="material"
                  {...register("material", { required: "Material is required" })}
                />
                {errors.material && <p className="text-sm text-red-500">{errors.material.message}</p>}
              </div>
            </div>

            {/* Pricing Information */}
            <div className="space-y-4">
            <h6 className="text-medium italic"> </h6>
              <h3 className="text-lg font-semibold">Pricing Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="priceCAD">Retail Price (CAD)*</Label>
                <Input
                  id="priceCAD"
                  type="number"
                  step="0.01"
                  {...register("priceCAD", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Price must be positive" }
                  })}
                />
                {errors.priceCAD && <p className="text-sm text-red-500">{errors.priceCAD.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="resalePriceCAD">Resale Price (CAD)*</Label>
                <Input
                  id="resalePriceCAD"
                  type="number"
                  step="0.01"
                  {...register("resalePriceCAD", {
                    required: "Resale price is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Price must be positive" }
                  })}
                />
                {errors.resalePriceCAD && <p className="text-sm text-red-500">{errors.resalePriceCAD.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketTrend">Market Trend*</Label>
                <Select
                  onValueChange={(value) => setValue("marketTrend", value as "rise" | "fall" | "stable")}
                  defaultValue={watch("marketTrend")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select market trend" />
                  </SelectTrigger>
                  <SelectContent>
                    {MARKET_TRENDS.map((trend) => (
                      <SelectItem key={trend} value={trend}>
                        {trend.charAt(0).toUpperCase() + trend.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Fit and Sizing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Fit & Sizing</h3>
              
              <div className="space-y-2">
                <Label htmlFor="fit">Fit*</Label>
                <Select
                  onValueChange={(value) => setValue("fit", value)}
                  defaultValue={watch("fit")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fit" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIT_OPTIONS.map((fit) => (
                      <SelectItem key={fit} value={fit}>
                        {fit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="width">Width*</Label>
                <Select
                  onValueChange={(value) => setValue("width", value)}
                  defaultValue={watch("width")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select width" />
                  </SelectTrigger>
                  <SelectContent>
                    {WIDTH_OPTIONS.map((width) => (
                      <SelectItem key={width} value={width}>
                        {width}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Ratings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ratings</h3>
              
              <div className="space-y-2">
                <Label htmlFor="comfortRatingOn5">Comfort Rating (1-5)*</Label>
                <Input
                  id="comfortRatingOn5"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  {...register("comfortRatingOn5", {
                    required: "Comfort rating is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Minimum rating is 1" },
                    max: { value: 5, message: "Maximum rating is 5" }
                  })}
                />
                {errors.comfortRatingOn5 && <p className="text-sm text-red-500">{errors.comfortRatingOn5.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="durabilityRatingOn5">Durability Rating (1-5)*</Label>
                <Input
                  id="durabilityRatingOn5"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  {...register("durabilityRatingOn5", {
                    required: "Durability rating is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Minimum rating is 1" },
                    max: { value: 5, message: "Maximum rating is 5" }
                  })}
                />
                {errors.durabilityRatingOn5 && <p className="text-sm text-red-500">{errors.durabilityRatingOn5.message}</p>}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="sustainability">Sustainability</Label>
                <Select
                  onValueChange={(value) => setValue("sustainability", value)}
                  defaultValue={watch("sustainability")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sustainability" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUSTAINABILITY_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Best Uses*</Label>
                <div className="grid grid-cols-2 gap-2">
                  {BEST_FOR_OPTIONS.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`bestFor-${option}`}
                        checked={watch("bestFor")?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const current = watch("bestFor") || [];
                          if (checked) {
                            setValue("bestFor", [...current, option]);
                          } else {
                            setValue("bestFor", current.filter(item => item !== option));
                          }
                        }}
                      />
                      <Label htmlFor={`bestFor-${option}`} className="font-normal">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.bestFor && <p className="text-sm text-red-500">{errors.bestFor.message}</p>}
              </div>

            </div>

            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Images</h3>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Main Image URL*</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  {...register("imageUrl", {
                    required: "Main image URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Must be a valid URL starting with http:// or https://"
                    }
                  })}
                />
                {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Additional Image URLs</Label>
                {(watch("imageUrls") || []).map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        const urls = [...(watch("imageUrls") || [])];
                        urls[index] = e.target.value;
                        setValue("imageUrls", urls);
                      }}
                      placeholder={`Additional image URL ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveImageUrl(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddImageUrl}
                >
                  Add Image URL
                </Button>
              </div>
            </div>
          </div>

          {/* Retailers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Retailers</h3>
            
            {(watch("retailers") || []).map((retailer, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor={`retailers.${index}.name`}>Retailer Name*</Label>
                  <Input
                    id={`retailers.${index}.name`}
                    value={retailer.name}
                    onChange={(e) => {
                      const retailers = [...(watch("retailers") || [])];
                      retailers[index].name = e.target.value;
                      setValue("retailers", retailers);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`retailers.${index}.price`}>Price (CAD)*</Label>
                  <Input
                    id={`retailers.${index}.price`}
                    type="number"
                    step="0.01"
                    value={retailer.price}
                    onChange={(e) => {
                      const retailers = [...(watch("retailers") || [])];
                      retailers[index].price = parseFloat(e.target.value);
                      setValue("retailers", retailers);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`retailers.${index}.url`}>URL*</Label>
                  <Input
                    id={`retailers.${index}.url`}
                    type="url"
                    value={retailer.url}
                    onChange={(e) => {
                      const retailers = [...(watch("retailers") || [])];
                      retailers[index].url = e.target.value;
                      setValue("retailers", retailers);
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleRemoveRetailer(index)}
                >
                  Remove Retailer
                </Button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddRetailer}
            >
              Add Retailer
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Inventory</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tempSize">Size (US)*</Label>
                <Input
                  id="tempSize"
                  type="number"
                  step="0.5"
                  min="1"
                  max="20"
                  {...register("tempSize", {
                    required: "Size is required",
                    valueAsNumber: true
                  })}
                />
                {errors.tempSize && <p className="text-sm text-red-500">{errors.tempSize.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempQuantity">Quantity Available*</Label>
                <Input
                  id="tempQuantity"
                  type="number"
                  min="0"
                  {...register("tempQuantity", {
                    required: "Quantity is required",
                    valueAsNumber: true
                  })}
                />
                {errors.tempQuantity && <p className="text-sm text-red-500">{errors.tempQuantity.message}</p>}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
          <Button 
            type="submit" 
            className="w-full md:w-auto">
            Submit Sneaker Listing
          </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}