// public/js/profile.js

// This script will run on the profile page.
console.log('Profile-specific JavaScript loaded!');

// Example: Add a click event to the admin button if it exists
document.addEventListener('DOMContentLoaded', () => {
    const adminButton = document.querySelector('.admin-panel-btn');
    if (adminButton) {
        adminButton.addEventListener('click', () => {
            alert('Admin Panel access requested! (This is just a demo)');
        });
    }
});