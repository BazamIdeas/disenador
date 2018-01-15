angular.module("disenador-de-logos")

    /* Editor */

    .controller('editorController', ['$scope', '$stateParams', '$state', '$base64', 'categoriasService', 'logosService', 'clientesService', "historicoResolve", "$rootScope", "$mdToast", "$timeout", "elementosService", function ($scope, $stateParams, $state, $base64, categoriasService, logosService, clientesService, historicoResolve, $rootScope, $mdToast, $timeout, elementosService) {

        var bz = this;

        bz.base64 = $base64;

        bz.cuadricula = false;
        bz.borradores = false;
        bz.preview = false;
        bz.busquedaIconos = false;
        bz.colorFondo = "rgb(236,239,240)";
        bz.colorTexto = "#000";
        bz.colorEslogan = "#000";
        bz.colorIcono = "#000";

        bz.logo = historicoResolve.logo;

        if (!historicoResolve.idLogoGuardado) { //si no es un logo guardado

            bz.logo.texto = historicoResolve.texto;
            bz.categoria = historicoResolve.logo.icono.categorias_idCategoria;

        } else if (historicoResolve.idLogoGuardado) { // si es un logo previamente guardado
            /*bz.logo.fuente = {
                url: historicoResolve.fuentes.principal.url,
                nombre: historicoResolve.fuentes.principal.nombre
            };
            
            if(historicoResolve.fuentes.eslogan){
                bz.logo.fuenteEslogan = {
                    url: historicoResolve.fuentes.eslogan.url,
                    nombre: historicoResolve.fuentes.eslogan.nombre
                };
            }*/
            bz.logo.idLogo = historicoResolve.idLogoGuardado;
        }

        /* CATEGORIAS EXISTENTES */

        bz.categoriasPosibles = [];

        categoriasService.listaCategorias('ICONO').then(function (res) {

            angular.forEach(res, function (valor, llave) {

                bz.categoriasPosibles.push(valor);

            })

        })


        elementosService.listarFuentes().then(function (res) {

            bz.fuentes = res;

            if (historicoResolve.idLogoGuardado) { // si es un logo previamente guardado
                
                angular.forEach(bz.fuentes, function (valor, llave) {

                    if(valor.idElemento == historicoResolve.fuentes.principal){
                        
                        bz.logo.fuente = {
                            url: valor.url,
                            nombre: valor.nombre
                        };
                        
                    } 
                    
                    if(valor.idElemento == historicoResolve.fuentes.eslogan){
                        
                        bz.logo.fuenteEslogan = {
                            url: valor.url,
                            nombre: valor.nombre
                        };
                        
                        bz.esloganActivo = true;
                        
                    }

                })


            }

        })



        bz.completadoGuardar = true;

        bz.guardarLogo = function (logo, tipoLogo, idElemento) {

            if (bz.completadoGuardar) {

                bz.completadoGuardar = false;

                var fuentesId = {
                    principal: null,
                    eslogan: null
                }

                angular.forEach(bz.fuentes, function (fuente, llave) {

                    if (bz.logo.fuente && (bz.logo.fuente.url == fuente.url)) {

                        fuentesId.principal = fuente.idElemento;

                    }

                    if (bz.logo.fuenteEslogan && (bz.logo.fuenteEslogan.url == fuente.url)) {

                        fuentesId.eslogan = fuente.idElemento;

                    }
                })

                if (!bz.logo.idLogo) { //si nunca se ha guardado este logo
                    logosService.guardarLogo(bz.base64.encode(logo), tipoLogo, idElemento, fuentesId.principal, fuentesId.eslogan).then(function (res) {
                        bz.logo.idLogo = res;
                        $mdToast.show({
                            hideDelay: 0,
                            position: 'top right',
                            controller: ["$scope", "$mdToast", "$timeout", function ($scope, $mdToast, $timeout) {

                                var temporizador = $timeout(function () {

                                    $mdToast.hide();

                                }, 2000)

                                $scope.closeToast = function () {
                                    $timeout.cancel(temporizador)
                                    $mdToast.hide();

                                }
                        }],
                            templateUrl: 'toast-success-logo-save.html'
                        });


                    }).finally(function () {

                        bz.completadoGuardar = true;

                    })
                } else { //si es un logo guardado

                    logosService.modificarLogo(bz.base64.encode(logo), bz.logo.idLogo, fuentesId.principal, fuentesId.eslogan).then(function (res) {

                        console.log(res)
                        $mdToast.show({
                            hideDelay: 0,
                            position: 'top right',
                            controller: ["$scope", "$mdToast", "$timeout", function ($scope, $mdToast, $timeout) {

                                var temporizador = $timeout(function () {

                                    $mdToast.hide();

                                }, 2000)

                                $scope.closeToast = function () {
                                    $timeout.cancel(temporizador)
                                    $mdToast.hide();

                                }
                        }],
                            templateUrl: 'toast-success-logo-save.html'
                        });


                    }).finally(function () {

                        bz.completadoGuardar = true;

                    })

                }
            }

        }


        bz.activarCuadricula = function () {

            bz.cuadricula = !bz.cuadricula;

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

        bz.mostrarPreviews = function () {

            if (bz.preview) {

                bz.preview = false;

            } else {

                bz.preview = true;
                bz.busquedaIconos = false;
                bz.borradores = false;

            }

        }

        bz.buscarPlanes = function () {

            $rootScope.$broadcast("editor:planes", true);

        }

        $scope.$on("directiva:planes", function (evento, datos) {

            var idFuente = null;
            var idFuenteEslogan = null;
            
            angular.forEach(bz.fuentes, function (valor, llave) {

                    if(valor.url == bz.logo.fuente.url){
                        
                        idFuente = valor.idElemento;
                        
                    } 
                    
                    if(bz.logo.fuenteEslogan && (valor.url == bz.logo.fuenteEslogan.url)){
                        
                        idFuenteEslogan =  valor.idElemento                        
                    }

                })
            
            /*
            $state.go("planes", {
                status: true,
                datos: {
                    logo: datos,
                    idElemento: bz.logo.icono.idElemento,
                    tipo: 'Logo y nombre',
                    fuentes: {
                        principal: idFuente,
                        eslogan:  idFuenteEslogan
                        
                    }
                }
            })*/

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

        bz.cambioTexto = function (texto, eslogan) {

            $rootScope.$broadcast("editor:texto", {
                texto: texto,
                eslogan: eslogan
            });

        }


        /////////////////////////////////////
        /////////CAMBIO DE FUENTE////////////
        ///////////////////////////////////// 

        bz.cambioFuente = function (fuente, objetivo) {

            $rootScope.$broadcast("editor:fuente", {
                fuente: angular.copy(fuente),
                objetivo: objetivo
            });

        }

        /////////////////////////////////////
        ////////CAMBIO DE PROPIEDAS//////////
        ///////////////////////////////////// 

        bz.cambioPropiedad = function (propiedad, eslogan) {

            $rootScope.$broadcast("editor:propiedad", {
                propiedad: propiedad,
                eslogan: eslogan
            });

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

        bz.completadoBuscar = true;

        bz.buscarIconos = function (idCategoria, valido) {

            bz.iconosForm.$setSubmitted();

            if (valido) {

                bz.completadoBuscar = false;


                bz.borradores = false;
                bz.preview = false;
                bz.busquedaIconos = true;


                categoriasService.listaCategoriasElementos(idCategoria, 'ICONO')
                    .then(function (res) {
                        bz.iconos = res;
                    }).finally(function (res) {
                        bz.completadoBuscar = true;
                    })
            }

        }



        bz.reemplazarIcono = function (icono) {

            bz.logo.icono = icono;
            $rootScope.$broadcast("editor:reemplazar", bz.base64.decode(icono.svg));

        }

        $scope.$on("directiva:restaurarEslogan", function (evento, datos) {

            if (datos.accion) {

                var fuenteElegida = null;

                angular.forEach(bz.fuentes, function (valor, llave) {

                    if (valor.nombre == datos.fuente.nombre) {

                        fuenteElegida = {
                            nombre: valor.nombre,
                            url: valor.url
                        };
                    }

                })

                bz.logo.fuenteEslogan = fuenteElegida;
                bz.esloganActivo = true;
            } else {
                bz.logo.eslogan = "";
                bz.logo.fuenteEslogan = null;
                bz.esloganActivo = false;
            }
        })



        bz.agregarEslogan = function () {

            bz.logo.eslogan = "Mi eslogan aquí";
            bz.logo.fuenteEslogan = bz.logo.fuente;

            $rootScope.$broadcast("editor:agregarEslogan", {
                eslogan: bz.logo.eslogan,
                fuente: bz.logo.fuenteEslogan
            });

            bz.esloganActivo = true;

        }

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
