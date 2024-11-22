import { cart, removeFromCart, saveNewQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

updateQuantity();
let cartSummaryHTML = '';
cart.forEach((cartItem) => {
  const { productId } = cartItem;

  let matchingProduct;
  products.forEach((product) => {

    if (productId === product.id) {
      matchingProduct = product
    }
  });

  cartSummaryHTML += `
    <div class="cart-summary js-cart-summary-${matchingProduct.id}">

          <h4 class="text-success">Delivery date: Wednesday, November 27</h4>
  
          <div class="cart-item-details">
            <div class="d-flex">
              <div class="img-container">
                <img src="${matchingProduct.image}" alt="">
              </div>
  
              <div class="cart-details">
                <div class="product-name text-to-2-lines">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="cart-update">
                  <span class="quantity-label">
                    Quantity: <span class="cart-quantity js-cart-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <input type="text" class="input-quantity js-input-quantity-${matchingProduct.id}" />
                  <span class="text-primary save-quantity js-save-quantity"
                  data-product-id = ${matchingProduct.id}>Save</span>
                  <span class="update-quantity js-update-quantity text-primary"
                  data-product-id = ${matchingProduct.id}>
                    Update
                  </span>
                  <span class="delete-item js-delete-item text-danger"
                  data-product-id = ${matchingProduct.id}>
                    Delete
                  </span>
                </div>
  
  
              </div>
            </div>
  
  
            <div class="delivery-options-details">
              <div class="delivery-title">
                Choose a delivery option:
              </div>
  
              <div class="delivery-details">
                <input type="radio" name="delivery-option-1">
                <div class="delivery-option">
                  <div class="delivery-date">Wednesday, November 27</div>
                  <div class="shipping">Free Shipping</div>
                </div>
              </div>
              <div class="delivery-details">
                <input type="radio" name="delivery-option-1">
                <div class="delivery-option">
                  <div class="delivery-date">Wednesday, November 27</div>
                  <div class="shipping">Free Shipping</div>
                </div>
              </div>
              <div class="delivery-details">
                <input type="radio" name="delivery-option-1">
                <div class="delivery-option">
                  <div class="delivery-date">Wednesday, November 27</div>
                  <div class="shipping">Free Shipping</div>
                </div>
              </div>
            </div>
  
          </div>
        </div>
  `
});
document.querySelector('.js-cart-summary-container').innerHTML = cartSummaryHTML;

// delete button
document.querySelectorAll('.js-delete-item').forEach((link) => {
  link.addEventListener('click', () => {
    const { productId } = link.dataset;

    const container = document.querySelector(`.js-cart-summary-${productId}`);
    container.remove();

    removeFromCart(productId);
    updateQuantity();

  })
})

// update cart quantity
document.querySelectorAll('.js-update-quantity').forEach((link) => {
  link.addEventListener('click', () => {
    const {productId} = link.dataset;

    const container = document.querySelector(`.js-cart-summary-${productId}`);
    container.classList.add('edit-quantity');
  })
})

// save new cart quantity
document.querySelectorAll('.js-save-quantity').forEach((link) => {
  link.addEventListener('click', () => {
    const {productId} = link.dataset;

    const inputQunatity = document.querySelector(`.js-input-quantity-${productId}`);
    const newQuantity = Number(inputQunatity.value);

    const container = document.querySelector(`.js-cart-summary-${productId}`);
    container.classList.remove('edit-quantity');
    
    saveNewQuantity(productId, newQuantity);
    
    document.querySelector(`.js-cart-quantity-${productId}`).innerHTML = newQuantity;

    updateQuantity()
  })
});

function updateQuantity(params) {
  let cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity
  });

  document.querySelector('.js-quantity-item').innerHTML = `${cartQuantity} items`
}