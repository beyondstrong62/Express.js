console.log('Script loaded successfully.');

// Example: Add a click event to a button with id "myButton"
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('myButton');
    if (btn) {
        btn.addEventListener('click', () => {
            alert('Button clicked!');
        });
    }
});