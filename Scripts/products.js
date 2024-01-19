'use strict';

const apiUri = 'https://ordinary-apparel2-0-backend.vercel.app/api';

onload = async () => {
  await loadProducts();
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
                            }" class="card-img-top shadow rounded" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">$${product.price.toFixed(2)}</p>
                                <a href="#" class="btn btn-dark fw-bold shadow">Add To Cart</a>
                            </div>
                        </div>
                      </div>`;

    productContainer.insertAdjacentHTML('beforeend', cardHtml);
  }
}
