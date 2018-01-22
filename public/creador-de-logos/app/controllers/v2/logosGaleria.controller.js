angular.module("disenador-de-logos")

 

    .controller('logosGaleriaController', ["$scope", "$state", "$base64", "logosService", function ($scope, $state, $base64, logosService) {

        var bz = this;

        bz.base64 = $base64;
        bz.aprobados = [];

        logosService.mostrarAprobados().then(function(res){
            
             bz.aprobados = res;
            
        }).catch(function(){
            
            
            
        }).finally(function(){
            
            
        })
        
        
         bz.buscarAtributo = function(lista, objetivo){
            
            var idFuente = null;
            
            angular.forEach(lista, function(atributo, llave){
                
                if(atributo.clave == objetivo){
                    
                    idFuente = atributo.valor;
                    
                }
                
            })
            
            return idFuente;
        }
        
        bz.obtenerMetas = function(filtrar){
            
            var metas = [];
            
            angular.forEach(filtrar, function(meta, llave){
                
                angular.forEach(asdas, function(){
                    
                    if(meta.clave != objetivo){
                    
                        idFuente = atributo.valor;

                    }
                    
                })
               
                
            })
            
            return metas;
        }
        

    }])
