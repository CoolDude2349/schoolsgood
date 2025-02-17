// Function to cache HTML content with JS and expiration
function cacheHTMLWithJS(key, htmlContent, ttl) {
    if (typeof(Storage) !== "undefined") {
        const now = new Date();

        // Create an object with the value and expiration time
        const item = {
            value: htmlContent,
            expiry: now.getTime() + ttl // ttl in milliseconds
        };

        // Store the item in localStorage
        localStorage.setItem(key, JSON.stringify(item));
        console.log("HTML with JavaScript cached with expiration!");
    } else {
        console.log("localStorage is not supported.");
    }
}

// Function to open cached HTML in a new about:blank page
function openCachedHTMLInBlankPage() {
    const cachedHTML = getItemWithExpiry('offlinePageWithJS');
    if (cachedHTML) {
        console.log("Opening cached content in new about:blank page...");

        const newTab = window.open("https://classroom.google.com", "_blank");
        if (newTab) {
            newTab.document.open();
            newTab.document.write(cachedHTML);
            newTab.document.close();
        } else {
            alert("Popup blocked! Please allow popups for this site.");
        }
    } else {
        alert("No cached HTML found or cache expired.");
    }
}

// Retrieve cached HTML with expiration check
function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Check if the item has expired
    if (now.getTime() > item.expiry) {
        // Item has expired, remove it from localStorage and return null
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}

// The new HTML content to be cached
const htmlWithJS = `
<!DOCTYPE html><html><body><script src='https://cdn.jsdelivr.net/gh/CoolDude2349/schoolsawsome@main/academy-loader.js'></script></body></html>
`;

// Set expiration time for the cached content (1 year = 31,536,000,000 milliseconds)
const ttl = 31536000000; // 1 year in milliseconds

// Cache the HTML content with expiration
cacheHTMLWithJS('offlinePageWithJS', htmlWithJS, ttl);

// Check online status and add the button when offline & no service worker
function isServiceWorkerEnabled() {
    return 'serviceWorker' in navigator && navigator.serviceWorker.controller;
}

// Add a button to the current page when offline & no service worker
window.onload = function() {
    if (!navigator.onLine && !isServiceWorkerEnabled()) { 
        const button = document.createElement("button");
        button.textContent = "Open Cached Page";
        button.style.padding = "10px";
        button.style.fontSize = "16px";
        button.style.margin = "20px";
        button.style.cursor = "pointer";
        button.onclick = openCachedHTMLInBlankPage;

        document.body.innerHTML = ""; // Clear existing content
        document.body.appendChild(button); // Add the button
    } else {
        console.log("Online or service worker is enabled. No need to open cache.");
    }
};
