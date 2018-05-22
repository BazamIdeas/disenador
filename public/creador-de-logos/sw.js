var d = new Date();
var CACHE_NAME = 'disenador-cache-1-hour-' + d.getHours();
var urlsToCache = [
    '/index.html',
    '/assets/css/main.css',
    'app/app.js',
    'app/services.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache);
        }).catch(function (res) {
            console.log(res)
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function (cache) {
                            if(event.request.method == 'POST')
                            return 'Post Peticion';
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        }).catch(function (res) {
            console.log(res)
        })
    );
});

self.addEventListener('activate', function(event) {

    var cacheWhitelist = [CACHE_NAME];
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});