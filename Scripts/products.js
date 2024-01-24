'use strict';

const apiUri = 'https://ordinary-apparel2-0-backend.vercel.app/api';
//https://ordinary-apparel2-0-backend.vercel.app
//http://localhost:3000/api

const loginInfo = getLoginData();

onload = async () => {
  await loadProducts();
  productModal();
  submitReviewHandler();
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
                                <a href="#" class="btn btn-dark fw-bold shadow" onclick="addToCart(${JSON.stringify(product)})">Add To Cart</a>
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
      const productDescription = document.getElementById('productDescription');
      const reviewContainer = document.getElementById('reviewContainer');

      reviewContainer.innerHTML = '';

      const reviewSubmitButton = document.getElementById('reviewButton');
      reviewSubmitButton.setAttribute('data-bs-id', id);

      productTitle.textContent = `${product.name}`;
      productImage.src = product.image;
      productPrice.textContent = `$${product.price.toFixed(2)}`;
      productStock.textContent = `Avaliable: ${product.stock}`;

      if (product.description)
        productDescription.innerHTML = `<h6>Description</h6> ${product.description}`;
      else productDescription.innerHTML = '';

      if (product.comments.length === 0) {
        reviewContainer.innerHTML =
          '<p class="text-center" id="hasReview">No reviews.</p>';
      } else {
        for (const comment of product.comments) {
          addCommentToProduct(comment);
        }
      }
    });
  }
}

function addCommentToProduct(comment) {
  const timestamp = () => {
    const commentDate = new Date(comment.createdAt);
    const nowDate = new Date();

    function getDifferenceInDays(date1, date2) {
      const diffInDays = Math.abs(date2 - date1);
      return diffInDays / (1000 * 60 * 60 * 24);
    }

    function getDifferenceInHours(date1, date2) {
      const diffInHrs = Math.abs(date2 - date1);
      return diffInHrs / (1000 * 60 * 60);
    }

    function getDifferenceInMinutes(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60);
    }

    function getDifferenceInSeconds(date1, date2) {
      const diffInSecs = Math.abs(date2 - date1);
      return diffInSecs / 1000;
    }

    const days = Math.floor(getDifferenceInDays(commentDate, nowDate));
    const hours = Math.floor(getDifferenceInHours(commentDate, nowDate));
    const minutes = Math.floor(getDifferenceInMinutes(commentDate, nowDate));
    const seconds = Math.floor(getDifferenceInSeconds(commentDate, nowDate));

    if (days > 0) return days + 'd';
    else if (hours > 0) return hours + ' hr';
    else if (minutes > 0) return minutes + ' min';
    else return seconds + 's';
  };

  const commentHtml = `<div class="col-12">
                                            <!-- Card feed item START -->
                                            <div class="card h-100 user-card">
                                                <!-- Card body START -->
                                                <div class="card-body">
                                                    <!-- Post User -->
                                                    <div class="d-flex align-items-center mb-2">
                                                        <!-- Avatar -->
                                                        <div class="avatar avatar-story me-2">
                                                            <a href="#!">
                                                                <img class="avatar-img rounded-circle"
                                                                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                                                                    alt="" width="40px" />
                                                            </a>
                                                        </div>
                                                        <!-- Info -->
                                                        <div>
                                                            <div class="nav nav-divider">
                                                                <h6 class="nav-item card-title mb-0">
                                                                    <p class=''>
                                                                        @${comment.name}
                                                                        <span
                                                                            class="nav-item small text-black-50 fw-normal">
                                                                            • ${timestamp()} ago</span>
                                                                    </p>
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Info -->
                                                    <p class="card card-body border-0 p-0 post-content">${
                                                      comment.text
                                                    }</p>
                                                </div>
                                                <!-- Card body END -->
                                            </div>
                                            <!-- Card feed item END -->
                                        </div>`;
  reviewContainer.insertAdjacentHTML('beforeend', commentHtml);
}

function redirectToCheckout() {
  // Set the window location to the checkout page URL
  window.location.href = "/Pages/checkout.html";
}
// Array to store selected products
let selectedProducts = [];


// Function to get the selected products
function getSelectedProducts() {
  return selectedProducts;
}

//const selectedProducts = getSelectedProducts();

function submitReviewHandler() {
  const reviewForm = document.getElementById('reviewForm');
  const reviewText = document.getElementById('textarea');
  const reviewButton = document.getElementById('reviewButton');

  if (loginInfo && Object.keys(loginInfo).length === 0) {
    reviewText.disabled = true;
    reviewText.textContent = 'Log in to leave a review.';
    reviewButton.disabled = true;
  }

  reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const text = reviewText.value;
    const name = loginInfo.username;
    const productId = reviewButton.getAttribute('data-bs-id');

    const res = await fetch(apiUri + '/comment', {
      method: 'POST',
      body: JSON.stringify({ text, name, productId }),
    });
    const { comment } = await res.json();

    reviewText.value = '';

    const hasReview = document.getElementById('hasReview');
    if (hasReview?.textContent == 'No reviews.')
      document.getElementById('reviewContainer').innerHTML = '';
    addCommentToProduct(comment);
  });
}
