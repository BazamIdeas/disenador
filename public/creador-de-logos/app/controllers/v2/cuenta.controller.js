angular.module("disenador-de-logos")

    /* Editor */

    .controller('cuentaController', ["$scope", "$state", "pedidosService", "clientesService", "$mdToast", "paisesValue", function ($scope, $state, pedidosService, clientesService, $mdToast, paisesValue) {

        var bz = this;
        
        bz.formulario = 1;
        
        bz.paises = paisesValue;
        
        bz.pedidos = [];
        bz.datos = {};
        bz.datosEspejo = {};

        clientesService.datos().then(function(res){
            
            bz.datos = res;
            
        });
        
        pedidosService.listarPedidos().then(function(res){
            
             angular.forEach(res, function(valor, indice){
                
                if(valor.estado != "EN ESPERA"){
                    bz.pedidos.push(valor)
                }
                
            });
            
        });
        
        
        bz.editar = function(datos){
            
            bz.datosEspejo = angular.copy(datos);
            bz.formulario = 2;
            
        }
        
        bz.guardar = function(datos, valido){
            
            if(valido){
                
                clientesService.modificar(datos.nombreCliente, datos.telefono, datos.pais).then(function(res){
                    
                    console.log("aaaaaa")
                    
                })
                
            }
                        
        }
        
        
        
        
        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });

    }])
