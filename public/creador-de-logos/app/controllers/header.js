angular.module("disenador-de-logos")

/* header */

	.controller("headerController", ["clientesService", "$scope", "mostrarPasoPopAyudaFactory", "verificarBase64Factory", "$location", "disenadorService", "$mdToast", function (clientesService,  $scope, mostrarPasoPopAyudaFactory, verificarBase64Factory, $location, disenadorService, $mdToast) {

		var bz = this;

		bz.salir = function () {
			clientesService.salir(true, true);
		};

		bz.verificarBase64 = verificarBase64Factory;
    
		bz.autorizado = clientesService.autorizado();
        
		bz.mostrarPasoPopAyuda = mostrarPasoPopAyudaFactory;


		/**** DATOS FREELANCER ****/

		bz.datosDisenador = {};

		bz.loginDisenador = function(datos, valido){
			
			if(!valido) {
				return;
			}
			
			disenadorService.login(datos.usuario, datos.contrasena)
				
				.then(function(){

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Bienvenido",
							clase: "success"
						}
					}));

					bz.mostrarFormDisenador = false;
					bz.mostrarAccesoDisenador = false;

				})
				.catch(function(){
					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Un error ha ocurrido",
							clase: "danger"
						}
					}));
				})
		
		}

		var params = $location.search();

		bz.mostrarFormDisenador = false;
		bz.mostrarAccesoDisenador = false;
		bz.mostrarBannerDisenador = false;
		
		if(params.designer && !disenadorService.autorizado()){
			bz.mostrarAccesoDisenador = true;

			if(clientesService.autorizado()){
				clientesService.salir(true, true);
			}
			
		}

		if(disenadorService.autorizado()){
			bz.mostrarBannerDisenador = true;
		}
		

		$scope.$on("sesionExpiro", function () {

			bz.autorizado = clientesService.autorizado();

		});

		$scope.$on("sesionInicio", function () {

			bz.autorizado = clientesService.autorizado();

		});

	}]);
