angular.module("landing")

	.controller("comienzoController", ["$base64", "estaticosLandingValue", "logosService", "navegarFactory", "clientesService", "arrayToJsonMetasFactory", "guardarLogoFactory", "categoriasService", "elementosService", function ($base64, estaticosLandingValue, logosService, navegarFactory, clientesService, arrayToJsonMetasFactory, guardarLogoFactory, categoriasService, elementosService) {

		var bz = this;


		bz.navegar = navegarFactory;

		bz.caracteristicas = estaticosLandingValue.caracteristicas;

		bz.testimonios = estaticosLandingValue.testimonios;

		bz.preguntas = estaticosLandingValue.preguntas;

		bz.consejos = estaticosLandingValue.consejos;

		bz.base64 = $base64;


		bz.categoriasPosibles = {
			fuentes: [],
			iconos: []
		};

		bz.preferencias = [];

		categoriasService.listaCategorias("ICONO").then(function (res) {

			bz.categoriasPosibles.iconos = res;


		});

		categoriasService.listaCategorias("FUENTE").then(function (res) {

			bz.categoriasPosibles.fuentes = res;


		});

		bz.datosCombinaciones = {
			preferencias: []
		}

		bz.enviarComenzar = function (datos, v) {

			if (v) {

				bz.datosIconos = {
					categoria: datos.idCategoria,
					preferencias: datos.preferencias,
					tipo: "ICONO"
				};

				bz.datosFuentes = {
					categoria: datos.idFuente,
					preferencias: datos.preferencias,
					tipo: "FUENTE"
				};

				var promesaIconos = inicial ? elementosService.listarIniciales(inicial) : elementosService.listaSegunPref(bz.datosIconos);

				$q.all([
						promesaIconos,
						elementosService.listaSegunPref(bz.datosFuentes)
					])
					.then(function (res) {

						bz.iconos = res[0];
						bz.fuentes = res[1];

						console.log(res)

						/*
						if (!v) return;

						navegarFactory.cliente(false, {
							n: nombreLogo
						});
*/


					})
			}

		};


		logosService.mostrarDestacados()
			.then(function (res) {
				bz.destacados = res;
			})
			.catch(function () {

			})
			.finally(function () {

			});

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

	}]);