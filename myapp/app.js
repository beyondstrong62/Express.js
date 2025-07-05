// app.js
// This file sets up the main Express application and mounts the user router.

const express = require('express'); // <-- MISSING LINE 1: Require Express
const app = express();              // <-- MISSING LINE 2: Create Express app instance
const port = 3000;                  // Define a port for your server

// Import the user router (assuming it's in './routes/users.js')
const userRouter = require('./routes/users');

// Middleware to parse JSON requests (useful if you're sending JSON data)
app.use(express.json());
// Middleware to parse URL-encoded data (useful for form submissions)
app.use(express.urlencoded({ extended: true }));

// Mount the user router under the /users path.
// All routes defined in userRouter will be prefixed with /users.
app.use('/users', userRouter);

// Basic root route for demonstration
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

// Start the server // <-- MISSING LINE 3: Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log('Try navigating to:');
  console.log(`- http://localhost:${port}/users`);
  console.log(`- http://localhost:${port}/users/123`);
});