angular.module("landing")

	.controller("comienzoController", ["$base64", "estaticosLandingValue", "logosService", "navegarFactory", "clientesService", "arrayToJsonMetasFactory", "guardarLogoFactory", "categoriasService", "elementosService", "pedidosService", "etiquetasService", "preferenciasService", "$q", "LS", function ($base64, estaticosLandingValue, logosService, navegarFactory, clientesService, arrayToJsonMetasFactory, guardarLogoFactory, categoriasService, elementosService, pedidosService, etiquetasService, preferenciasService, $q, LS) {

		var bz = this;

		/* DATOS */

		bz.navegar = navegarFactory;

		bz.caracteristicas = estaticosLandingValue.caracteristicas;

		bz.testimonios = estaticosLandingValue.testimonios;

		bz.preguntas = estaticosLandingValue.preguntas;

		bz.preAct = 0;

		comienzo.pasos = 0;

		bz.consejos = estaticosLandingValue.consejos;

		bz.base64 = $base64;

		bz.opcionesCarousel = {
			autoPlay: true,
			autoplaySpeed: 5000
		}

		bz.categoriasPosibles = {
			fuentes: [],
			iconos: [],
			colores: [{
				idColor: 1,
				colores: ['#FA198B', '#B91372', '#6B0F1A', '#31081F', '#0E0004']
			}]
		};

		bz.datosCombinaciones = {
			preferencias: [],
			etiquetas: [],
			etiquetasSeleccionadas: [],
			colores: []
		}

		categoriasService.listaCategorias("ICONO").then(function (res) {

			bz.categoriasPosibles.iconos = res;


		});

		categoriasService.listaCategorias("FUENTE").then(function (res) {

			bz.categoriasPosibles.fuentes = res;


		});

		preferenciasService.listaPreferencias().then(function (res) {

			angular.forEach(res, function (valor) {
				valor.valor = 2;
				bz.datosCombinaciones.preferencias.push(valor);

			});

		});

		/* FUNCIONES */

		/* ETIQUETAS */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.querySearch = etiquetasService.querySearch;
		bz.etiquetas = etiquetasService.loadEtiquetas();
		bz.transformChip = etiquetasService.transformChip;



		bz.enviarComenzar = function (datos, v) {

			inicial = false

			angular.forEach(datos.etiquetasSeleccionadas, (valor, key) => {
				datos.etiquetas.push(valor.name)
			})

			delete datos.etiquetasSeleccionadas;

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

						datos.iconos = res[0];
						datos.fuentes = res[1];

						LS.definir('comenzar', datos);


						if (!v) return;

						navegarFactory.cliente(false, {
							n: datos.nombre
						});


					})
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
		/*
				logosService.mostrarDestacados().then(function (res) {
					bz.destacados = res;
				}).catch(function () {

				}).finally(function () {

				});


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

		*/


	}]);