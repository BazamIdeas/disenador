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

        bz.info = this.datosEstadoAnterior;

        bz.medidas = [{
            ancho: 600
        }, {
            ancho: 1200
        }, {
            ancho: 1800
        }];

        this.elementos = [];

        /* EFECTO HOVER */

        this.efectoHover = function (indice, valor) {
            if (!this.elementos[indice]) {
                this.elementos[indice] = valor;
                this.medidas[indice].mostrar = true;
            } else {
                delete this.elementos[indice];
                this.medidas[indice].mostrar = false;
            }
        }

        bz.descargar = function(idLogo, ancho){

            logosService.descargarLogo(idLogo, ancho).then(function (res) {
                /* NOMBRE */
                bz.nombre = res.data.png;
                bz.nombre = bz.nombre.replace('public/tmp/','');

                /* DESCARGAR */

                if (bz.nombre) {
                    var logo = angular.element(".logo"+ancho+" svg");

                        logo.attr('preserveAspectRatio',"xMidYMid meet");

                    svgAsPngUri(logo[0],{left:-50,top:-20, width: 600, height: 600}, function(uri) {
                        triggerDownload(uri);
                    }); 
                    
                }

                function triggerDownload (imgURI) {
                    var evt = new MouseEvent('click', {
                      view: window,
                      bubbles: false,
                      cancelable: true
                    });
                  
                    var a = document.createElement('a');
                    a.setAttribute('download', bz.nombre);
                    a.setAttribute('href', imgURI);
                    a.setAttribute('target', '_blank');
                  
                    a.dispatchEvent(evt);
                  }

            }).catch(function (res) {
                console.log(res);
            })
        }



    }])