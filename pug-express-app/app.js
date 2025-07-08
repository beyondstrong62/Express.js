// app.js
const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const port = 3000;

// Security Best Practices: Use Helmet to set various HTTP headers
// This helps protect your app from common web vulnerabilities.
app.use(helmet());

// Optional: Configure Content Security Policy (CSP) with Helmet
// This is powerful for preventing XSS attacks but requires careful configuration.
// Uncomment and customize directives based on your actual script, style, and image sources.
/*
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"], // Add trusted script origins
    styleSrc: ["'self'", "'unsafe-inline'"], // 'unsafe-inline' if you have inline <style> tags
    imgSrc: ["'self'", "data:"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    connectSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
  }
}));
*/

// Performance Optimization: Enable gzip compression for all responses
// This reduces the size of response bodies, speeding up page load times.
app.use(compression());

// Pug Deep Dive: Configure Pug as the view engine
// Express will look for .pug files in the 'views' directory.
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Performance Optimization: Cache templates in production
// In a production environment, this prevents Express from recompiling
// Pug templates on every request, significantly improving performance.
if (app.get('env') === 'production') {
  app.enable('view cache');
  console.log('View cache enabled for production.');
}

// Static Files: Serve static assets from the 'public' directory
// '/css/styles.css' will map to 'public/css/styles.css'.
// Advanced options include caching headers for browser performance.
app.use(express.static('public', {
  maxAge: '1d', // Cache static files in browser for 1 day
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
  }
}));

// --- Routes ---

// Home Page: Demonstrates Pug layout system (extends layout.pug)
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page - My App', // Data passed to the Pug template
        user: { name: 'Guest', isAdmin: false }
    });
});

// Dashboard Page: Shows conditionals, iteration, and safe output in Pug
app.get('/dashboard', (req, res) => {
    const dashboardData = {
        user: {
            name: 'Jane Smith'
        },
        notifications: [
            { type: 'info', message: 'Your subscription is due next week.' },
            { type: 'warning', message: 'High CPU usage detected.' },
            { type: 'success', message: 'New feature released!' },
            // Example of a potentially malicious string for XSS demonstration (if using !=)
            // If Pug's default '=' (escaped) is used, this will render safely as text.
            // { type: 'danger', message: '<script>alert("XSS attempt!");</script>'}
        ],
        metrics: {
            users: 15432,
            revenue: 123456.789
        }
    };
    res.render('dashboard', dashboardData);
});

// About Page: Another example using the shared layout
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us - My App'
    });
});

// --- Error Handling ---

// 404 Not Found Handler: Catches requests to non-existent routes
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// General Error Handler: Catches all other server-side errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).render('error', { title: 'Something Went Wrong', message: err.message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Environment: ${app.get('env')}`); // Logs 'development' by default, or 'production' if set
});