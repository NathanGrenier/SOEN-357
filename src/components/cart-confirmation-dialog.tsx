"use client";

import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AuthRequiredButton } from "@/components/auth-required-button";

import { categoryTypeColors, type Footwear } from "@/lib/types/footwear";
import { useAuth } from "@/hooks/use-auth";

interface CartConfirmationProps {
  footwear: Footwear;
  selectedSize: number | null;
  handleAddToCart: () => void;
  onClose: () => void;
}

export function CartConfirmationDialog({
  footwear,
  selectedSize,
  handleAddToCart,
  onClose,
}: CartConfirmationProps) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Function to handle adding to cart and opening dialog
  const handleAddAndShowDialog = () => {
    if (selectedSize) {
      handleAddToCart();
      setOpen(true);
    }
  };

  // Function to close dialog and call onClose callback
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <>
      <AuthRequiredButton
        isAuthenticated={isAuthenticated}
        disabled={!selectedSize}
        asChild
      >
        <Button
          variant="default"
          onClick={handleAddAndShowDialog}
          className={`flex items-center gap-2`}
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </AuthRequiredButton>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Added to Cart</DialogTitle>
            <DialogDescription>
              Your item has been successfully added to your cart.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4 md:flex-row">
            <div className="w-full flex-shrink-0 md:w-1/3">
              <div className="relative overflow-hidden rounded-md border">
                <img
                  src={footwear.imageUrl || "/placeholder.svg"}
                  alt={`${footwear.brand} ${footwear.model}`}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-medium">
                  {footwear.brand} {footwear.model}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {footwear.colorway.map((color) => color).join(", ")}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Size: US {selectedSize}</Badge>
                <Badge
                  className={categoryTypeColors[footwear.category]}
                  variant="outline"
                >
                  {footwear.category}
                </Badge>
              </div>

              <div className="font-medium">
                ${footwear.priceCAD.toFixed(2)} CAD
              </div>

              {footwear.stockStatus === "Limited Stock" && (
                <p className="text-sm font-medium text-amber-600">
                  Limited Stock
                </p>
              )}
            </div>
          </div>

          <Separator />

          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={handleClose}
              className="sm:flex-1"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => {
                handleClose();
                window.dispatchEvent(new CustomEvent("open-cart-sheet"));
              }}
              className="w-full sm:flex-1"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              View Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
