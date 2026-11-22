
const CACHE_NAME = "smartscan-ai-v3";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];

// Install service worker
self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {

            for (const file of FILES_TO_CACHE) {
                try {
                    await cache.add(file);
                } catch (error) {
                    console.log("Could not cache:", file);
                }
            }

        })
    );

    self.skipWaiting();
});

// Activate service worker
self.addEventListener("activate", (event) => {

    event.waitUntil(
        (async () => {

            const cacheNames = await caches.keys();

            await Promise.all(
                cacheNames
                    .filter(name => name.startsWith("smartscan-ai-") && name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );

            await self.clients.claim();

        })()
    );
});

// Handle requests
self.addEventListener("fetch", (event) => {

    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {

                if (response.ok) {
                    const responseClone = response.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }

                return response;

            })
            .catch(async () => {

                const cachedResponse = await caches.match(event.request);

                if (cachedResponse) {
                    return cachedResponse;
                }

                return new Response(
                    "Resource unavailable offline.",
                    {
                        status: 503,
                        headers: {
                            "Content-Type": "text/plain"
                        }
                    }
                );

            })
    );
});

