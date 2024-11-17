export const cart = JSON.parse(localStorage.getItem('shopSEED-cart')) || [];

function saveToStorage() {
    localStorage.setItem('shopSEED-cart', JSON.stringify(cart))
}

export function addToCart(productId) {
    const selectQuantity = document.querySelector(`.js-select-quantity-${productId}`);
    const quantity = Number(selectQuantity.value)

    let matchingItem;
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity
    } else {
      cart.push({
        productId,
        quantity
      });
    }
  
    saveToStorage();
}