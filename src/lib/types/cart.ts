import { Footwear } from "./footwear";

export interface ExtendedCartItem extends Footwear {
  quantity: number;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
