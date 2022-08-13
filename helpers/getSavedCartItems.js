const getSavedCartItems = () => {
  const cartList = document.querySelector('.cart__items');
  cartList.innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
