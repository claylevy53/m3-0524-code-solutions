// Fetch API CALL (client) scripts.js -> server (server.js) -> data back to (client) scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const productCatalog = document.getElementById('product-catalog');

  fetch('/api/products')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const productName = document.createElement('h2');
        productName.textContent = product.name;
        productDiv.appendChild(productName);

        const productDescription = document.createElement('p');
        productDescription.textContent = product.shortDescription;
        productDiv.appendChild(productDescription);

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${(product.price / 100).toFixed(2)}`;
        productDiv.appendChild(productPrice);

        const productImg = document.createElement('img');
        productImg.src = product.imageUrl;
        productDiv.appendChild(productImg);

        productDiv.addEventListener('click', () => openModal(product));

        productCatalog.appendChild(productDiv);
      });
    })
    .catch((error) => console.error('Error fetching products:', error));
});

function openModal(product) {
  const modal = document.getElementById('modal');
  const img = document.getElementById('modal-img');
  const title = document.getElementById('modal-title');
  const price = document.getElementById('modal-price');
  const description = document.getElementById('modal-description');

  img.src = product.imageUrl;
  img.className = 'modal-img';
  title.textContent = product.name;
  price.textContent = `$${(product.price / 100).toFixed(2)}`;
  description.textContent = product.longDescription;

  modal.style.display = 'block';
}

const cart = document.getElementById('add-to-cart');
cart.addEventListener('click', () => {
  alert('Added to Cart!');
});

const catalog = document.getElementById('back-to-catalog');
catalog.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
});
