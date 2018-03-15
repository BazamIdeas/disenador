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
		}
		bz.categoriasPosibles = {
			fuentes: [],
			iconos: [],
			colores: [
				['#FA198B', '#B91372', '#6B0F1A'],
				['#B91372', '#B91372', '#6B0F1A'],
				['#6B0F1A', '#B91372', '#6B0F1A']
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

		/* ETIQUETAS */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.querySearch = etiquetasService.querySearch;
		bz.etiquetas = etiquetasService.loadEtiquetas();
		bz.transformChip = etiquetasService.transformChip;

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

						LS.definir('comenzar', datosAenviar);

						if (!v) return;

						navegarFactory.cliente(false, {
							n: datosAenviar.nombre
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