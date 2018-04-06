angular.module("disenador-de-logos")

    .controller('principalOpcionesController', ["$scope", "$base64", function ($scope, $base64) {

        var bz = this;
        
        bz.deshabilitado = true;
        
        bz.base64 = $base64;
        
        bz.contarSeleccionados = function(tipo){
            
            var contar = 0;
            
            angular.forEach($scope.$parent.$parent.principal[tipo], function(valor, llave){
                
                if(valor.estado == true){
                    
                    contar = contar + 1;
                    
                }
            })
            
            return contar;
            
        }
        
    
        bz.agregarElemento = function (indice, tipo) {

              if($scope.$parent.$parent.principal[tipo][indice].estado){
                  
                  $scope.$parent.$parent.principal[tipo][indice].estado = !$scope.$parent.$parent.principal[tipo][indice].estado;
                  
              }  else{
                             
                  if (bz.contarSeleccionados(tipo) < 3) { 
                  
                    $scope.$parent.$parent.principal[tipo][indice].estado = !$scope.$parent.$parent.principal[tipo][indice].estado;
                  
                  }
  
              }
        
            if(bz.contarSeleccionados(tipo)){
                
                $scope.$parent.$parent.principal.validarFormulario(true);
                
            } else {
                
                $scope.$parent.$parent.principal.validarFormulario(false);
                
            }

        }
        
        
        
        bz.combinar = function(deshabilitado, valido){

            if(deshabilitado && valido){
                
                $scope.$parent.$parent.principal.combinar()
                
            }
            
        }
   
 

}])
