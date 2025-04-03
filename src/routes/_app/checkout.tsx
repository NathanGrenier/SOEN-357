import { createFileRoute, Link } from "@tanstack/react-router";
import footwearDataJson from "@/lib/assets/data/footwear.json";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Footwear } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  const cartItems = (footwearDataJson as Footwear[]).map((item) => ({
    ...item,
    size: 10, // placeholder value
    quantity: 1, // placeholder value
  }));

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.priceCAD * item.quantity,
    0
  );
  const shipping = 15;
  const tax = subtotal * 0.13; // 13% tax
  const total = subtotal + shipping + tax;

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8 flex items-center">
        <Link
          to="/footwear"
          className="text-muted-foreground hover:text-foreground flex items-center text-sm font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shopping
        </Link>
        <h1 className="ml-auto text-4xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column - Cart summary */}
        <div className="lg:col-span-2">
          <Card className="mb-6 rounded-lg border p-3">
            <h2 className="py-2 pl-2 text-xl font-semibold">Your Cart</h2>

            {cartItems.length === 0 ? (
              <p className="text-muted-foreground">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
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
                        {item.colorway.join(" / ")}
                      </p>
                      <div className="text-primary mt-2 flex items-center justify-between">
                        <span className="text-sm">Size: {item.size} US</span>
                        <span className="text-sm">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="mb-6 rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>
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
                <Input id="address" placeholder="Enter your street address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Enter your city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" placeholder="Enter your postal code" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
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
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex cursor-pointer items-center"
                >
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
                  <Input id="cvv" className="text-primary" placeholder="123" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column - Order summary */}
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
      </div>
    </main>
  );
}
