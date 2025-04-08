import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CreditCard,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Footwear, ExtendedCartItem } from "@/lib/types";
import {
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
} from "@/lib/utils/cartStorage";
import { calculateOrderSummary } from "@/lib/utils/cartUtils";
import footwearDataJson from "@/lib/assets/data/footwear.json";

export const TAX_RATE = 0.13; // 13% tax rate

export const Route = createFileRoute("/_app/checkout")({
  loader: () => {
    const cartItems = getCartItems();
    const footwearData = footwearDataJson as Footwear[];

    // Combine cart items with footwear data
    const extendedCartItems = cartItems
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

    return {
      cartItems: extendedCartItems,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { cartItems: initialCartItems } = Route.useLoaderData();
  const [cartItems, setCartItems] =
    useState<ExtendedCartItem[]>(initialCartItems);

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
    // Update local state with new quantity
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const { subtotal, shipping, tax, total } = calculateOrderSummary(
    cartItems,
    TAX_RATE
  );

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8 flex flex-col gap-8">
        <Link
          to="/footwear"
          className="text-muted-foreground hover:text-foreground flex items-center text-sm font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shopping
        </Link>
        <h1 className="text-4xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column - Cart summary */}
        <div
          className={cartItems.length === 0 ? "lg:col-span-3" : "lg:col-span-2"}
        >
          <Card className="mb-6 rounded-lg border p-3">
            <h2 className="py-2 pl-2 text-xl font-semibold">Your Cart</h2>

            {cartItems.length === 0 ? (
              <div className="px-6 py-12 text-center lg:col-span-3">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-muted-foreground bg-muted/30 rounded-full p-6">
                    <ShoppingCart className="h-12 w-12" />
                  </div>
                  <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                  <p className="text-muted-foreground mx-auto mb-4 max-w-md">
                    Looks like you haven&apos;t added any items to your cart
                    yet. Browse our collection to find your perfect footwear.
                  </p>
                  <Link to="/footwear">
                    <Button size="lg" className="gap-2">
                      <ShoppingCart className="h-4 w-4" /> Browse Collection
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl border p-3 shadow-md"
                  >
                    <div className="my-auto w-20 flex-shrink-0 overflow-hidden rounded-md p-1 md:w-24">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={`${item.brand} ${item.model}`}
                        className="my-auto h-auto w-20 rounded-md object-cover md:w-24"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-primary font-medium">
                          {item.brand} {item.model}
                        </h3>
                        <span className="text-primary font-medium">
                          ${item.priceCAD}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {item.colorway?.join(" / ")}
                      </p>
                      <div className="text-primary mt-2 flex items-center justify-between">
                        <span className="text-sm">Size: {item.fit} US</span>
                        <div className="flex items-center gap-2">
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
                          <span className="w-5 text-center">
                            {item.quantity}
                          </span>
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
                            className="ml-2 h-8 w-8 text-red-500"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {cartItems.length > 0 && (
            <>
              <Card className="mb-6 rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter your street address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter your city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      placeholder="Enter your postal code"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </Card>

              <Card className="rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
                <RadioGroup defaultValue="card">
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Label
                      htmlFor="card"
                      className="flex cursor-pointer items-center"
                    >
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="mr-2 h-5 w-5" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">
                      <img
                        className="mr-2 h-5 w-5"
                        src="https://cdn.simpleicons.org/paypal"
                      />
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      className="text-primary"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        className="text-primary"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        className="text-primary"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        {/* Right column - Order summary */}
        {cartItems.length > 0 && (
          <div className="lg:col-span-1">
            <Card className="sticky top-[20%] rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="mt-6 w-full" size="lg">
                Place Order
              </Button>

              <div className="text-muted-foreground mt-6 text-center text-sm">
                <p>By placing your order, you agree to our</p>
                <div className="flex justify-center gap-1">
                  <Link
                    to="/checkout"
                    className="hover:text-foreground underline"
                  >
                    Terms of Service
                  </Link>
                  <span>&</span>
                  <Link
                    to="/checkout"
                    className="hover:text-foreground underline"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
