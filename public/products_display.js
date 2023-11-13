
const productsContainer = document.getElementById('products-container');
        let row = createRow();
        productsContainer.appendChild(row);

        products.forEach((product, index) => {
            const card = createCard(product);
            row.appendChild(card);

            if ((index + 1) % 3 === 0 && index + 1 < products.length) {
                row = createRow();
                productsContainer.appendChild(row);
            }
        });

function createRow() {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row mb-4';
    return rowDiv;
}

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

    const qtySold = document.createElement('p');
    qtySold.className = 'card-text';
    qtySold.textContent = `Quantity Sold: ${product.qty_sold}`; // Updated to use qty_sold from product
    cardBody.appendChild(qtySold);

    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = product.description;
    cardBody.appendChild(description);

    const purchaseDiv = document.createElement('div');
    purchaseDiv.className = 'purchase-section d-flex flex-column align-items-start justify-content-between mt-2';

    const quantityInput = document.createElement('input');
    quantityInput.type = 'text'; // Allow any type of input
    quantityInput.name = 'quantity_' + product.name.replace(/\s+/g, '_'); // Create a unique name attribute, replacing spaces with underscores
    quantityInput.className = 'form-control';
    quantityInput.placeholder = 'Qty:'; // Set placeholder text for the input

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message mt-2';

    quantityInput.addEventListener('input', () => validateQuantityInput(quantityInput, product.qty_available, messageDiv));

    purchaseDiv.appendChild(quantityInput);
    purchaseDiv.appendChild(messageDiv);

    cardBody.appendChild(purchaseDiv);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    return colDiv;
}

function validateQuantityInput(inputElement, maxQuantity, messageDiv) {
    const value = inputElement.value.trim(); // Trim to remove any white spaces
    let errorMessage = "";

    if (value === '') { // Check if the input is empty
        // If the input is empty, do not display any error message
        inputElement.style.borderColor = '';
        messageDiv.textContent = '';
        return; // Exit the function early
    }

    const numericValue = parseFloat(value); // Use parseFloat to detect decimals

    if (isNaN(numericValue) || numericValue < 0) {
        errorMessage = "Quantity must be a non-negative number!";
    } else if (numericValue === 0) {
        errorMessage = "Please enter a quantity greater than 0.";
    } else if (!Number.isInteger(numericValue)) { // Check for decimal values
        errorMessage = "Please enter a whole number, no decimals.";
    } else if (numericValue > maxQuantity) {
        errorMessage = `Quantity exceeds available stock! Only ${maxQuantity} left.`;
    }

    if (errorMessage) {
        inputElement.style.borderColor = 'red';
        messageDiv.textContent = errorMessage;
        messageDiv.style.color = 'red';
    } else {
        inputElement.style.borderColor = '';
        messageDiv.textContent = '';
    }
}


window.onload = function() {
    displayErrors();
    // ...other onload functions
};

function displayErrors() {
    const urlParams = new URLSearchParams(window.location.search);
    const errors = urlParams.get('errors');
    
    if (errors) {
        const errorList = JSON.parse(errors);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.role = 'alert';
        
        errorList.forEach(err => {
            const errP = document.createElement('p');
            errP.textContent = err;
            errorDiv.appendChild(errP);
        });

        const container = document.getElementById('products-container');
        container.prepend(errorDiv);
    }
}

