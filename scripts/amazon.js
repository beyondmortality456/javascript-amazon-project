import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

// Initialize an empty string to hold the HTML content for products
let productsHTML = "";

// Iterate over each product in the products array
products.forEach((product) => {
  // Construct HTML for each product using template literals for dynamic data insertion
  productsHTML += ` <div class="product-container">
    <div class="product-image-container">
      <img
        class="product-image"
        src="${product.image}"
      />
    </div>

    <div class="product-name limit-text-to-2-lines">
     ${product.name}
    </div>

    <div class="product-rating-container">
      <img
        class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png"
      />
      <div class="product-rating-count link-primary">${
        product.rating.count
      }</div>
    </div>

    <div class="product-price">${(product.priceCents / 100).toFixed(2)}</div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id="${product.id}"
    >Add to Cart</button>
  </div>`;
});

// Insert the constructed productsHTML into the document within the element having 'js-products-grid' class
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// Add event listeners to all 'Add to Cart' buttons
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // Retrieve the product ID stored in the data-product-id attribute of the button
    const productId = button.dataset.productId;

    let matchingItem;

    // Search for the product in the cart by its ID
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
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

    // Calculate the total quantity of all items in the cart
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    // Update the cart quantity display on the page
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  });
});
