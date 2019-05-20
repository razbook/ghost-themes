const cacheName = 'blogCache';
const offlineUrl = '/offline/';

/**
 * The event listener for the service worker installation
 */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll([
                offlineUrl
            ]))
    );
});

/**
 * Is the current request for an HTML page?
 * @param {Object} event 
 */
function isHtmlPage(event) {
    return event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html');
}

/**
 * Fetch and cache any results as we receive them.
 */
self.addEventListener('fetch', event => {

    if (event.request.url.indexOf('/ghost/') !== -1) {
        return false;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Only return cache if it's not an HTML page
                if (response && !isHtmlPage(event)) {
                    return response;
                }

                return fetch(event.request).then(
                    function (response) {
                        // Dont cache if not a 200 response
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        let responseToCache = response.clone();
                        caches.open(cacheName)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                ).catch(error => {
                    // Check if the user is offline first and is trying to navigate to a web page
                    if (isHtmlPage(event)) {
                        return caches.match(offlineUrl);
                    }
                });
            })
    );
});
