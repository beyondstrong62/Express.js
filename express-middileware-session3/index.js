// index.js

import express from 'express';
const app = express();
const PORT = 3000;

// --- Middleware Section ---

// 1. Custom Logger Middleware (already from Slide 4)
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    req.timestamp = Date.now();
    next();
};

// Apply the loggerMiddleware globally
app.use(loggerMiddleware);

// 2. Body Parsers (from Slide 6)
// Parse JSON payloads (for API requests with JSON body)
app.use(express.json());
// Parse URL-encoded payloads (for form submissions)
app.use(express.urlencoded({ extended: true }));

// 3. Static Assets (from Slide 6)
// Create a 'public' directory and put some files in it

// --- Routes ---

app.get('/', (req, res) => {
    res.send(`Hello from Express! Request timestamp: ${req.timestamp}`);
});

app.get('/about', (req, res) => {
    res.send(`About page. Request timestamp: ${req.timestamp}`);
});

// New route to test body parsing
app.post('/submit-data', (req, res) => {
    // req.body will now contain the parsed data thanks to express.json() or express.urlencoded()
    console.log('Received data:', req.body);
    res.json({ message: 'Data received!', yourData: req.body });
});

app.use(express.static('public'));
// You can also create 'files' directory and serve it with a virtual path
app.use('/static', express.static('files'));


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});