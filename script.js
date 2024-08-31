//your JS code here. If required.
// script.js

// Helper function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    if (days) {
        // Set the expiration date
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toUTCString();
    } else {
        var expires = "";
    }
    // Set the cookie with name, value, expiration, and path
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

// Helper function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';'); // Split cookies into an array
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        // Trim leading spaces
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        // If the cookie name matches, return its value
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null; // Return null if not found
}

// Function to apply saved preferences from cookies
function applyPreferences() {
    const savedFontSize = getCookie('fontsize');
    const savedFontColor = getCookie('fontcolor');

    if (savedFontSize) {
        // Update the CSS variable for font size
        document.documentElement.style.setProperty('--fontsize', `${savedFontSize}px`);
        // Update the form input value to reflect the saved preference
        document.getElementById('fontsize').value = savedFontSize;
    }

    if (savedFontColor) {
        // Update the CSS variable for font color
        document.documentElement.style.setProperty('--fontcolor', savedFontColor);
        // Update the form input value to reflect the saved preference
        document.getElementById('fontcolor').value = savedFontColor;
    }
}

// Function to handle form submission and save preferences
function savePreferences(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const fontsizeInput = document.getElementById('fontsize');
    const fontcolorInput = document.getElementById('fontcolor');

    let fontsize = fontsizeInput.value;
    let fontcolor = fontcolorInput.value;

    // Validate font size: ensure it's a number between 8 and 72
    fontsize = parseInt(fontsize, 10);
    if (isNaN(fontsize) || fontsize < 8 || fontsize > 72) {
        alert('Please enter a font size between 8 and 72.');
        return;
    }

    // Save the preferences as cookies for 30 days
    setCookie('fontsize', fontsize, 30);
    setCookie('fontcolor', fontcolor, 30);

    // Apply the preferences immediately without reloading the page
    document.documentElement.style.setProperty('--fontsize', `${fontsize}px`);
    document.documentElement.style.setProperty('--fontcolor', fontcolor);
}

// Initialize the script once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply any saved preferences when the page loads
    applyPreferences();

    // Add an event listener to the form to handle submissions
    const form = document.querySelector('form');
    form.addEventListener('submit', savePreferences);
});
