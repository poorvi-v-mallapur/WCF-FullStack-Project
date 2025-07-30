document.addEventListener('DOMContentLoaded', function() {
    console.log('Main application loaded');
    
    // Initialize the app
    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            document.getElementById('landing-page').style.display = 'none';
            document.getElementById('main-app').style.display = 'block';
            loadPage('logic-playground');
        });
    }

    // Set up navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(nav => {
                nav.classList.remove('active');
            });
            this.classList.add('active');
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });
});

let currentScript = null;

async function loadPage(page) {
    try {
        console.log(`Loading page: ${page}`);
        
        // Remove previous script if exists
        if (currentScript) {
            document.body.removeChild(currentScript);
            currentScript = null;
        }

        // Load HTML content
        const response = await fetch(`templates/${page}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load page: ${response.status}`);
        }
        
        const html = await response.text();
        document.querySelector('.page-container').innerHTML = html;
        
        // Load corresponding JS file
        currentScript = document.createElement('script');
        currentScript.src = `js/${page}.js`;
        
        // Add type="module" if needed (for modern JS features)
        // currentScript.type = 'module';
        
        // Important: Wait for script to load before continuing
        await new Promise((resolve, reject) => {
            currentScript.onload = resolve;
            currentScript.onerror = reject;
            document.body.appendChild(currentScript);
        });
        
        console.log(`Page ${page} loaded successfully`);
        
    } catch (error) {
        console.error('Error loading page:', error);
        document.querySelector('.page-container').innerHTML = `
            <div class="error-message">
                <h2>Error loading ${page}</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()">Reload Page</button>
            </div>
        `;
    }
}