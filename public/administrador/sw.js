if (location.host != 'localhost:8080' && location.protocol != 'http:') {
    var workbox = new Worker('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

    inciar()
} else {
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
    inciar()
}

function inciar() {

    workbox.setConfig({
        debug: false
    });
    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent);

    workbox.core.setCacheNameDetails({
        prefix: 'logopro'
    });

    workbox.precaching.precacheAndRoute([
        '/assets/style.css',
        "/angular/angular.min.js",
        "/angular-messages/angular-messages.min.js",
        "/angular-animate/angular-animate.min.js",
        "/angular-aria/angular-aria.min.js",
        "/angular-ui-router/angular-ui-router.min.js",
        "/angular-material/angular-material.min.js",
        "/angular-color-picker/angular-color-picker.js",
        "/angular-colorpicker-directive/js/color-picker.js",
        "/ng-file-upload/ng-file-upload-shim.min.js",
        "/ng-file-upload/ng-file-upload.min.js",
        "/angular-base64/angular-base64.min.js",
        "/angular-social/angular-socialshare.js",
        "/assets/jquery-ui/jquery-ui.css",
        "/assets/jquery-ui/jquery-ui.min.js",
        "app/app.js"
    ]);

    workbox.routing.registerRoute(
        /.*\.css/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'estilos-cache',
        })
    );

    workbox.routing.registerRoute(
        new RegExp('app/views/(.*)'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'views-cache',
        }),
    );

    workbox.routing.registerRoute(
        /.*\.(?:png|jpg|jpeg|svg|gif)/,
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

}