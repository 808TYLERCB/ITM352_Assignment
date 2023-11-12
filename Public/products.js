// products.js (assuming this file is linked in your HTML and served from the public directory)
function displayProducts(products) {
    let htmlContent = '<div class="row">'; // Start the first row
    products.forEach((product, index) => {
        // Add product card in a column
        htmlContent += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img class="card-img-top" src="${product.image}" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Price: $${product.price}</p>
                        <p class="card-text">Available: ${product.qty_available}</p>
                        <input type="text" name="${product.name}" class="form-control" placeholder="Enter quantity">
                    </div>
                </div>
            </div>
        `;

        // Every 3 products, close the current row and start a new one
        if ((index + 1) % 3 === 0) {
            htmlContent += '</div><div class="row">';
        }
    });

    htmlContent += '</div>'; // Close the last row
    document.getElementById('products-container').innerHTML = htmlContent;
}


