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
// Array to store cart items
let cartItems = [];

function addToCart(name, price, image) {
    const newItem = { name, price, image };
    cartItems.push(newItem);

    // Optionally, you can update the cart count or display a notification here
    updateCartCount();

    // You might also want to store the cartItems in localStorage or send them to the server
}

function updateCartCount() {
    // Update the cart item count on the page
    document.getElementById("cartItemCount").textContent = cartItems.length;
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = ''; // Clear previous items

  cartItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex justify-content-between lh-sm';
      listItem.innerHTML = `
          <div class="d-flex gap-3">
              <img src="${item.image}" alt="${item.name}" width="125px" />
              <div>
                  <h6 class="my-0">${item.name}</h6>
              </div>
          </div>
          <span class="text-body-secondary my-auto">$${item.price.toFixed(2)}</span>
      `;
      cartItemsContainer.appendChild(listItem);
  });
}
