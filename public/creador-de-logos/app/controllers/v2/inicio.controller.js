angular.module("disenador-de-logos")

	.controller("inicioController", ["categoriasService", "preferenciasService", "elementosService", "$stateParams", "$q", "$scope", "$state", "crearLogoFactory", "clientesService", "$mdToast", "$timeout", "logosService", "$base64", "coloresFactory", "landingResolve",function (categoriasService, preferenciasService, elementosService, $stateParams, $q, $scope, $state, crearLogoFactory, clientesService, $mdToast, $timeout, logosService, $base64, coloresFactory, landingResolve) {

		var bz = this;

		bz.base64 = $base64;

		bz.obtenerColores = coloresFactory;

		bz.datos = landingResolve ? landingResolve.datos : {
			nombre: "Mi logo",
			preferencias: [],
			categoria: {
				icono: "",
				fuente: ""
			},
			tags: [],
			colores: []

		};

		bz.jqueryScrollbarOptions = {};

		bz.iconos = [];

		bz.fuentes = [];

		bz.logos = [];

		bz.aprobados = [];

		bz.logoSeleccionado = null;
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
			.catch(function(){});

		categoriasService.listaCategorias("FUENTE")
			.then(function (res) {
				bz.categoriasPosibles.fuentes = res;
			})
			.catch(function(){});


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

						angular.forEach(res[0], function(icono){
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


		bz.combinar = function (iconos, fuentes) {


			var logos = crearLogoFactory(iconos, fuentes);

			var cantidadLogos = logos.length;
			
			while(cantidadLogos){

				var indiceRandom = Math.floor(Math.random() * (cantidadLogos - 1)) + 0 
				bz.logos.push(logos[indiceRandom]);
				logos.splice(indiceRandom, 1);
				cantidadLogos--;
			}
			
		};

		bz.preAvanzar = function(indiceLogo, color){

			if(indiceLogo){
				bz.logoSeleccionado = indiceLogo;
			}

			if(color){
				bz.colorIcono = color;		
			}

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
					categoria: bz.logos[bz.logoSeleccionado].icono.categorias_idCategoria
				}
			};

			if(bz.colorIcono){
				datos.datos.color = bz.colorIcono;
			}				

			$state.go("editor", datos);

		};

	}]);
