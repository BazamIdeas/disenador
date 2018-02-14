angular.module("landing")

	.controller("disenadorController", ["clientesService", "verificarBase64Factory", "clienteResolve", "logosService", "$base64", "arrayToJsonMetasFactory", function (clientesService,verificarBase64Factory, clienteResolve, logosService, $base64, arrayToJsonMetasFactory) {

		var bz = this;

		bz.base64 = $base64;

		bz.logos = [];

		bz.disenador = clienteResolve;

		logosService.vendidosPorCliente(bz.disenador.idCliente)
			.then(function (res) {
				angular.forEach(res, function (logo, indice) {

					logo.atributos = arrayToJsonMetasFactory(logo.atributos);
					bz.logos.push(logo);
				});
			}).catch(function () {
			
			}).finally(function () {
				
			});

		bz.verificarBase64 = verificarBase64Factory;
        
		//logosService.listarPorEstado()

	}]);
