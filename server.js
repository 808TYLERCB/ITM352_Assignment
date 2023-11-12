// Importing the Express.js framework
const express = require('express');

// Create an instance of the Express application called "app"
const app = express();

// Middleware to log all requests
app.use((request, response, next) => {
    console.log(`${request.method} to ${request.path}`);
    next();
});

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Import data from a JSON file containing information about products
const products = require(__dirname + "/products.json");

// Define a route for handling a GET request to "/products.js"
app.get('/products.js', (request, response) => {
    response.type('js');
    const productsStr = `let products = ${JSON.stringify(products)};`;
    response.send(productsStr);
});

app.post('/purchase', (req, res) => {
    const purchaseData = req.body; // Assuming this is an object with product IDs and quantities

    // Validate purchase data
    let isValidPurchase = true;
    let errorMessage = '';
    let totalQuantity = 0;

    for (let productId in purchaseData) {
        const quantity = parseInt(purchaseData[productId], 10);

        if (isNaN(quantity) || quantity < 0) {
            isValidPurchase = false;
            errorMessage = 'Invalid quantity entered.';
            break;
        }

        if (quantity > products[productId].qty_available) {
            isValidPurchase = false;
            errorMessage = 'Quantity exceeds available stock.';
            break;
        }

        if (quantity === 0) {
            continue; // Skip if quantity is 0, but keep checking other items
        }

        totalQuantity += quantity;
    }

    if (totalQuantity === 0) {
        isValidPurchase = false;
        errorMessage = 'No quantities selected.';
    }

    if (!isValidPurchase) {
        // Redirect back to products page with an error message
        return res.redirect('/products_display.html?error=' + encodeURIComponent(errorMessage));
    }

    // Update inventory and calculate total
    let total = 0;
    for (let productId in purchaseData) {
        const quantity = purchaseData[productId];
        products[productId].qty_available -= quantity;
        total += products[productId].price * quantity;
    }

    // Calculate tax at 4%
    const tax = total * 0.04;

    // Calculate shipping based on total quantity
    const shipping = calculateShipping(totalQuantity);

    const grandTotal = total + tax + shipping;

    // Generate invoice
    res.send(`Invoice: Total - $${total.toFixed(2)}, Tax - $${tax.toFixed(2)}, Shipping - $${shipping.toFixed(2)}, Grand Total - $${grandTotal.toFixed(2)}`);
});

// Function to calculate shipping based on total quantity
function calculateShipping(totalQuantity) {
    let shippingCost = 0;
    if (totalQuantity <= 5) {
        shippingCost = 5; // Flat rate for small quantities
    } else if (totalQuantity <= 10) {
        shippingCost = 10; // Higher rate for medium quantities
    } else {
        shippingCost = 15; // Maximum rate for large quantities
    }
    return shippingCost;
}


// Serve static files from a directory named "public"
app.use(express.static(__dirname + '/public'));

// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => console.log('Listening on port 8080'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
