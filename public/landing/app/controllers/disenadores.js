angular.module("landing")

	.controller("disenadoresController", ["clientesService", "verificarBase64Factory", function (clientesService, verificarBase64Factory) {

		var bz = this;
		bz.disenadores = [];

		clientesService.listarFreelancers()
			.then(function (res) {
				bz.disenadores = res;
			})
			.catch(function () {
        
			})
			.finally(function () {
        
			});


		bz.verificarBase64 = verificarBase64Factory;

	}]);
