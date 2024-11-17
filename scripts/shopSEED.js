import { addToCart, cart } from "./data/cart.js";
import { products } from "./data/products.js";

updateQuantity();

let productSummaryHTML = '';

products.forEach((product) => {

  productSummaryHTML += `<div class="product-container">
        <div class="img-container">
          <img class="product-image" src="${product.image}" alt="">
        </div>
        <p class="product-name text-to-2-lines">${product.name}</p>
        <div class="ratings">
          <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="">
          <span>${product.rating.count}</span>
        </div>
        <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
        <select name="" id="selectQuantity" class="js-select-quantity-${product.id}">
          <option value="1">1</option>
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
        <div class="added js-added-${product.id}">
          <img src="images/icons/checkmark.png" alt="">
          <span>Added</span>
        </div>
        <button class="btn btn-dark js-add-to-cart-btn"
        data-product-id = ${product.id}>Add to cart</button>
      </div>`
});
document.querySelector('.js-products-grid').innerHTML = productSummaryHTML;

document.querySelectorAll('.js-add-to-cart-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const { productId } = button.dataset;

    addToCart(productId);
    addedMessageFun(productId)
    updateQuantity();
  });


});

let addedMessageTimeout = {};
function addedMessageFun(productId) {
  const previousTimeoutId = addedMessageTimeout[productId];

  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId)
  }

  const addedMessage = document.querySelector(`.js-added-${productId}`);
  addedMessage.classList.add('opacity1');

  const timeout = setTimeout(() => {
    addedMessage.classList.remove('opacity1');
  }, 2000);

  addedMessageTimeout[productId] = timeout;
}

function updateQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}