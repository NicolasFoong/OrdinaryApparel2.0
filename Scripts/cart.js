document.addEventListener('DOMContentLoaded', updateTotal);

function updateTotal() {
  const cartItems = document.getElementById('cartItems').children;
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const price = parseFloat(cartItems[i].getAttribute('data-price').replace('$', ''));
    total += price;
  }

  document.getElementById('totalAmount').innerText = total.toFixed(2);
  document.getElementById('cartItemCount').innerText = cartItems.length;
}
