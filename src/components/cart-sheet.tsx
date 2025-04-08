import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
} from "@/lib/utils/cartStorage";
import { calculateOrderSummary } from "@/lib/utils/cartUtils";
import { cn } from "@/lib/utils/utils";
import { Footwear, ExtendedCartItem } from "@/lib/types";
import { TAX_RATE } from "@/lib/constants";
import footwearDataJson from "@/lib/assets/data/footwear.json";

export function CartSheet({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ExtendedCartItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Load cart items when the sheet opens
  useEffect(() => {
    if (isOpen) {
      const rawCartItems = getCartItems();
      const footwearData = footwearDataJson as Footwear[];

      // Combine cart items with footwear data
      const extendedCartItems = rawCartItems
        .map((cartItem) => {
          const footwearItem = footwearData.find(
            (item) => item.id === cartItem.id
          );

          if (!footwearItem) {
            return null;
          }

          return {
            ...footwearItem,
            quantity: cartItem.quantity,
          };
        })
        .filter(Boolean) as ExtendedCartItem[];

      setCartItems(extendedCartItems);
    }
  }, [isOpen]);

  // Load cart items on mount
  useEffect(() => {
    const loadCartItems = () => {
      const rawCartItems = getCartItems();
      const footwearData = footwearDataJson as Footwear[];

      const extendedCartItems = rawCartItems
        .map((cartItem) => {
          const footwearItem = footwearData.find(
            (item) => item.id === cartItem.id
          );

          if (!footwearItem) {
            return null;
          }

          return {
            ...footwearItem,
            quantity: cartItem.quantity,
          };
        })
        .filter(Boolean) as ExtendedCartItem[];

      setCartItems(extendedCartItems);
    };

    // Load on component mount
    loadCartItems();

    // Handle both cross-tab updates and same-window updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "footwear-cart-items") {
        loadCartItems();
      }
    };

    const handleCartUpdated = () => {
      loadCartItems();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cart-updated", handleCartUpdated);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, []);

  useEffect(() => {
    const handleOpenCartSheet = (event: Event) => {
      const customEvent = event as Event & { _handled?: boolean };

      if (customEvent._handled) {
        return;
      }

      // Mark the event as handled
      customEvent._handled = true;

      setIsOpen(true);
    };

    window.addEventListener("open-cart-sheet", handleOpenCartSheet);

    return () => {
      window.removeEventListener("open-cart-sheet", handleOpenCartSheet);
    };
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is the sm breakpoint in Tailwind
    };

    // Check initially
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    updateCartItemQuantity(itemId, newQuantity);

    // Update local state with new quantity
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
    // Update local state
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const { subtotal, shipping, tax, total } = calculateOrderSummary(
    cartItems,
    TAX_RATE
  );

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative" size="icon">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full p-0">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "flex w-full flex-col gap-0 p-4 sm:max-w-md",
          isMobile && "h-[85vh] rounded-t-xl"
        )}
      >
        <SheetHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">Your Cart</SheetTitle>
          </div>
          {cartItems.length > 0 && (
            <p className="text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          )}
        </SheetHeader>

        <Separator className="my-4" />

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <ShoppingCart className="text-muted-foreground mb-4 h-12 w-12" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-muted-foreground mb-4 text-sm">
              Add items to your cart to see them here
            </p>
            <SheetClose asChild>
              <Link to="/footwear">
                <Button>Browse Products</Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col overflow-hidden">
              <ScrollArea className="min-h-0 flex-1 pr-4">
                <div className="space-y-4 pb-2">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.fit}`}
                      className="flex items-center space-x-4"
                    >
                      <div className="h-16 w-16 overflow-hidden rounded-md border">
                        <img
                          src={item.imageUrl}
                          alt={item.model}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium">{item.model}</h4>
                        <p className="text-muted-foreground text-sm">
                          Size: {item.fit}
                        </p>
                        <p className="text-sm font-medium">
                          ${item.priceCAD.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive h-8 w-8"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="mt-auto space-y-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm font-medium">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tax</span>
                  <span className="text-sm font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <SheetClose asChild>
                  <Link to="/checkout">
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/footwear">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
