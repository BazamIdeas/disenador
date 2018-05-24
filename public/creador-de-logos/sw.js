//var workbox = new Worker('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {

    //workbox.setConfig({ debug: false });
    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent);
    
    workbox.core.setCacheNameDetails({
        prefix: 'creador-de-logos',
        suffix: 'v1',
        precache: 'precargado'
    });


    workbox.precaching.precacheAndRoute([
        '/index.html',
        '/assets/css/main.css',
        '/assets/logo.pro.svg',
        '/assets/css/materialize.min.css',
        '/assets/css/responsive.css',
        '/app/controllers/inicio.controller.js',
        '/assets/images/gifs/c.gif',
        'app/app.js',
        'app/services.js'
    ]);

    workbox.routing.registerRoute(
        new RegExp('.*\.js'),
        workbox.strategies.networkFirst()
    );

    workbox.routing.registerRoute(
        /.*\.css/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'estilos-cache',
        })
    );

    workbox.routing.registerRoute(
        // Cache image files
        /.*\.(?:png|jpg|jpeg|svg|gif)/,
        // Use the cache if it's available
        workbox.strategies.cacheFirst({
            // Use a custom cache name
            cacheName: 'imagenes-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images
                    maxEntries: 30,
                    // Cache for a maximum of a week
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );

    workbox.routing.registerRoute(
        'https://use.fontawesome.com/releases/v5.0.0/js/all.js',
        workbox.strategies.staleWhileRevalidate(),
    );

    workbox.routing.registerRoute(
        new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
        workbox.strategies.cacheFirst({
            cacheName: 'googleapis',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 30,
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com.*$/,
        workbox.strategies.staleWhileRevalidate(),
    );

    workbox.googleAnalytics.initialize();

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}