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
            ancho: 300
        }, {
            ancho: 1000
        }, {
            ancho: 1500
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
/*
                    if(ancho = 300){
                        logo.attr('preserveAspectRatio',"xMidYMid meet");
                        logo.attr('width', ancho);
                        logo.attr('height', ancho);

                        var width = logo.attr('width') * 1.5;
                        var height = logo.attr('height') * 1.5;
                        
                        var viewbox = '0 0 '+ width+' '+height;
                        logo.attr('viewbox', viewbox)
                    }
  */
                    saveSvgAsPng(logo[0], bz.nombre, {scale: 2}); 
                    
                }

            }).catch(function (res) {
                console.log(res);
            })
        }



    }])