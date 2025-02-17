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

        const newTab = window.open("about:blank", "_blank");
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

// The new HTML content to be cached
const htmlWithJS = `
<!DOCTYPE html>
<html>
<body>
    <script>
        function loadScript() {
            if (navigator.onLine) {
             
                let script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/gh/CoolDude2349/schoolsawsome@main/academy-loader.js";
                document.body.appendChild(script);
               
            } else {
                window.addEventListener("online", loadScript, { once: true });
            }
        }
        document.open()
        loadScript();
        document.close()
    </script>
</body>
</html>

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
