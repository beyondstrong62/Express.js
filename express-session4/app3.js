// app.js

// --- 1. Core Imports ---
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for __dirname in ES Modules - Essential for 'path.join' to work correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const PORT = 3000;

// --- 2. EJS Configuration ---
app.set('view engine', 'ejs');
// Set the directory where EJS templates are located
// By default, Express looks for 'views', but it's good practice to explicitly set it.
app.set('views', path.join(__dirname, 'views'));


// --- 3. Middleware ---

// Serve Static Files (CSS, JS, Images, etc.) - IMPORTANT: Place this BEFORE your routes.
// This allows your browser to request files like /css/styles.css and get them from the 'public' folder.
app.use(express.static(path.join(__dirname, 'public')));

// Body Parsers - Essential for handling form data (URL-encoded) and JSON payloads (API requests).
// Not strictly used in these EJS view demos, but critical for real-world apps.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- 4. Routes ---

// Root Route - Provides navigation links to other demo pages.
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the EJS Demo!</h1>
        <p>Explore different features of EJS templating:</p>
        <ul>
            <li><a href="/profile">View User Profile (Displaying Data)</a></li>
            <li><a href="/dashboard">View Dashboard (No Notifications - Conditionals)</a></li>
            <li><a href="/dashboard/5">View Dashboard (5 Notifications - Conditionals)</a></li>
            <li><a href="/dashboard/message">View Dashboard (Invalid Input - Conditionals 'else')</a></li>
            <li><a href="/products">View Product Listings (Iteration)</a></li>
            <li><a href="/products/empty">View Empty Product Listings (Iteration 'else' block)</a></li>
        </ul>
    `);
});

// Route for User Profile - Demonstrates basic data display in EJS.
app.get('/profile', (req, res) => {
    const userData = {
        name: "Alex Chen",
        avatarUrl: "https://via.placeholder.com/150/007bff/ffffff?text=Alex", // Using a placeholder image URL
        email: "alex.chen@example.com",
        isAdmin: true // Toggle to 'false' and restart server to see conditional rendering change.
    };
    // Renders views/profile.ejs and passes the 'userData' object.
    res.render('profile', { user: userData });
});

// Route for Dashboard - Demonstrates conditionals (if/else if/else) in EJS.
// The ':count?' makes the 'count' parameter optional.
app.get('/dashboard/:count?', (req, res) => {
    // Attempt to parse 'count' from URL. If not a number, it defaults to 0.
    const notifications = parseInt(req.params.count) || 0; 
    // Renders views/dashboard.ejs and passes the 'notifications' count.
    res.render('dashboard', { notifications: notifications });
});

// Route for Product Listings - Demonstrates iteration (forEach loop) in EJS.
app.get('/products', (req, res) => {
    const productList = [
        { name: "Laptop Pro X1", price: 1200.00 },
        { name: "Wireless Ergonomic Mouse", price: 25.50 },
        { name: "Mechanical Gaming Keyboard", price: 75.99 },
        { name: "External SSD 1TB NVMe", price: 99.00 },
        { name: "USB-C Hub", price: 30.00 }
    ];
    // Renders views/products.ejs and passes the 'productList' array.
    res.render('products', { products: productList });
});

// Route to demonstrate how an empty product list is handled by EJS conditionals.
app.get('/products/empty', (req, res) => {
    res.render('products', { products: [] }); // Pass an empty array.
});


// --- 5. Error Handling Middleware (Good practice for production apps) ---

// Catch 404 Not Found errors - This runs if no other route/middleware has handled the request.
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error); // Pass the error to the next error-handling middleware.
});

// Global Error Handler - Catches any errors passed from 'next(error)'.
app.use((err, req, res, next) => {
    const statusCode = err.status || 500; // Use status if available, otherwise 500.
    console.error(`\n🔥 Server Error (${statusCode}):`, err.message);
    // Only log stack trace in development for security/cleanliness.
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    // Render an error page (you could create views/error.ejs) or send JSON.
    res.status(statusCode).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error</title>
            <link rel="stylesheet" href="/css/styles.css">
            <style>
                .error-container {
                    text-align: center;
                    padding: 50px;
                }
                .error-code {
                    font-size: 5em;
                    color: #dc3545; /* Red */
                    margin-bottom: 10px;
                }
                .error-message {
                    font-size: 1.5em;
                    color: #6c757d;
                }
                .error-details {
                    color: #495057;
                    margin-top: 20px;
                    font-size: 0.9em;
                }
            </style>
        </head>
        <body>
            <div class="error-container">
                <h1 class="error-code">${statusCode}</h1>
                <p class="error-message">${err.message || 'Something went wrong!'}</p>
                <p class="error-details">Please check the URL or try again later. <br><a href="/">Go to Home</a></p>
                ${process.env.NODE_ENV === 'development' && err.stack ? `<pre class="error-details">${err.stack}</pre>` : ''}
            </div>
        </body>
        </html>
    `);
});


// --- 6. Start the Server ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // console.log(`Project root: ${__dirname}`); // Uncomment for debugging project path
});