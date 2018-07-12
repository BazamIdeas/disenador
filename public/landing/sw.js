if (location.host != 'localhost:8080' && location.protocol != 'http:') {
    var workbox = new Worker('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

    inciar()
} else {
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
    inciar()
}

function inciar() {

    workbox.setConfig({
        debug: true
    });
    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

    workbox.core.setCacheNameDetails({
        prefix: 'logopro'
    });

    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        workbox.strategies.cacheFirst(),
      ); 

    workbox.routing.registerRoute(
        /.*\.(?:png|jpg|jpeg|svg|gif|ttf)/,
        workbox.strategies.cacheFirst({
            cacheName: 'imagenes-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 30,
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
          cacheName: 'google-fonts',
          plugins: [
            new workbox.cacheableResponse.Plugin({
              statuses: [0, 200],
            }),
          ],
        }),
      ); 

    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com.*$/,
        workbox.strategies.staleWhileRevalidate(),
    );

    workbox.googleAnalytics.initialize();

}