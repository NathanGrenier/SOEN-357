const CART_STORAGE_KEY = "footwear-cart-items";

export interface CartItem {
  id: number;
  quantity: number;
}

/**
 * Get all footwear IDs in the cart
 */
export function getCartItems(): CartItem[] {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  if (!cartJson) return [];

  try {
    return JSON.parse(cartJson) as CartItem[];
  } catch (e) {
    console.error("Failed to parse cart data:", e);
    return [];
  }
}

/**
 * Add a footwear item to the cart
 */
export function addToCart(
  footwearId: number,
  quantity: number = 1
): CartItem[] {
  const currentCart = getCartItems();

  // Check if item already exists
  const existingItemIndex = currentCart.findIndex(
    (item) => item.id === footwearId
  );

  if (existingItemIndex >= 0) {
    currentCart[existingItemIndex].quantity += quantity;
  } else {
    currentCart.push({ id: footwearId, quantity });
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentCart));

  return currentCart;
}

/**
 * Remove a footwear item from the cart
 */
export function removeFromCart(footwearId: number): CartItem[] {
  const currentCart = getCartItems();
  const updatedCart = currentCart.filter((item) => item.id !== footwearId);

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));

  return updatedCart;
}

/**
 * Update the quantity of a footwear item in the cart
 */
export function updateCartItemQuantity(
  footwearId: number,
  quantity: number
): CartItem[] {
  const currentCart = getCartItems();

  const existingItemIndex = currentCart.findIndex(
    (item) => item.id === footwearId
  );

  if (existingItemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return removeFromCart(footwearId);
    }

    currentCart[existingItemIndex].quantity = quantity;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentCart));
  }

  return currentCart;
}

/**
 * Clear all items from the cart
 */
export function clearCart(): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
}

/**
 * Get the total number of items in the cart
 */
export function getCartItemCount(): number {
  const cart = getCartItems();
  return cart.reduce((total, item) => total + item.quantity, 0);
}
