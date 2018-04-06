angular.module("disenador-de-logos")

/* header */

	.controller("headerController", ["$state", "clientesService", "$rootScope", "$scope", "mostrarPasoPopAyudaFactory", function ($state, clientesService, $rootScope, $scope, mostrarPasoPopAyudaFactory) {

		var bz = this;

		bz.salir = function () {
			clientesService.salir(true, true);
		};
    
		bz.autorizado = clientesService.autorizado();
        
		bz.mostrarPasoPopAyuda = mostrarPasoPopAyudaFactory
		

		$scope.$on("sesionExpiro", function () {

			bz.autorizado = clientesService.autorizado();

		});

		$scope.$on("sesionInicio", function () {

			bz.autorizado = clientesService.autorizado();

		});

	}]);
