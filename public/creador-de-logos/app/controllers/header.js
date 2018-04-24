angular.module("disenador-de-logos")

/* header */

	.controller("headerController", ["$state", "clientesService", "$rootScope", "$scope", "mostrarPasoPopAyudaFactory", "verificarBase64Factory", "navegarFactory", function ($state, clientesService, $rootScope, $scope, mostrarPasoPopAyudaFactory, verificarBase64Factory, navegarFactory) {

		var bz = this;

		bz.navegar = navegarFactory;

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
