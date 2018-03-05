angular.module("landing")

	.controller("comienzoController", ["$base64", "estaticosLandingValue", "logosService", "navegarFactory", "clientesService", "arrayToJsonMetasFactory", "guardarLogoFactory", "categoriasService", "elementosService", "pedidosService", function ($base64, estaticosLandingValue, logosService, navegarFactory, clientesService, arrayToJsonMetasFactory, guardarLogoFactory, categoriasService, elementosService, pedidosService) {

		var bz = this;


		bz.navegar = navegarFactory;

		bz.caracteristicas = estaticosLandingValue.caracteristicas;

		bz.testimonios = estaticosLandingValue.testimonios;

		bz.preguntas = estaticosLandingValue.preguntas;

		bz.preAct = 0;

		comienzo.pasos = 0;

		bz.consejos = estaticosLandingValue.consejos;

		bz.base64 = $base64;


		bz.categoriasPosibles = {
			fuentes: [],
			iconos: [],
			colores: [{
				primero: '#FA198B',
				segundo: '#B91372',
				tercero: '#6B0F1A',
				cuarto: '#31081F',
				quinto: '#0E0004'
			}, {
				primero: '#644536',
				segundo: '#B2675E',
				tercero: '#C4A381',
				cuarto: '#BBD686',
				quinto: '#0E0004'
			}, {
				primero: '#D7263D',
				segundo: '#02182B',
				tercero: '#0197F6',
				cuarto: '#448FA3',
				quinto: '#68C5DB'
			}, {
				primero: '#6E0D25',
				segundo: '#FFFFB3',
				tercero: '#DCAB6B',
				cuarto: '#774E24',
				quinto: '#6A381F'
			}]
		};

		bz.preferencias = [];

		categoriasService.listaCategorias("ICONO").then(function (res) {

			bz.categoriasPosibles.iconos = res;


		});

		categoriasService.listaCategorias("FUENTE").then(function (res) {

			bz.categoriasPosibles.fuentes = res;


		});

		bz.datosCombinaciones = {
			preferencias: [],
			etiquetas: [],
			etiquetasSeleccionadas: [],
			colores: []
		}

		bz.selectedItem = null;
		bz.searchText = null;
		bz.querySearch = querySearch;
		bz.etiquetas = loadEtiquetas();
		bz.transformChip = transformChip;

		function loadEtiquetas() {

			var etiquetas = [{
					'name': 'Broccoli'
				},
				{
					'name': 'Cabbage'
				},
				{
					'name': 'Carrot'
				},
				{
					'name': 'Lettuce'
				},
				{
					'name': 'Spinach'
				}
			];

			return etiquetas.map(function (et) {
				et._lowername = et.name.toLowerCase();
				return et;
			});
		}

		function transformChip(chip) {

			// If it is an object, it's already a known chip
			if (angular.isObject(chip)) {
				return chip;
			}

			// Otherwise, create a new one
			return {
				name: chip
			}

		}

		function querySearch(query) {
			var results = query ? bz.etiquetas.filter(createFilterFor(query)) : [];
			return results;
		}

		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);

			return function filterFn(etiqueta) {
				return (etiqueta._lowername.indexOf(lowercaseQuery) === 0);
			};

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

						/*
						if (!v) return;

						navegarFactory.cliente(false, {
							n: nombreLogo
						});
*/

					})
			}

		};


		logosService.mostrarDestacados().then(function (res) {
			bz.destacados = res;
		}).catch(function () {

		}).finally(function () {

		});

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


		/* PLANES */

		bz.monedas = {};
		bz.moneda = {};
		bz.monedaDefault = {};
		bz.planes = [];
		bz.impuesto = 0;

		pedidosService.listarPlanes().then(function (res) {

			bz.monedaDefault = {
				simbolo: res.monedaDefault.codigo,
				idMoneda: res.monedaDefault.idMoneda
			};

			bz.impuesto = res.impuesto;

			bz.planes = res.planes;

			angular.forEach(res.planes, function (plan) {

				angular.forEach(plan.precios, function (precio) {
					if (!bz.monedas[precio.moneda]) {

						bz.monedas[precio.moneda] = {
							simbolo: precio.moneda,
							idMoneda: precio.idMoneda
						};

					}

				});

			});

			bz.moneda = bz.monedaDefault;
		});

		bz.precioSeleccionado = function (precios) {

			var precioFinal = "";

			angular.forEach(precios, function (valor) {

				if (valor.moneda == bz.moneda.simbolo) {

					precioFinal = valor.moneda + " " + valor.precio;
				}

			});

			return precioFinal;

		};

		bz.modFun = function (i) {
			bz.modfire = i;
			bz.modInit = !bz.modInit;
		};



	}]);