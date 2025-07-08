// app.js

// 1. Import Express
import express from 'express';
// 2. Import 'path' module for directory handling (built-in Node.js module)
import path from 'path';
// 3. Import 'fileURLToPath' and 'dirname' for ES Module compatibility
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for __dirname in ES Modules (needed for app.set('views'))
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Create an Express application instance
const app = express();
const PORT = 3000;

// --- EJS Configuration (from Slide 4) ---

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Custom views directory (optional, but good to know)
// By default, Express looks for templates in a folder named 'views' in the root.
// If your templates are in 'templates' folder, you would do:
// app.set('views', path.join(__dirname, 'templates'));
// For this tutorial, we'll stick to the default 'views' folder, so this line isn't strictly needed
// if your views are directly in the 'views' folder, but it's good practice for clarity or if you rename it.
app.set('views', path.join(__dirname, 'views')); // Set views directory to './views'


// --- Basic Route (for testing EJS setup) ---
app.get('/', (req, res) => {
    // We'll render a simple EJS file here soon
    res.send('EJS is configured! Now create a template.');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`__dirname: ${__dirname}`); // For debugging paths
});