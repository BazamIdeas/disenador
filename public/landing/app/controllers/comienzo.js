angular.module("landing")

	.controller("comienzoController", ["$window", "$base64", "estaticosLandingValue", "logosService", "navegarFactory", function ($window, $base64, estaticosLandingValue, logosService, navegarFactory) {

		var bz = this;

		logosService.mostrarDestacados().then(function(res){
			bz.destacados = res;

		})
        
		bz.enviarComenzar = function (nombreLogo, v) {

			if (!v) return;
			
			navegarFactory.cliente(false, {n: nombreLogo});
			
		};


		bz.navegar = navegarFactory;

		bz.caracteristicas = estaticosLandingValue.caracteristicas;

		bz.testimonios = estaticosLandingValue.testimonios;

		bz.preguntas = estaticosLandingValue.preguntas;


		bz.modFun = function (i) {
			bz.modfire = i;
			bz.modInit = !bz.modInit;
		};

		bz.base64 = $base64;

	}]);