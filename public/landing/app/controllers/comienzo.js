angular.module("landing")

	.controller("comienzoController", ["$base64", "estaticosLandingValue", "logosService", "navegarFactory", "clientesService", "arrayToJsonMetasFactory", "guardarLogoFactory", function ($base64, estaticosLandingValue, logosService, navegarFactory, clientesService, arrayToJsonMetasFactory, guardarLogoFactory) {

		var bz = this;

		logosService.mostrarDestacados()
			.then(function (res) {
				bz.destacados = res;
			})
			.catch(function () {

			})
			.finally(function () {

			});

		bz.enviarComenzar = function (nombreLogo, v) {

			if (!v) return;

			navegarFactory.cliente(false, {
				n: nombreLogo
			});

		};


		bz.navegar = navegarFactory;

		bz.caracteristicas = estaticosLandingValue.caracteristicas;

		bz.testimonios = estaticosLandingValue.testimonios;

		bz.preguntas = estaticosLandingValue.preguntas;

		bz.modFun = function (i) {
			bz.modfire = i;
			bz.modInit = !bz.modInit;
		};

		bz.mostrarLogin = false;
		bz.irEditor = function (logo) {

			var logoCopia = angular.copy(logo);
			var atributos = arrayToJsonMetasFactory(logoCopia.atributos);
			bz.callback = function () {
				guardarLogoFactory(logoCopia, atributos);
				navegarFactory.cliente("editor");
			};

			if (clientesService.autorizado()) {
				bz.callback();
			} else {
				bz.mostrarLogin = true;
			}

		};

		bz.consejos = estaticosLandingValue.consejos;

		bz.base64 = $base64;

	}]);