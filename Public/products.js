// Fetch the product data from the server
fetch('/products.json')
    .then(response => response.json())
    .then(products => {
        // Get the element where you want to display the products
        const productsContainer = document.getElementById('products-container');

        // Create a row for the products
        let row = createRow();
        productsContainer.appendChild(row);

        // Loop through each product
        products.forEach((product, index) => {
            // Create a Bootstrap card for each product
            const card = createCard(product);

            // Add the card to the current row
            row.appendChild(card);

            // Every 3 products, create a new row
            if ((index + 1) % 3 === 0 && index + 1 < products.length) {
                row = createRow();
                productsContainer.appendChild(row);
            }
        });
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

// Function to create a new row
function createRow() {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row mb-4';
    return rowDiv;
}

// Function to create a Bootstrap card for a product
function createCard(product) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = product.image;
    img.alt = product.name;
    cardDiv.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = product.name;
    cardBody.appendChild(title);

    const price = document.createElement('p');
    price.className = 'card-text';
    price.textContent = `Price: $${product.price}`;
    cardBody.appendChild(price);

    const qty = document.createElement('p');
    qty.className = 'card-text';
    qty.textContent = `Quantity Available: ${product.qty_available}`;
    cardBody.appendChild(qty);

    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = product.description;
    cardBody.appendChild(description);

    // Purchase section with quantity input and purchase button
    const purchaseDiv = document.createElement('div');
    purchaseDiv.className = 'purchase-section d-flex align-items-center justify-content-between mt-2';

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.className = 'form-control';
    quantityInput.value = 0; // default value
    quantityInput.min = 1; // minimum value
    quantityInput.max = product.qty_available; // maximum value
    purchaseDiv.appendChild(quantityInput);


    cardBody.appendChild(purchaseDiv);

    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    return colDiv;
}
