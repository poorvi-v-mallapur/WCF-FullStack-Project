// Initialize Vanta.js 3D background
VANTA.NET({
    el: "#vanta-canvas",
    color: 0xe52e71,
    backgroundColor: 0x0f0f1a,
    points: 12,
    maxDistance: 22,
    spacing: 18
});

// Create floating elements
const floatingContainer = document.createElement('div');
floatingContainer.className = 'floating-elements';
document.getElementById('landing-page').appendChild(floatingContainer);

const codeIcons = ['{ }', ';', '()', '=>', '[]', 'class', 'import', 'new'];

for (let i = 0; i < 20; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.textContent = codeIcons[Math.floor(Math.random() * codeIcons.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.opacity = 0.2 + Math.random() * 0.5;
    element.style.transform = `scale(${0.5 + Math.random()})`;
    floatingContainer.appendChild(element);
}

// Add this function to handle the button click
function handleGetStarted() {
    console.log("Get Started clicked"); // Debug line
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    loadPage('logic-playground'); // Load the default page
}

// Set up the event listener properly
document.addEventListener('DOMContentLoaded', function() {
    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', handleGetStarted);
        console.log("Event listener added to Get Started button"); // Debug line
    } else {
        console.error("Get Started button not found!"); // Debug line
    }
});

// Make the function available globally
window.handleGetStarted = handleGetStarted;