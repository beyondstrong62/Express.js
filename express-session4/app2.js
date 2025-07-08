// app.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// --- Route to Render EJS Template (from Slide 5) ---
app.get('/profile', (req, res) => {
    // Data to be passed to the EJS template
    const userData = {
        name: "Rana Sujeet",
        avatarUrl: "https://via.placeholder.com/150", // Placeholder image
        email: "alex.chen@example.com",
        isAdmin: true // Change to 'false' to see the difference
    };

    // Render the 'profile.ejs' template and pass the userData object
    res.render('profile', { user: userData });
});

// Basic route (for initial test, can keep or remove)
app.get('/', (req, res) => {
    res.send('Go to <a href="/profile">/profile</a> to see the EJS template in action!');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});