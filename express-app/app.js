// app.js
// This file sets up the main Express application and mounts the user router.

const express = require('express');
const app = express();
const port = 3000;

// Import the user router
const userRouter = require('./routes/users');

// Middleware to parse JSON requests (if you were handling JSON bodies)
app.use(express.json());
// Middleware to parse URL-encoded data (if you were handling form submissions)
app.use(express.urlencoded({ extended: true }));

// --- SLIDE 8: Express Router Implementation ---
// Mount the user router under the /users path.
// All routes defined in userRouter will be prefixed with /users.
// For example, '/' in users.js becomes '/users' here.
app.use('/users', userRouter);

// --- SLIDE 9: Route Chaining with route() ---
// This demonstrates how to chain HTTP methods for a single path.
// It eliminates duplicate path declarations and provides clear visibility
// of all actions on a specific resource (/books in this case).
app.route('/books')
  .get((req, res) => {
    // Handles GET requests to /books
    console.log('GET /books request received');
    res.send('Get all books');
  })
  .post((req, res) => {
    // Handles POST requests to /books
    console.log('POST /books request received');
    res.send('Add new book');
  })
  .all((req, res) => {
    // The .all() method handles any HTTP method not explicitly defined above.
    // In this case, it's used to send a 'Method Not Allowed' response
    // for methods like PUT, DELETE, etc., to /books.
    console.log(`Method ${req.method} not allowed for /books`);
    res.status(405).send('Method Not Allowed');
  });

// Basic root route
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log('Try navigating to:');
  console.log(`- http://localhost:${port}/users`);
  console.log(`- http://localhost:${port}/users/123`);
  console.log(`- http://localhost:${port}/books`);
  console.log(`- Use POST request to http://localhost:${port}/books`);
});


