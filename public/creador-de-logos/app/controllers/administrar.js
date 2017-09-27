angular.module("disenador-de-logos")

    /* Administras logo */

    .controller('administrarController', ['$scope', '$stateParams', '$state', 'LS', '$base64', 'logosService', '$window', function ($scope, $stateParams, $state, LS, $base64, logosService, $window) {

        var bz = this;

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }

        bz.codificar = function (icono) {

            return $base64.encode(icono);

        }

        /* LOCAL STORAGE */

        this.definirInfo = function (llave, datos) {
            return LS.definir(llave, datos);
        }

        if ($stateParams.datos) {
            this.definirInfo($state.current.name, $stateParams.datos);
            this.datosEstadoAnterior = $stateParams.datos;

        } else if (LS.obtener($state.current.name)) {

            this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
        } else {
            $state.go('dashboard');
        }

        bz.datos = this.datosEstadoAnterior;
        bz.ancho = 100;

        bz.descargar = function () {

            logosService.descargarLogo(bz.datos.idLogo, bz.ancho).then(function (res) {

                if (bz.datos.svg) {
                    bz.nombre = res.data.svg;
                    bz.v = res.data.svg.replace('public', '');
                } else {
                    bz.nombre = res.data.png;
                    bz.v = res.data.png.replace('public', '');
                }
                bz.nombre = bz.nombre.replace('public/tmp/', '');


                // bz.url = window.location.protocol + window.location.hostname + ':' + window.location.port + bz.v;
                triggerDownload(bz.v);

                /* DESCARGAR */

                function triggerDownload(imgURI) {
                    var evt = new MouseEvent('click', {
                        view: window,
                        bubbles: false,
                        cancelable: true
                    });

                    var a = document.createElement('a');
                    a.setAttribute('download', bz.nombre);
                    a.setAttribute('href', imgURI);
                    a.setAttribute('target', '_blank');

                    var contenedor = angular.element(".contenedor-link");
                    contenedor.empty();
                    contenedor.append(a);
                    a.dispatchEvent(evt);
                }

            }).catch(function (res) {
                console.log(res);
            })
        }



    }])