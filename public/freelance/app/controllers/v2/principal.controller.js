angular.module("disenador-de-logos")

    /* Comenzar */

    .controller('principalController', ["categoriasService", "preferenciasService", "elementosService", '$stateParams', "$q", "$scope", "$state", "crearLogoFactory", "clientesService", "$mdToast", "$timeout", "paisesValue", "logosService",function (categoriasService, preferenciasService, elementosService, $stateParams, $q, $scope, $state, crearLogoFactory, clientesService, $mdToast, $timeout, paisesValue, logosService) {

        var bz = this;
        
        bz.paises = paisesValue;
        
        bz.paisDefecto = null;
        
        clientesService.pais().then(function(res){
            
            bz.paisDefecto = res.iso;
            
        });
        
        bz.datos = {
            nombre: "Mi logo",
            preferencias: [],
            categoria: {
                icono: "",
                fuente: ""
            }
        }

        bz.jqueryScrollbarOptions = {};

        bz.iconos = [];

        bz.fuentes = [];

        bz.logos = [];

        bz.logoSeleccionado = null;



        bz.categoriasPosibles = {
            fuentes: [],
            iconos: []
        };

        bz.preferencias = [];

        categoriasService.listaCategorias('ICONO').then(function (res) {

            bz.categoriasPosibles.iconos = res;


        })

        categoriasService.listaCategorias('FUENTE').then(function (res) {

            bz.categoriasPosibles.fuentes = res;


        })

        preferenciasService.listaPreferencias().then(function (res) {

            angular.forEach(res, function (valor, llave) {
                valor.valor = 2;
                bz.datos.preferencias.push(valor);

            })

        })

        bz.botonesTipo = [{
            nombre: 'Logo y nombre',
            activo: true
        }, {
            nombre: 'Tipografico',
            activo: true
        }, {
            nombre: 'Solo nombre',
            activo: true
        }];




        bz.completado = true;

        bz.solicitarElementos = function (inicial) {

            if ($scope.principal.datosForm.$valid && bz.completado) {

                bz.completado = false;

                bz.datosIconos = {
                    categoria: bz.datos.categoria.icono,
                    preferencias: bz.datos.preferencias,
                    tipo: 'ICONO'
                }

                bz.datosFuentes = {
                    categoria: bz.datos.categoria.fuente,
                    preferencias: bz.datos.preferencias,
                    tipo: 'FUENTE'
                };
                
                
                var promesaIconos = inicial ? elementosService.listarIniciales(inicial) : elementosService.listaSegunPref(bz.datosIconos); 

                $q.all([
                    promesaIconos,
                    elementosService.listaSegunPref(bz.datosFuentes)
                    ])
                    .then(function (res) {



                        bz.iconos = res[0];
                        bz.fuentes = res[1];

                        $state.go("principal.opciones", {
                            status: true
                        });

                    }).catch(function (error) {

                        //$state.go('comenzar')
                    
                    }).finally(function(res){
                    
                    
                        bz.completado = true;
                    
                })

            }

        }




        bz.asignarTipo = function (tipoLogo, iniciales) {
            
            var inicial = iniciales ? bz.datos.nombre.charAt(0) : false;

            angular.forEach(bz.botonesTipo, function (valor, llave) {

                if (bz.botonesTipo[llave].nombre != tipoLogo.nombre) {

                    bz.botonesTipo[llave].activo = false;

                } else {

                    bz.botonesTipo[llave].activo = true;
                }

            })

            bz.solicitarElementos(inicial);
        }



        bz.combinar = function () {

            bz.logos = crearLogoFactory(bz.iconos, bz.fuentes);

            $state.go("principal.combinaciones", {
                status: true
            });

        }


        bz.avanzar = function (indiceLogo) {

            bz.logoSeleccionado = indiceLogo;

            if (!clientesService.autorizado()) {

                bz.mostrarModalLogin = true;

            } else {

                $state.go("editor", {
                    status: true,
                    datos: {
                        logo: bz.logos[bz.logoSeleccionado],
                        texto: bz.datos.nombre,
                        categoria: bz.logos[bz.logoSeleccionado].icono.categorias_idCategoria
                    }
                });

            }

        }


        bz.datosLogin = {};
        
        bz.completadoLogin = true;

        bz.login = function (datos, valido) {

            if (valido) {
                
                bz.completadoLogin = false;

                clientesService.login(datos).then(function (res) {

                    if (clientesService.autorizado(true)) {

                        $mdToast.show({
                            hideDelay: 0,
                            position: 'top right',
                            controller: ["$scope", "$mdToast", function ($scope, $mdToast) {
                                var temporizador = $timeout(function () {

                                    $mdToast.hide();

                                }, 2000)

                                $scope.closeToast = function () {
                                    $timeout.cancel(temporizador)
                                    $mdToast.hide();

                                }
                            }],
                            templateUrl: 'toast-success-login.html'
                        });

                        bz.mostrarModalLogin = false;
                        bz.avanzar(bz.logoSeleccionado);
                    }

                }).catch(function () {

                    $mdToast.show({
                        hideDelay: 0,
                        position: 'top right',
                        controller: ["$scope", "$mdToast", function ($scope, $mdToast) {

                            var temporizador = $timeout(function () {

                                $mdToast.hide();

                            }, 2000)

                            $scope.closeToast = function () {
                                $timeout.cancel(temporizador)
                                $mdToast.hide();
                            }
                            }],
                        templateUrl: 'toast-danger-login.html'
                    });

                }).finally(function(res){
                     
                    bz.completadoLogin = true;
                    
                });
                

            };

        };
        
        
        
        bz.completadoRegistro = true;
        
        bz.registrar = function(datos, valido){
            
           
            
            if (valido && bz.completadoRegistro) {
                
                bz.completadoRegistro = false;
                
                 console.log("hola")
                
                clientesService.registrar(datos.nombreCliente, datos.correo, datos.pass, datos.telefono, datos.pais).then(function (res) {

                    if (clientesService.autorizado(true)) {

                        $mdToast.show({
                            hideDelay: 0,
                            position: 'top right',
                            controller: ["$scope", "$mdToast", function ($scope, $mdToast) {

                                var temporizador = $timeout(function () {

                                    $mdToast.hide();

                                }, 2000)

                                $scope.closeToast = function () {
                                    $timeout.cancel(temporizador)
                                    $mdToast.hide();

                                }
                            }],
                            templateUrl: 'toast-success-registro.html'
                        });

                        bz.mostrarModalLogin = false;
                        bz.avanzar(bz.logoSeleccionado);

                    }

                }).catch(function () {

                    $mdToast.show({
                        hideDelay: 0,
                        position: 'top right',
                        controller: ["$scope", "$mdToast", function ($scope, $mdToast) {

                            var temporizador = $timeout(function () {

                                $mdToast.hide();

                            }, 2000)

                            $scope.closeToast = function () {
                                $timeout.cancel(temporizador)
                                $mdToast.hide();

                            }
                        }],
                        templateUrl: 'toast-danger-registro.html'
                    });


                }).finally(function () {
                    
                    bz.completadoRegistro = true;
                    
                })

            };
            
        }


        bz.seleccionarFuenteCategoria = function(idCategoria){
            var fuenteNombre = "futura-heavy";

            angular.forEach(bz.categoriasPosibles.fuentes, function(fuenteCategoria, llave){
                if(fuenteCategoria.idCategoria == idCategoria){

                    fuenteNombre = fuenteCategoria.nombreCategoria;
                }
            })

            return fuenteNombre;
        }

}])
