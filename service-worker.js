const CACHE_NAME = "store-cache-v1"; // Change the cache name for versioning.
const urlsToCache = [
  "chedder78.github.io/store", // Update with your site's base path.
  "/index.html", // Ensure all these paths match your site's structure.
  "/index.css",
  "/index.js",
  "/cart.html",
  "/cart.css",
  "/cart.js",
  "/checkout.html",
  "/checkout.css",
  "/checkout.js",
  "/C:\Users\calid\OneDrive\Microsoft Edge Drop Files\store\calidef_logo_icon.png", // Replace with your actual icon paths.
  "/calidef_logo.png"  // Replace with your actual icon paths.
];

// Install the service worker and cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache); // Ensure all files listed in `urlsToCache` exist in your project.
    })
  );
});

// Serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request); // No change needed; serves cached content or fetches from the network.
    })
  );
});

// Update the service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Ensure this matches the cache name declared above.
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Removes old caches not in the whitelist.
          }
        })
      );
    })
  );
});
