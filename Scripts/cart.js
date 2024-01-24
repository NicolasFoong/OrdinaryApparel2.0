// Array to store cart items
let cartItems = [];

// Function to update the total amount and cart count
function updateTotal() {
    const cartItemsContainer = document.getElementById('cartItems');
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const price = parseFloat(cartItems[i].price);
        total += price;
    }

    document.getElementById('totalAmount').innerText = total.toFixed(2);
    document.getElementById('cartItemCount').innerText = cartItems.length;


    updateLocalStorage();

    displayCartItems();
}

// Function to add items to the cart
function addToCart(name, price, image) {
    const newItem = { name, price, image };
    cartItems.push(newItem);

    // Update the cart count and total amount
    updateTotal();

}

// Function to update the cart count on the page
function updateCartCount() {
    document.getElementById("cartItemCount").textContent = cartItems.length;
}

// Function to display cart items on the checkout page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

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

// Function to update local storage with the current cart items
function updateLocalStorage() {
    // Store the cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to load cart items from local storage when the page loads
function loadCartFromLocalStorage() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
        cartItems = JSON.parse(storedItems);

        updateCartCount();
        displayCartItems();
    }
}

// Call this function when the page loads to load cart items from local storage
document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);


// document.addEventListener('DOMContentLoaded', updateTotal);

// function updateTotal() {
//   const cartItems = document.getElementById('cartItems').children;
//   let total = 0;

//   for (let i = 0; i < cartItems.length; i++) {
//     const price = parseFloat(cartItems[i].getAttribute('data-price').replace('$', ''));
//     total += price;
//   }

//   document.getElementById('totalAmount').innerText = total.toFixed(2);
//   document.getElementById('cartItemCount').innerText = cartItems.length;
// }
// // Array to store cart items
// let cartItems = [];

// function addToCart(name, price, image) {
//     const newItem = { name, price, image };
//     cartItems.push(newItem);

//     updateCartCount();

// }

// function updateCartCount() {
//     // Update the cart item count on the page
//     document.getElementById("cartItemCount").textContent = cartItems.length;
// }

// function displayCartItems() {
//   const cartItemsContainer = document.getElementById('cartItems');
//   cartItemsContainer.innerHTML = ''; // Clear previous items

//   cartItems.forEach(item => {
//       const listItem = document.createElement('li');
//       listItem.className = 'list-group-item d-flex justify-content-between lh-sm';
//       listItem.innerHTML = `
//           <div class="d-flex gap-3">
//               <img src="${item.image}" alt="${item.name}" width="125px" />
//               <div>
//                   <h6 class="my-0">${item.name}</h6>
//               </div>
//           </div>
//           <span class="text-body-secondary my-auto">$${item.price.toFixed(2)}</span>
//       `;
//       cartItemsContainer.appendChild(listItem);
//   });
// }
