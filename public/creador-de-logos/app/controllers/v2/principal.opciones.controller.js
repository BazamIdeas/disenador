angular.module("disenador-de-logos")

	.controller("principalOpcionesController", ["$scope", "$base64", function ($scope, $base64) {

		var bz = this;
        
		bz.deshabilitado = true;
        
		bz.base64 = $base64;
        
		bz.contarSeleccionados = function(tipo){
            
			var contar = 0;
            
			angular.forEach($scope.$parent.principal[tipo], function(valor){
                
				if(valor.estado == true){
                    
					contar = contar + 1;
                    
				}
			});
            
			return contar;
            
		};
        
    
		bz.agregarElemento = function (indice, tipo) {

			if($scope.$parent.principal[tipo][indice].estado){
                  
				$scope.$parent.principal[tipo][indice].estado = !$scope.$parent.principal[tipo][indice].estado;
                  
			}  else{
                  
				if (bz.contarSeleccionados(tipo) < 3) { 
                  
					$scope.$parent.principal[tipo][indice].estado = !$scope.$parent.principal[tipo][indice].estado;
                  
				}
                  
			}
            
			if(bz.contarSeleccionados("iconos")){  /*&& bz.contarSeleccionados("fuentes")*/
                
				bz.deshabilitado = false;
                
			} else {
                
				bz.deshabilitado = true;
                
			}

		};
        
        
		bz.combinar = function(deshabilitado, valido){

			if(deshabilitado && valido){
				$scope.$parent.principal["fuentes"] = $scope.$parent.principal.fuentes.slice(0,bz.contarSeleccionados("iconos") * 3);
                
				$scope.$parent.principal.combinar();
                
			}
            
		};
   
	}]);
