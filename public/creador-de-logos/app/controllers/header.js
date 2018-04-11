angular.module("disenador-de-logos")

/* header */

	.controller("headerController", ["$state", "clientesService", "$rootScope", "$scope", "mostrarPasoPopAyudaFactory", "verificarBase64Factory", function ($state, clientesService, $rootScope, $scope, mostrarPasoPopAyudaFactory, verificarBase64Factory) {

		var bz = this;

		bz.salir = function () {
			clientesService.salir(true, true);
		};

		bz.verificarBase64 = verificarBase64Factory;
    
		bz.autorizado = clientesService.autorizado();
        
		bz.mostrarPasoPopAyuda = mostrarPasoPopAyudaFactory
		

		$scope.$on("sesionExpiro", function () {

			bz.autorizado = clientesService.autorizado();

		});

		$scope.$on("sesionInicio", function () {

			bz.autorizado = clientesService.autorizado();

		});

	}]);
