angular.module("disenador-de-logos")

    /* Editor */

    .controller('cuentaController', ["$scope", "$state", "pedidosService", "clientesService", "$mdToast", "paisesValue", function ($scope, $state, pedidosService, clientesService, $mdToast, paisesValue) {

        var bz = this;

        bz.formulario = 1;

        bz.paises = paisesValue;

        //bz.pedidos = [];
        bz.facturacion = [];
        bz.datos = {};
        bz.datosEspejo = {};
        bz.datosMetodo = {};

        clientesService.datos(true).then(function (res) {
            
            if(res.facturacion){
                bz.facturacion = angular.copy(res.facturacion);
                delete res.facturacion;
            } 
            
            bz.datos = res;
        });

      
        bz.editar = function (datos) {

            bz.datosEspejo = angular.copy(datos);
            bz.formulario = 2;

        }


        bz.completado = true;

        bz.guardar = function (datos, valido) {

            if (valido && bz.completado) {

                bz.completado = false;

                clientesService.modificar(datos.nombreCliente, datos.telefono, datos.pais)

                    .then(function (res) {

                        bz.datos = angular.copy(datos);
                        bz.formulario = 1;

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
                            templateUrl: 'toast-success-cuenta-modify.html'
                        });

                    })
                    .catch(function () {

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
                            templateUrl: 'toast-danger-cuenta-modify.html'
                        });
                    })
                    .finally(function () {

                        bz.completado = true;

                    })

            }

        }


        bz.completadoMetodo = true;

        bz.guardarFacturacion = function (datos, valido) {

            if (valido && bz.completadoMetodo) {

                bz.completadoMetodo = false;

                clientesService.nuevaFacturacion(datos.nombre, datos.email).then(function (res) {

                    var facturacion = {
                        correo: datos.email,
                        idFacturacion: res.insertId,
                        medio: datos.nombre
                    };

                    bz.facturacion.push(facturacion);
                    alert("Metodo guardado");

                }).catch(function (res) {

                    alert("Guardado fallido");

                }).finally(function (res) {

                    bz.completadoMetodo = true;

                })

            }

        }
        
        
        bz.completadoBorrar = true;
        bz.eliminarFacturacion = function(idMetodo){
            
            if (bz.completadoBorrar) {

                bz.completadoMetodo = false;

                clientesService.eliminarFacturacion(idMetodo).then(function (res) {
                    
                    alert("Metodo eliminar");

                }).catch(function (res) {

                    alert("Metodo fallido");

                }).finally(function (res) {

                    bz.completadoBorrar = true;

                })

            }
            
        }

        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });

    }])
