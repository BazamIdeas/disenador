angular.module("landing")

	.controller("comienzoController", ["$window", "$base64", "estaticosLandingValue", "logosService", function ($window, $base64, estaticosLandingValue, logosService) {

		var bz = this;

		bz.destacados = [];

		logosService.mostrarDestacados().then(function(res){

			bz.destacados = res;

		}).catch(function(){

		}).finally(function(){

		});
        
		bz.enviarComenzar = function (nombreLogo, v) {

			if (!v) return;
            
			$window.location.href = "http://" + location.host + "/creador-de-logos/comenzar/?n=" + nombreLogo;
			
		};

		bz.caracteristicas = estaticosLandingValue.caracteristicas;

		bz.testimonios = estaticosLandingValue.testimonios;

		bz.preguntas = estaticosLandingValue.preguntas;


		bz.modFun = function (i) {
			bz.modfire = i;
			bz.modInit = !bz.modInit;
		};

		bz.base64 = $base64;

	}]);