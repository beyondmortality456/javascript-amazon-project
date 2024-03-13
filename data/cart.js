export const cart = [];

export function addToCart(productId) {
  let matchingItem;

  // Search for the product in the cart by its ID
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // If the product is already in the cart, increment its quantity by 1
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    // If the product is not in the cart, add it with a quantity of 1
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}