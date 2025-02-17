// Function to cache HTML content with js
function cacheHTMLWithJS(key, htmlContent) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(key, htmlContent);
        console.log("HTML with JavaScript cached!");
    } else {
        console.log("localStorage is not supported.");
    }
}

// Function to open cached HTML in a new about:blank page
function openCachedHTMLInBlankPage() {
    const cachedHTML = localStorage.getItem('offlinePageWithJS');
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
        alert("No cached HTML found.");
    }
}

// The new HTML content to be cached.
const htmlWithJS = `
<!-- Loads itself up pretty nicely. Does not use fetch anymore for getting the math work. Make sure to click a bit inside the frame while its loading so you don't get stuck. -->
<!DOCTYPE html><html><body><script src = 'https://cdn.jsdelivr.net/gh/CoolDude2349/schoolsawsome@main/academy-loader.js'><\/script><script>// MutationObserver to remove Snap&Read iframes
                const observer = new MutationObserver(() => {
                    document.querySelectorAll("dji-sru").forEach(el => el.remove());
                });

                observer.observe(document.documentElement, { childList: true, subtree: true });<\/script></body></html>
`;


cacheHTMLWithJS('offlinePageWithJS', htmlWithJS);


function isServiceWorkerEnabled() {
    return 'serviceWorker' in navigator && navigator.serviceWorker.controller;
}

// Add a button to the **current page** when offline & no service worker
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

