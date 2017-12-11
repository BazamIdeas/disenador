angular.module("disenador-de-logos")

    /* Editor */

    .controller('editorController', ['$scope', '$stateParams', '$state', '$base64', 'categoriasService', 'logosService', 'clientesService', "historicoResolve", "$rootScope","$mdToast", function ($scope, $stateParams, $state, $base64, categoriasService, logosService, clientesService, historicoResolve, $rootScope, $mdToast) {

        var bz = this;

        bz.base64 = $base64;

        bz.borradores = false;
        bz.preview = false;
        bz.busquedaIconos = false;
        bz.colorFondo = "rgb(250,250,250)";

        //////////////////////////////////////////////
        ///////////////LOCAL STORAGE//////////////////
        //////////////////////////////////////////////

        bz.logo = historicoResolve.logo;
        bz.logo.texto = historicoResolve.texto;
        bz.fuentes = historicoResolve.fuentes;
        bz.categoria = historicoResolve.logo.icono.categorias_idCategoria;

        /* CATEGORIAS EXISTENTES */

        bz.categoriasPosibles = [];

        categoriasService.listaCategorias('ICONO').then(function (res) {

            angular.forEach(res, function (valor, llave) {

                bz.categoriasPosibles.push(valor);

            })

        })

        /* LOGOS */

        bz.guardarLogo = function (logo, tipoLogo, idElemento) {

            var isDlgOpen;

            logosService.guardarLogo(logo, tipoLogo, idElemento).then(function (res) {
                
                $mdToast.show({
                    hideDelay   : 0,
                    position    : 'top right',
                    controller  :  ["$scope", "$mdToast", "$mdDialog", function($scope, $mdToast, $mdDialog) {
                  
                        $scope.closeToast = function() {
                            if (isDlgOpen) return;

                            $mdToast
                                .hide()
                                .then(function() {
                                    isDlgOpen = false;
                                });
                        }
                    }],
                    templateUrl : 'toast-success.html'
                });

            })

        }


        bz.mostrarBorradores = function () {

            if (bz.borradores) {

                bz.borradores = false;

            } else {

                bz.preview = false;
                bz.busquedaIconos = false;
                bz.borradores = true;

            }


        }


        bz.buscarPlanes = function () {

            $rootScope.$broadcast("editor:planes", true)

        }


        $scope.$on("directiva:planes", function (evento, datos) {

            
            $state.go("planes", {
                status: true,
                datos: {
                    logo: datos,
                    idElemento: bz.logo.icono.idElemento,
                    tipo: 'Logo y nombre'

                }
            })


        })


        /////////////////////////////////////
        //////////CAMBIO DE COLOR////////////
        /////////////////////////////////////

        bz.cambioColor = function (color, objetivo) {

            $rootScope.$broadcast("editor:color", {
                color: color,
                objetivo: objetivo
            });

        }


        /////////////////////////////////////
        //////////CAMBIO DE TEXTO////////////
        /////////////////////////////////////        

        bz.cambioTexto = function (texto) {

            $rootScope.$broadcast("editor:texto", texto);

        }


        /////////////////////////////////////
        /////////CAMBIO DE FUENTE////////////
        ///////////////////////////////////// 

        bz.cambioFuente = function (fuente) {

            $rootScope.$broadcast("editor:fuente", fuente);

        }

        /////////////////////////////////////
        ////////CAMBIO DE PROPIEDAS//////////
        ///////////////////////////////////// 

        bz.cambioPropiedad = function (propiedad) {

            $rootScope.$broadcast("editor:propiedad", propiedad);

        }

        /////////////////////////////////////
        /////////CAMBIO DE TAMAÑO////////////
        ///////////////////////////////////// 

        bz.cambioTamano = function (objetivo, accion) {

            $rootScope.$broadcast("editor:tamano", {
                objetivo: objetivo,
                accion: accion
            });

        }

        /////////////////////////////////////////////////////////////////////////
        ////Disparar el guardado de un svg como copia de comparacion/////////////
        /////////////////////////////////////////////////////////////////////////

        bz.comparaciones = [];

        bz.realizarComparacion = function () {

            $rootScope.$broadcast("editor:comparar", true);

        }

        $scope.$on("directiva:comparar", function (evento, valor) {

            if (bz.comparaciones.length <= 10) {
                bz.comparaciones.push(valor)
            }

        })

        bz.removerComparacion = function (comparacion) {

            var indice = bz.comparaciones.indexOf(comparacion);
            bz.comparaciones.splice(indice, 1);
        }




        //////////////////////////////////////////
        ///////////CAMBIAR ORIENTACION////////////
        //////////////////////////////////////////


        bz.cambiarOrientacion = function (orientacion) {


            $rootScope.$broadcast("editor:orientacion", orientacion);

        }


        ////////////////////////////////////////
        ///////BUSCAR Y REEMPLAZAR ICONO////////
        ////////////////////////////////////////

        bz.iconos = [];

        bz.buscarIconos = function (idCategoria, valido) {

            bz.iconosForm.$setSubmitted();

            if (valido) {


                bz.borradores = false;
                bz.preview = false;
                bz.busquedaIconos = true;


                categoriasService.listaCategoriasElementos(idCategoria, 'ICONO').then(function (res) {

                    bz.iconos = res;
                })
            }

        }



        bz.reemplazarIcono = function (icono) {

            bz.logo.icono = icono;
            $rootScope.$broadcast("editor:reemplazar", bz.base64.decode(icono.svg));

        }

        /*
        $scope.$on("directiva:reemplazar", function (evento, valor) {

            

        })
        */


        //////////////////////////////////////////
        ////////RESTAURAR COMPARACIONES///////////
        //////////////////////////////////////////

        bz.restaurarComparacion = function (comparacion) {

            $rootScope.$broadcast("editor:restaurar", comparacion);

        }









        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
