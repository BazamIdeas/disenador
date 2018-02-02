angular.module("landing")

	.controller("disenadorController", ["clientesService", "verificarBase64Factory", "clienteResolve", "logosService",function (clientesService,verificarBase64Factory, clienteResolve, logosService) {

		var bz = this;

		bz.logos = [];

		bz.disenador = clienteResolve;

		bz.verificarBase64 = verificarBase64Factory;
        
		//logosService.listarPorEstado()

	}]);
