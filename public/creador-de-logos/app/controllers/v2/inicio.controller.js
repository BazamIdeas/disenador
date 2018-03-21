angular.module("disenador-de-logos")

	.controller("inicioController", ["categoriasService", "preferenciasService", "elementosService", "$stateParams", "$q", "$scope", "$state", "crearLogoFactory", "clientesService", "$mdToast", "$timeout", "logosService", "$base64", "coloresFactory", "landingResolve", "coloresValue", "etiquetasService", "$filter", function (categoriasService, preferenciasService, elementosService, $stateParams, $q, $scope, $state, crearLogoFactory, clientesService, $mdToast, $timeout, logosService, $base64, coloresFactory, landingResolve, coloresValue, etiquetasService, $filter) {

		var bz = this;

		bz.base64 = $base64;

		bz.obtenerColores = coloresFactory;

		bz.colores = coloresValue;

		bz.datos = landingResolve ? landingResolve.datos : {
			nombre: "Mi logo",
			preferencias: [],
			categoria: {
				icono: "",
				fuente: ""
			},
			tags: [],
			colores: [],
			etiquetasSeleccionadas: []
		};

		/* Etiquetas */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.etiquetasFunciones = etiquetasService;

		etiquetasService.listarEtiquetas().then(function (res) {
			bz.etiquetas = etiquetasService.loadEtiquetas(res.data);
		}).catch(function () {});

		categoriasService.listaCategorias("FUENTE").then(function (res) {
			bz.datos.fuentes = res;
		}).catch(function () {});

		bz.coloresIguales = function (color) {

			var coincidencia;

			angular.forEach(bz.datos.colores, function (datosColor) {

				if (angular.equals(color, datosColor)) {
					coincidencia = true;
				}
			});

			return coincidencia;

		};

		bz.jqueryScrollbarOptions = {};

		bz.iconos = [];

		bz.fuentes = [];

		bz.logos = [];

		bz.aprobados = [];

		bz.logoSeleccionado = null;
		bz.logoElegido = null;
		bz.predisenadoSeleccionado = null;

		bz.objetivoEditor = null; //posibles valores 'nuevo' o 'predisenado'

		bz.categoriasPosibles = {
			fuentes: [],
			iconos: []
		};

		bz.preferencias = [];

		categoriasService.listaCategorias("ICONO")
			.then(function (res) {
				bz.categoriasPosibles.iconos = res;
			})
			.catch(function () {});

		categoriasService.listaCategorias("FUENTE")
			.then(function (res) {
				bz.categoriasPosibles.fuentes = res;
			})
			.catch(function () {});



		bz.combinar = function (iconos, fuentes) {

			var logos = crearLogoFactory(iconos, fuentes);

			var cantidadLogos = logos.length;

			while (cantidadLogos) {

				var indiceRandom = Math.floor(Math.random() * (cantidadLogos - 1)) + 0;
				bz.logos.push(logos[indiceRandom]);
				logos.splice(indiceRandom, 1);
				cantidadLogos--;
			}

		};


		if (landingResolve) {
			bz.combinar(landingResolve.iconos, landingResolve.fuentes);
		}


		bz.completado = true;

		bz.solicitarElementos = function (inicial) {

			if (bz.datosForm.$valid && bz.completado) {

				bz.completado = false;

				var promesaIconos = inicial ? elementosService.listarIniciales(inicial) : elementosService.listarIconosSegunTags(bz.datos.tags, bz.datos.categoria.icono, bz.iconos, 4);
				var promesaFuentes = elementosService.listaFuentesSegunPref(bz.datos.categoria.fuente, bz.datos.preferencias, 4);

				$q.all([
						promesaIconos,
						promesaFuentes
					])
					.then(function (res) {

						angular.forEach(res[0], function (icono) {
							bz.iconos.push(icono.idElemento);
						});

						bz.combinar(res[0], res[1]);


					})
					.catch(function () {

					})
					.finally(function () {

						bz.completado = true;

					});

			}

		};

		bz.preAvanzar = function (logo) {


			bz.logoSeleccionado = bz.logos.indexOf(logo);

			/*
			if(color){
				bz.colorIcono = color;		
			}
			*/

			if (!clientesService.autorizado()) {
				bz.mostrarModalLogin = true;
				bz.callback = bz.avanzar;
			} else {
				bz.avanzar();
			}

		};

		bz.avanzar = function () {

			var datos = {
				status: true,
				datos: {
					logo: bz.logos[bz.logoSeleccionado],
					texto: bz.datos.nombre,
					categoria: bz.logos[bz.logoSeleccionado].icono.categorias_idCategoria,
					colores: bz.logos[bz.logoSeleccionado].colores
				}
			};


			$state.go("editor", datos);

		};

		bz.cambio = false;

		/*
		bz.moverse = function(accion) {
			bz.cambio = true;

			$timeout(function(){
				if(accion){
					if(bz.logos[bz.logoElegido.id+1]){
						bz.logoElegido = {svg: bz.logos[bz.logoElegido.id+1].cargado, id: bz.logoElegido.id+1, colores: bz.logos[bz.logoElegido.id+1].colores}
					}
				} else {
					if(bz.logos[bz.logoElegido.id-1]){
						bz.logoElegido = {svg: bz.logos[bz.logoElegido.id-1].cargado, id: bz.logoElegido.id-1, colores: bz.logos[bz.logoElegido.id-1].colores}
					}
				}
			}, 450);


			$timeout(function(){
				bz.cambio = false;
			}, 1000);
			
		}
		*/

	}]);