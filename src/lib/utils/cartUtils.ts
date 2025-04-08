import { ExtendedCartItem, OrderSummary } from "@/lib/types/cart";

/**
 * Calculate order summary including subtotal, shipping, tax and total
 */
export function calculateOrderSummary(
  cartItems: ExtendedCartItem[],
  taxRate: number,
  shippingCost: number = 15
): OrderSummary {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.priceCAD || 0) * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? shippingCost : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
}
