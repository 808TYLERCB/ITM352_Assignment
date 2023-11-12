// Importing the Express.js framework
const express = require('express');

// Create an instance of the Express application called "app"
const app = express();

// Middleware to log all requests
app.use((request, response, next) => {
    console.log(`${request.method} to ${request.path}`);
    next();
});

// Import data from a JSON file containing information about products
// Note: Changed the path to correctly point to "products.json"
const products = require(__dirname + "/products.json");

// Define a route for handling a GET request to "/products.js"
// Note: Corrected the path to start with a "/"
app.get('/products.js', (request, response) => {
    // Set the response content type to JavaScript
    response.type('js');

    // Convert the products object to a JSON string and embed it within a JavaScript variable
    const productsStr = `let products = ${JSON.stringify(products)};`;

    // Send the JavaScript string in response to the GET request
    response.send(productsStr);
});

// Serve static files from a directory named "public"
app.use(express.static(__dirname + '/public'));

// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => console.log('Listening on port 8080'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
