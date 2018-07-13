angular.module("landing")

	.controller("comienzoController", ["$base64", "estaticosLandingValue", "logosService", "navegarFactory", "clientesService", "arrayToJsonMetasFactory", "guardarLogoFactory", "categoriasService", "elementosService", "pedidosService", "etiquetasService", "preferenciasService", "$q", "LS", "$sce", "$interval", "idiomaService", function ($base64, estaticosLandingValue, logosService, navegarFactory, clientesService, arrayToJsonMetasFactory, guardarLogoFactory, categoriasService, elementosService, pedidosService, etiquetasService, preferenciasService, $q, LS, $sce, $interval, idiomaService) {

		var bz = this;

		bz.sce = $sce;

		/* DATOS */
		bz.idiomaActivo = 'es';
		bz.navegar = navegarFactory;
		bz.estaticos = estaticosLandingValue;
		bz.preAct = 1;
		bz.base64 = $base64;
		bz.opcionesCarousel = {
			autoPlay: true,
			autoplaySpeed: 5000
		};
		bz.categoriasPosibles = {
			fuentes: [],
			iconos: []
		};
		bz.datosCombinaciones = {
			preferencias: [],
			etiquetasSeleccionadas: [],
			colores: []
		}

		bz.logosPredisenados = [];

		bz.cambiarIdioma = function(idioma){
			idiomaService.idioma(bz.idiomaActivo).then(function(res) {
				console.log('idioma cambiado: ', res);
			})
		};

		bz.scrollTop = function () {
			var top = angular.element('#comienzo').offset().top;
			angular.element('body').animate({
				scrollTop: top
			}, 1000);
		}

		/* Etiquetas */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.etiquetasFunciones = etiquetasService;
		bz.peticion = true;

		preferenciasService.listaPreferencias().then(function (res) {
			angular.forEach(res, function (valor) {
				valor.valor = 2;
				bz.datosCombinaciones.preferencias.push(valor);
			});
		})

		etiquetasService.listarEtiquetas().then(function (res) {

			if (res != undefined) {
				bz.etiquetas = etiquetasService.loadEtiquetas(res.data);
			}

		}).catch(function (res) {
			//console.log(res)
		}).finally(function () {
			bz.peticion = false;
		})

		/* FUNCIONES */

		bz.enviarComenzar = function (datos, v) {

			var inicial = false

			if (v) {
				bz.peticion = true;
				datos.etiquetasParaBusqueda = [];
				datos.palettesCopy = bz.palettesCopy;

				angular.forEach(bz.palettesCopy, function (palettes, indicePalettes) {
					angular.forEach(palettes, function (palette, indicePalette) {

						if (palette) {
							datos.colores.push(bz.palettes[indicePalettes][indicePalette]);
						}

					});

				});

				angular.forEach(datos.etiquetasSeleccionadas, function (valor) {
					datos.etiquetasParaBusqueda.push(valor.traduccion.valor)
				})

				bz.datosIconos = {
					tags: datos.etiquetasParaBusqueda,
					categoria: datos.idCategoria,
					preferencias: datos.preferencias,
					tipo: "ICONO",
					limit: 12
				};

				bz.datosFuentes = {
					categoria: datos.idFuente,
					preferencias: datos.preferencias,
					tipo: "FUENTE",
					limit: 12
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

						navegarFactory.cliente(false);


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