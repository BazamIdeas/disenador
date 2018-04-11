angular.module("landing")

	.controller("comienzoController", ["$base64", "estaticosLandingValue", "logosService", "navegarFactory", "clientesService", "arrayToJsonMetasFactory", "guardarLogoFactory", "categoriasService", "elementosService", "pedidosService", "etiquetasService", "preferenciasService", "$q", "LS", function ($base64, estaticosLandingValue, logosService, navegarFactory, clientesService, arrayToJsonMetasFactory, guardarLogoFactory, categoriasService, elementosService, pedidosService, etiquetasService, preferenciasService, $q, LS) {

		var bz = this;

		/* DATOS */
		bz.navegar = navegarFactory;
		bz.estaticos = estaticosLandingValue;
		bz.preAct = 0;
		bz.base64 = $base64;
		bz.opcionesCarousel = {
			autoPlay: true,
			autoplaySpeed: 5000
		};
		bz.categoriasPosibles = {
			fuentes: [],
			iconos: [],
			colores: [
		["#FFF9D6", "#FFED7E", "#7F721C "],
		["#FBFFD3", "#F3FF7B", "#767F1B "],
		["#FFE7A4", "#FFD458", "#7F6A2F"],

		["#FFDAB8", "#FFB26C", "#7F4917"],
		["#FFD6C6", "#FF9F7A", "#7F3A1E "],
		["#FFCDC9", "#FF857C", "#7F2620"],
		["#FF9193", "#FF393D", "#7F0A0C"],

		["#FFC1E9", "#FF75CE", "#7F1C5C"],
		["#FFBDFA", "#FF71F5", "#7F1A78 "],
		["#F0BBFF", "#DF6FFF", "#69197F"],
		["#D9C3FF", "#A977FF", "#411D7F"],

		["#CFCAFF", "#897EFF", "#29207F"],
		["#D3D8FF", "#8794FF", "#252F7F"],
		["#D8E3FF", "#8BACFF", "#17357F"],
		["#C9E0FF", "#7CB4FF", "#103F7F"],

		["#D1F3FF", "#84DFFF", "#13637F"],
		["#CDFFEC", "#80FFCF", "#407F67"],
		["#DBFFCD", "#A5FF80", "#547F43 "]
			]
		};
		bz.datosCombinaciones = {
			preferencias: [],
			etiquetasSeleccionadas: [],
			colores: []
		}

		/* Etiquetas */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.etiquetasFunciones = etiquetasService;

		bz.peticion = true;

		bz.promesas = [
			etiquetasService.listarEtiquetas(),
			categoriasService.listaCategorias("ICONO"),
			categoriasService.listaCategorias("FUENTE"),
			preferenciasService.listaPreferencias()
		]

		$q.all(bz.promesas).then(function (res) {
			bz.etiquetas = etiquetasService.loadEtiquetas(res[0].data);
			bz.categoriasPosibles.iconos = res[1];
			bz.categoriasPosibles.fuentes = res[2];

			angular.forEach(res[3], function (valor) {
				valor.valor = 2;
				bz.datosCombinaciones.preferencias.push(valor);
			});
		}).catch(function (res) {
			console.log(res)
		}).finally(function () {
			bz.peticion = false;
		})

		/* FUNCIONES */

		bz.enviarComenzar = function (datos, v) {

			inicial = false

			if (v) {
				bz.peticion = true;
				datos.etiquetasParaBusqueda = [];

				angular.forEach(datos.etiquetasSeleccionadas, function (valor) {
					datos.etiquetasParaBusqueda.push(valor.traduccion.valor)
				})

				bz.datosIconos = {
					tags: datos.etiquetasParaBusqueda,
					categoria: datos.idCategoria,
					preferencias: datos.preferencias,
					tipo: "ICONO",
					limit: 4
				};

				bz.datosFuentes = {
					categoria: datos.idFuente,
					preferencias: datos.preferencias,
					tipo: "FUENTE",
					limit: 4
				};

				var promesaIconos = inicial ? elementosService.listarIniciales(inicial, bz.datosIconos) : elementosService.listarIconosSegunTags(bz.datosIconos);

				var promesaFuentes = elementosService.listaFuentesSegunPref(bz.datosFuentes);

				$q.all([
						promesaIconos,
						promesaFuentes
					])
					.then(function (res) {

						datos.iconos = res[0];
						datos.fuentes = res[1];

						LS.definir('comenzar', datos);

						if (!v) return;

						navegarFactory.cliente(false, {
							n: datos.nombre
						});


					}).finally(function (res) {
						bz.peticion = false;
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