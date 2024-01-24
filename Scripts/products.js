'use strict';

const apiUri = 'https://ordinary-apparel2-0-backend.vercel.app/api';

onload = async () => {
  await loadProducts();
  productModal();
};

async function loadProducts() {
  const productContainer = document.getElementById('productContainer');

  const response = await fetch(apiUri + '/products');
  const { products } = await response.json();
  console.log('products: ', products);

  productContainer.innerHTML = '';
  for (const product of products) {
    const cardHtml = `<div class="col-sm-4">
                        <div class="card shadow h-100">
                            <img src="${
                              product.image
                            }" class="card-img-top shadow" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">$${product.price.toFixed(2)}</p>
                                <a href="#" class="btn btn-dark fw-bold shadow">Add To Cart</a>
                                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#productModal" data-bs-id="${
                                  product.id
                                }">View Item</button>
                            </div>
                        </div>
                      </div>`;

    productContainer.insertAdjacentHTML('beforeend', cardHtml);
  }
}

function productModal() {
  const productModal = document.getElementById('productModal');
  if (productModal) {
    productModal.addEventListener('show.bs.modal', async (event) => {
      // Button that triggered the modal
      const button = event.relatedTarget;
      // Extract info from data-bs-* attributes
      const id = button.getAttribute('data-bs-id');
      // If necessary, you could initiate an Ajax request here
      // and then do the updating in a callback.
      const response = await fetch(apiUri + '/product/' + id);
      const { product } = await response.json();
      console.log(product);

      // Update the modal's content.
      const productTitle = document.getElementById('productModalLabel');
      const productImage = document.getElementById('productImage');
      const productPrice = document.getElementById('productPrice');
      const productStock = document.getElementById('productStock');

      productTitle.textContent = `${product.name}`;
      productImage.src = product.image;
      productPrice.textContent = `$${product.price.toFixed(2)}`;
      productStock.textContent = `Avaliable: ${product.stock}`;
    });
  }
}
