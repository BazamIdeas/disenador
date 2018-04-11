angular.module("disenador-de-logos")

	.controller("inicioController", ["categoriasService", "preferenciasService", "elementosService", "$stateParams", "$q", "$scope", "$state", "crearLogoFactory", "clientesService", "$mdToast", "$timeout", "logosService", "$base64", "coloresFactory", "landingResolve", "coloresValue", "etiquetasService", "pedidosService",  "$rootScope", function (categoriasService, preferenciasService, elementosService, $stateParams, $q, $scope, $state, crearLogoFactory, clientesService, $mdToast, $timeout, logosService, $base64, coloresFactory, landingResolve, coloresValue, etiquetasService, pedidosService, $rootScope) {

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
			colores: [],
			etiquetasSeleccionadas: []
		};

		/* Etiquetas */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.etiquetasFunciones = etiquetasService;

		etiquetasService.listarEtiquetas()
			.then(function (res) {
				bz.etiquetas = etiquetasService.loadEtiquetas(res.data);
			})
			.catch(function () {});

		categoriasService.listaCategorias("FUENTE")
			.then(function (res) {
				bz.datos.fuentes = res;
			})
			.catch(function () {});

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

				var tags = [];

				angular.forEach(bz.datos.etiquetasSeleccionadas, function(tag){
					tags.push(tag.traduccion.valor);
				})

				var promesaIconos = inicial ? elementosService.listarIniciales(inicial) : elementosService.listarIconosSegunTags(tags, bz.datos.categoria.icono, bz.iconos, 4);
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
			bz.avanzar();
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

		bz.comprarLogo = function (svg, colores, logo, idLogo, v) {

			bz.datosComprar = {
				logo: svg,
				idLogo: idLogo,
				idElemento: logo.icono.idElemento,
				tipo: "Logo y nombre",
				fuentes: {
					principal: logo.fuente.idElemento
				},
				colores: {
					fondo: colores[0],
					icono: colores[1],
					nombre: colores[2]
				},
				planes: bz.planes,
				moneda: bz.moneda
			};

			if (v) {
				return bz.verPrevisualizar = true;
			}
			bz.abrirPlanes = true;
		};

		/* guardar logo */

		
		bz.preGuardarLogo = function(logo){

			if(logo.idLogo){
				return;
			}
	
			if (!clientesService.autorizado()) {
		
				$rootScope.mostrarModalLogin = true;
				$rootScope.callbackLogin = false;
				return;
			}
		

			bz.guardarLogo(logo.cargado, "Logo y nombre", logo.icono.idElemento, logo.fuente.idElemento )

				.then(function(res){

					var indiceLogo = bz.logos.indexOf(logo);

					bz.logos[indiceLogo].idLogo = res;

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Su logo ha sido guardado con exito!",
							clase: "success"
						}
					}));
				})
				.catch(function(){
					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Un error ha ocurrido",
							clase: "danger"
						}
					}));
				});

		};

		bz.completadoGuardar = true;

		bz.guardarLogo = function (logo, tipoLogo, idElemento, idFuentePrincipal) {

			var defered = $q.defer();
			var promise = defered.promise;

			if (bz.completadoGuardar) {

				bz.completadoGuardar = false;

				logosService.guardarLogo(bz.base64.encode(logo), tipoLogo, idElemento,  idFuentePrincipal)

					.then(function (res) {
						defered.resolve(res);
					})
					.catch(function (res) {
						defered.reject(res);
					})
					.finally(function () {
						bz.completadoGuardar = true;
					});

			}

			return promise;

		};

		bz.completadoCompartir = true;
		bz.compartirPorEmail = function(email, logo, valido){
			
			if (!clientesService.autorizado()) {
		
				$rootScope.mostrarModalLogin = true;
				$rootScope.callbackLogin = false;
				return;
			}

			if(valido && bz.completadoCompartir){
				
				bz.completadoCompartir = false;
				
				var defered = $q.defer();
				var emailPromise = defered.promise;

				if(!logo.idLogo){

					bz.guardarLogo(logo.cargado, "Logo y nombre", logo.icono.idElemento, logo.fuente.idElemento)
						.then(function(res){
							logo.idLogo = res;
							logosService.enviarPorEmail(logo.idLogo, email)
								.then(function(){
									$mdToast.show($mdToast.base({
										args: {
											mensaje: "Su logo ha sido enviado!",
											clase: "success"
										}
									}));
	
								})
								.catch(function(){
									$mdToast.show($mdToast.base({
										args: {
											mensaje: "Un error ha ocurrido",
											clase: "danger"
										}
									}));
								})
								.finally(function(){
									defered.resolve(); 
								});
							
						})
						.catch(function(){
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Un error ha ocurrido",
									clase: "danger"
								}
							}));
							defered.resolve();
						});

				} else {
					
					logosService.enviarPorEmail(logo.idLogo, email)
						.then(function(){
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Su logo ha sido enviado!",
									clase: "success"
								}
							}));

						})
						.catch(function(){
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Un error ha ocurrido",
									clase: "danger"
								}
							}));
						})
						.finally(function(){
							defered.resolve();
						});


				}


				emailPromise.finally(function(){
					bz.completadoCompartir = true;
				});

				



			}
		};


	}]);