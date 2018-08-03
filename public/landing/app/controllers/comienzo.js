angular.module("landing")

	.controller("comienzoController", ["$base64", "estaticosLandingValue", "navegarFactory", "etiquetasService", "LS", "$sce", "cookie", "$window", function ($base64, estaticosLandingValue, navegarFactory, etiquetasService,LS, $sce, cookie, $window) {

		var bz = this;

		bz.sce = $sce;

		/* DATOS */

		bz.idiomaActivo = cookie.getCookie('logoLang');

		bz.textos = $window.traducciones.general.landing;

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
			etiquetasSeleccionadas: [],
			colores: [],
			nombre: bz.textos.secciones.seccion_uno.formulario.nombre.placeholder
		}

		bz.logosPredisenados = [];

		bz.cambiarIdioma = function (idioma) {
			idiomaCookie = cookie.getCookie('logoLang');

			if (bz.idiomaActivo != idiomaCookie) {
				document.cookie = "logoLang=" + idioma +'; Path=/';
				$('body').animate({
					scrollTop: 0
				}, 1000);
				location.reload();
			} else {
				return;
			};
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
			if (!v) return;

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

			var tags_saltos = {};

			angular.forEach(datos.etiquetasSeleccionadas, function (tag) {

				var tag_existe = tags_saltos[tag.traducciones[0].valor];

				if (tag_existe === undefined) {
					tags_saltos[tag.traducciones[0].valor] = 0;
				}

			});

			angular.forEach(datos.etiquetasSeleccionadas, function (valor) {
				datos.etiquetasParaBusqueda.push(valor.traducciones[0].valor)
			})

			LS.definir('comenzar', datos);
			navegarFactory.cliente(false);
		};

	}]);