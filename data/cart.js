export function updateCartQuantity() {
  // 计算总数量
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 更新页面上显示的数量
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.textContent = totalQuantity;
  }
}

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [];
  }
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let machingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      machingItem = cartItem;
    }
  });

  if (machingItem) {
    machingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let machingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      machingItem = cartItem;
    }
  });

  machingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
