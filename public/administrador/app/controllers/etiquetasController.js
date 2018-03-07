angular.module("administrador")

	.controller("etiquetasController", ["$state", "$mdSidenav", "$scope", "administrarService", "notificacionService", "$base64", "etiquetasService", "categoriasService", function ($state, $mdSidenav, $scope, administrarService, notificacionService, $base64, etiquetasService, categoriasService) {

		var bz = this;

		/* DATOS */

		bz.logos = [];
		bz.disenadores = [];
		bz.logosDisenador = [];
		bz.cats = [];
		bz.vista = 0;

		/* LISTAR */

		bz.listarCategorias = function (tipoCategoria) {
			bz.peticion = true;
			bz.cats = [];

			datos = {
				tipo: 'ICONO'
			}

			categoriasService.listarCategorias(datos).then(function (res) {

				if (res == undefined) {
					return;
				}

				bz.cats = res.data;

			}).finally(function () {
				bz.peticion = false;
			})
		}

		bz.listarCategorias();

		/***************************/
		/**********LOGOS***********/
		/***************************/

		bz.listarLogos = function (id) {

			datos = {
				idCategoria: id,
				tipo: 'ICONO'
			};

			bz.logos = [];
			bz.peticion = true;
			etiquetasService.listarLogos(datos).then(function (res) {
				bz.logos = res.data;
				bz.listaL = !bz.listaL;
			}).finally(function () {
				bz.peticion = false;
			})
		};


		bz.verLogo = function (logo, v) {
			bz.logoVisualizar = bz.base64(logo);
			bz.lda = v ? true : false;
			bz.modfire = false;
			bz.modInit = false;
			bz.vista = 3;
		};

		bz.mostrarPop = function () {
			bz.vista = bz.lda ? 1 : 0;
		};

		/* ETIQUETAS */

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

		/* UTILIDADES */

		bz.modFun = function (id) {
			bz.modfire = id;
			bz.modInit = !bz.modInit;

		};

		bz.base64 = function (icono) {

			return $base64.decode(icono);

		};

		function formatDate(date) {
			var d = new Date(date),
				month = "" + (d.getMonth() + 1),
				day = "" + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) month = "0" + month;
			if (day.length < 2) day = "0" + day;

			return [year, month, day].join("-");
		}
	}]);