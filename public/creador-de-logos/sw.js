//var workbox = new Worker('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {

    workbox.setConfig({ debug: true });
    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

    workbox.core.setCacheNameDetails({
        prefix: 'creador-de-logos'
    });

    workbox.precaching.precacheAndRoute([
        '/index.html',
        '/assets/css/main.css',
        '/assets/logo.pro.svg',
        '/assets/css/materialize.min.css',
        '/assets/css/responsive.css',
        '/assets/images/gifs/c.gif',
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
        "app/app.js",
        "app/services.js",
        "app/controllers/header.js",
        "app/controllers/inicio.controller.js",
        "app/controllers/editor.controller.js",
        "app/controllers/pago.controller.js",
        "app/controllers/pagoCompleto.controller.js",
        "app/controllers/logos.controller.js",
        "app/controllers/login.controller.js",
        "app/controllers/descargar.controller.js",
        "app/controllers/cuenta.controller.js",
        "app/controllers/logosGaleria.controller.js",
        "app/controllers/papeleria.controller.js",
        "app/controllers/papeleriaEditor.controller.js",
        "app/directives/bazamAyuda.js",
        "app/directives/bazamCarouseles.js",
        "app/directives/bazamColorPicker.js",
        "app/directives/bazamFormLogin.js",
        "app/directives/bazamMail.js",
        "app/directives/bazamRedireccionar.js",
        "app/directives/bazamScroll.js",
        "app/directives/bazamSvg.js",
        "app/directives/bazamSvgText.js",
        "app/directives/bazamVisualizar.js",
        "app/directives/bazamPalettePicker.js",
        "app/directives/papeleria/bazamPapeleria.js",
        "app/directives/stripePaymentForm.js",
        "app/directives/planes.js",
        "app/directives/papeleria/bazamMenuPapeleria.js",
        "app/directives/papeleria/bazamCrearPapeleria.js",
        "app/directives/jquery-ui.js",
    ]);

    workbox.routing.registerRoute(
        /.*\.css/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'estilos-cache',
        })
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

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}