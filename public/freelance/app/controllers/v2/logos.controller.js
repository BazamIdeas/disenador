angular.module("disenador-de-logos")

    /* Editor */

    .controller('logosController', ["$scope", "$window", "$state", "logosService", "$base64", "$mdToast", "clientesService",function ($scope, $window, $state, logosService, $base64, $mdToast, clientesService) {

        var bz = this;

        bz.base64 = $base64;

        bz.mostrarMenu = "borradores";
        
        bz.borradores = [];
        bz.pendientes = [];
        bz.aprobados = [];
        bz.vendidos = [];

        bz.salto = {
            comprados: 0,
            pendientes: 0,
            aprobados: 0,
            vendidos: 0
        };
        
        bz.cantidad = {
            
            comprados: 0,
            pendientes: 0,
            aprobados: 0,
            vendidos: 0,
            
        }

        
        //BORRADORES
        logosService.listarPorEstado('Borrador').then(function (res) {

            bz.borradores = res;            
            bz.cantidad.borradores = bz.borradores.length;

        }).catch(function (res) {

        })

        
        //POR APROBARSE
        logosService.listarPorEstado('Por Aprobar').then(function (res) {

            bz.pendientes = res;
            bz.cantidad.pendientes = bz.pendientes.length;

        }).catch(function (res) {

        });
        
        
        //APROBADOS
        logosService.listarPorEstado('Aprobado').then(function (res) {

            bz.aprobados = res;
            bz.cantidad.aprobados = bz.aprobados.length;

        }).catch(function (res) {

        });
        
        
        //VENDIDOS
        logosService.listarPorEstado('Vendido').then(function (res) {

            bz.vendidos = res;
            bz.cantidad.vendidos = bz.vendidos.length;

        }).catch(function (res) {

        });
        
        
        

        bz.modificarSalto = function(accion, objetivo){
            
            if(accion){
                
                if(bz[objetivo][bz.salto[objetivo] + 9]){
                    
                    bz.salto[objetivo] = bz.salto[objetivo] + 9;
                }
                
            } else if ((bz.salto[objetivo] - 9) >= 0) {
                
                bz.salto[objetivo] = bz.salto[objetivo] - 9;
            }
              
        }
        
    
        bz.borradoCompleto = true;
        
        bz.borrarLogo = function(idLogo){
            if(bz.borradoCompleto){
                
                bz.borradoCompleto = false;
                
                logosService.borrarLogo(idLogo).then(function(res){

                    angular.forEach(bz.guardados, function(valor, indice){
                        if(valor.idLogo == idLogo){
                            bz.guardados.splice(indice, 1);
                            return false;
                        }   
                    });

                    $mdToast.show({
                        hideDelay   : 0,
                        position    : 'top right',
                        controller  :  ["$scope", "$mdToast", "$timeout", function($scope, $mdToast, $timeout) {

                            var temporizador = $timeout(function(){
                                $mdToast.hide();
                            }, 2000)

                            $scope.closeToast = function() {
                                $timeout.cancel(temporizador)
                                $mdToast.hide();

                            }
                        }],
                        templateUrl : 'toast-success-logo-delete.html'
                    });   

                }).catch(function(){

                    $mdToast.show({
                        hideDelay   : 0,
                        position    : 'top right',
                        controller  :  ["$scope", "$mdToast", "$timeout", function($scope, $mdToast, $timeout) {

                            var temporizador = $timeout(function(){
                                $mdToast.hide();
                            }, 2000)

                            $scope.closeToast = function() {
                                $timeout.cancel(temporizador)
                                $mdToast.hide();

                            }
                        }],
                        templateUrl : 'toast-danger-logo-delete.html'
                    });

                }).finally(function(){
                    
                    bz.borradoCompleto = true;

                })
            }
        }
        
        
        bz.buscarAtributo = function(lista, objetivo){
            
            var idFuente = null;
            
            angular.forEach(lista, function(atributo, llave){
                
                if(atributo.clave == objetivo){
                    
                    idFuente = atributo.valor;
                    
                }
                
            })
            
            return idFuente;
        }
        
        
        
        
        bz.facturacion = [];
        bz.datos = {};
        
        clientesService.datos(true).then(function (res) {
            
            if(res.facturacion){
                bz.facturacion = angular.copy(res.facturacion);
                delete res.facturacion;
            } 
            
            bz.datos = res;
        });
        
        
        
        
        
        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });

    }])
