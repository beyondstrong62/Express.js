// public/js/app.js
console.log('Client-side JavaScript loaded!');

// Example: Simple DOM interaction
document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.querySelector('.dashboard h2');
    if (welcomeMessage) {
        console.log(`Welcome message found on dashboard: "${welcomeMessage.textContent}"`);
    }

    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // event.preventDefault(); // Uncomment to prevent default navigation for testing
            console.log(`Navigating to: ${event.target.href}`);
        });
    });
});