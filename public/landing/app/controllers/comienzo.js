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
				["#DDA8BC", "#8D4B97", "#007688"],
				["#EEE3F2", "#9D4E98", "#9A3089 "],
				["#B785BA", "#363F4C", "#0F2F30 "],
				["#BFC1BF", "#65246F", "#A01874"],

				["#FFE5BE", "#63380E", "#06672F"],
				["#EEF2CA", "#49AF57", "#E8452F "],
				["#FFFDF6", "#B01919", "#911913"],
				["#F6EF99", "#A71916", "#D92B15"],

				["#FACDC6", "#B9163A", "#E40921"],
				["#E9F5F4", "#0B5126", "#004C46 "],
				["#D6EADD", "#002F2F", "#097533"],
				["#D0D3EC", "#7D388D", "#A31569"],

				["#FCD6B5", "#443D17", "#846816"],
				["#ADD8C5", "#0E0D08", "#293377"],
				["#C2E6FB", "#028374", "#5F2160"],
				["#FDF083", "#0078B3", "#212C56"],
				
				["#CDE9F5", "#0078B3", "#007259"],
				["#DCEEFC", "#263470", "#B21921"],
				["#E1AED1", "#E40921", "#A51916"],
				["#E6F2EA", "#2FA836", "#4756A2"]
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