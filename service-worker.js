const CACHE_NAME="my-cache-v9",urlsToCache=["/schoolsgood","/schoolsgood/index.html"];self.addEventListener("install",(e=>{e.waitUntil(caches.open(CACHE_NAME).then((e=>e.addAll(urlsToCache))))})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((t=>t||fetch(e.request).then((t=>{let s=t.clone();return(e.request.url.startsWith("http://")||e.request.url.startsWith("https://"))&&e.waitUntil(caches.open(CACHE_NAME).then((t=>{t.put(e.request,s)}))),t})))))})),self.addEventListener("activate",(e=>{const t=[CACHE_NAME];e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(!t.includes(e))return caches.delete(e)}))))))}));
