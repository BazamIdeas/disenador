angular.module("disenador-de-logos")

	.controller("inicioController", ["categoriasService", "elementosService", "$q", "$state", "crearLogoFactory", "clientesService", "$mdToast", "logosService", "$base64", "coloresFactory", "landingResolve", "coloresPaletteValue", "etiquetasService", "$rootScope", "$location", "Socialshare", "disenadorService", "langFactory", function (categoriasService, elementosService, $q, $state, crearLogoFactory, clientesService, $mdToast, logosService, $base64, coloresFactory, landingResolve, coloresPaletteValue, etiquetasService,  $rootScope, $location, Socialshare, disenadorService, langFactory) {

		var bz = this;

		bz.lang = langFactory.langsEstadoActual();

		bz.base64 = $base64;

		bz.obtenerColores = function(coloresArray){
			return coloresFactory(angular.copy(coloresArray));
		};

		bz.colorRandom =  function (largoArray) {
			var i = Math.floor(Math.random() * largoArray) + 0;
			return i;
		};

		bz.palettes = coloresPaletteValue;

		if (landingResolve) {
			bz.palettesCopy = landingResolve.palettesCopy;
		}

		bz.datos = landingResolve ? landingResolve.datos : {
			nombre: bz.lang.formulario.nombre.value,
			preferencias: [],
			categoria: {
				icono: "",
				fuente: ""
			},
			etiquetasSeleccionadas: []
		};

		bz.urlCompartir = $location.port() != "80" ? $location.protocol() + "://" + $location.host() + ":" + $location.port() : $location.protocol() + "://" + $location.host();


		bz.completadoCompartirSocial = true;
		bz.compartir = function(provider, logo) {
			if(disenadorService.autorizado()) {
				return;
			}

			if (!clientesService.autorizado()) {

				$rootScope.mostrarModalLogin = true;
				$rootScope.callbackLogin = false;
				return;
			}

			if(bz.completadoCompartirSocial){
				
				bz.completadoCompartirSocial = false;

				var defered = $q.defer();
				var compartirPromise = defered.promise;

				if (!logo.idLogo) {
					
					bz.guardarLogo(logo.cargado, logo.icono.idElemento, "Logo y nombre", bz.datos.categoria.icono, logo.fuente.idElemento)
						.then(function (res) {
							logo.idLogo = res;

							var unix = Date.now();

							var attrs = {
								socialshareUrl: bz.urlCompartir + $location.path() + "?idLogo=" + logo.idLogo + "&unix=" + unix
							};

							switch (provider) {
							case "twitter":
								attrs.socialshareHashtags = "Liderlogo";
								break;
					
							case "pinterest":
								attrs.socialshareMedia = bz.urlCompartir+"/app/logo/compartido/"+logo.idLogo; attrs.socialshareText = "Pinterest";
								break;
							}

							Socialshare.share({
								"provider": provider,
								"attrs": attrs
							});

						})
						.catch(function () {
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Un error ha ocurrido",
									clase: "danger"
								}
							}));
						})
						.finally(function () {
							defered.resolve();
						});

				} else{
					
					var unix = Date.now();

					var attrs = {
						socialshareUrl: bz.urlCompartir + $location.path() + "?idLogo=" + logo.idLogo + "&unix=" + unix
					};

					switch (provider) {
					case "twitter":
						attrs.socialshareHashtags = "Liderlogo";
						break;
					
					case "pinterest":
						attrs.socialshareMedia = bz.urlCompartir+"/app/logo/compartido/"+logo.idLogo; attrs.socialshareText = "Pinterest";
						break;
					}

					Socialshare.share({
						"provider": provider,
						"attrs": attrs
					});

					defered.resolve();
				}

				compartirPromise.finally(function(){
					bz.completadoCompartirSocial = true;
				});

			}
			

		};


		bz.compartirPorEmailUrl = function () {
			if(disenadorService.autorizado()) {
				return;
			}

			var datosFormat = angular.copy(bz.datos);

			angular.forEach(datosFormat.etiquetasSeleccionadas, function(valor){
				if(valor.$$hashKey){
					delete valor.$$hashKey;
				}
			});

			delete datosFormat.fuentes;
			delete datosFormat.colores;

			var datos = {
				datos: datosFormat,
				palettesCopy: bz.palettesCopy,
				logoCompartido: true
			};

			var url = bz.urlCompartir + $location.path() + "?datos="+ encodeURI(angular.toJson(datos));

			return url;
		};

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

		categoriasService.listaCategorias("ICONO").then(function (res) {
			bz.categoriasPosibles.iconos = res;
		}).catch(function () {});

		categoriasService.listaCategorias("FUENTE").then(function (res) {
			bz.categoriasPosibles.fuentes = res;
		}).catch(function () {});

		bz.combinar = function (iconos, fuentes) {

			bz.datos.colores = [];

			angular.forEach(bz.palettesCopy, function (palettes, indicePalettes) {
				angular.forEach(palettes, function (palette, indicePalette) {
					if (palette) {
						bz.datos.colores.push(bz.palettes[indicePalettes][indicePalette]);
					}
				});
			});

			var logos = crearLogoFactory(iconos, fuentes);

			bz.logos = logos;
			/*
			var cantidadLogos = logos.length;
			
			while (cantidadLogos) {

				var indiceRandom = Math.floor(Math.random() * (cantidadLogos - 1)) + 0;
				bz.logos.push(logos[indiceRandom]);
				logos.splice(indiceRandom, 1);
				cantidadLogos--;
			}*/
			/*
			angular.element(".contenedor-principal > div").animate({
				scrollTop: 0
			}, 1000);*/

		};

		bz.completado = true;

		// Si no es un logo compartido

		if (landingResolve && !landingResolve.logoCompartido && !landingResolve.paginaCategoria){

				bz.combinar(landingResolve.iconos, landingResolve.fuentes);
		}

		var tags_saltos = {};

		bz.solicitarElementos = function (inicial) {

			if (!bz.completado) {
				return;
			}

			if (bz.datosForm && !bz.datosForm.$valid && !landingResolve.logoCompartido){
				return;
			} 

			bz.completado = false;

			angular.forEach(tags_saltos, function (tag_salto, indexSalto) {
			
				var remover_tag = true;

				angular.forEach(bz.datos.etiquetasSeleccionadas, function (tag) {

					if(indexSalto == tag.traducciones[0].valor){
						remover_tag = false;
					}

				})

				if(remover_tag){
					delete tags_saltos[indexSalto];
				}


			})

			angular.forEach(bz.datos.etiquetasSeleccionadas, function (tag) {

				var tag_existe = tags_saltos[tag.traducciones[0].valor];

				if(tag_existe === undefined) {
					tags_saltos[tag.traducciones[0].valor] = 0;
				}

			});

			var promesaIconos = elementosService.listarIconosSegunTags(tags_saltos);
			var promesaIconosDescatados = logosService.obtenerDestacados();
			var promesaFuentes = elementosService.listaFuentesSegunPref(bz.datos.categoria.fuente, bz.datos.preferencias, 12);

			$q.all([
				promesaIconos,
				promesaFuentes,
				promesaIconosDescatados
			])
				.then(function (res) {
					var tags = res[0].tags;
					var iconosNoun = res[0].iconos;
					var fuentes = res[1];
					var iconosDestacados = res[2];

					angular.forEach(res[0].iconos, function (icono) {
						bz.iconos.push(icono.idElemento);
					});

					//TODO: CALCULO DE LOGOS 
					var logosMezclados = [];
					var cantidadNoun = iconosNoun.length;

				
					if( cantidadNoun >= 6){

						iconosNoun = iconosNoun.slice(0,6);
						iconosDestacados = iconosDestacados.slice(0,6);
						logosMezclados = iconosNoun.concat(iconosDestacados);

					} else {
						
						var logosFaltantes = (12 - cantidadNoun);
						iconosDestacados = iconosDestacados.slice(0,logosFaltantes);
						logosMezclados = iconosNoun.concat( iconosDestacados);
						
					}


					var logosMezcladosRandom = (function(array) {
						var currentIndex = array.length, temporaryValue, randomIndex;
					  
						// While there remain elements to shuffle...
						while (0 !== currentIndex) {
					  
						  // Pick a remaining element...
						  randomIndex = Math.floor(Math.random() * currentIndex);
						  currentIndex -= 1;
					  
						  // And swap it with the current element.
						  temporaryValue = array[currentIndex];
						  array[currentIndex] = array[randomIndex];
						  array[randomIndex] = temporaryValue;
						}
					  
						return array;
					})(logosMezclados);
					  


					var iconos_raw = logosMezcladosRandom;
					var fuentes_raw = fuentes;

					tags_saltos = tags;

					/*
					if(!iconos_raw.length) {
						$mdToast.show($mdToast.base({
							args: {
								mensaje: "La búsqueda no produjo resultados",
								clase: "success"
							}
						}));
						
						return;
					}*/

					bz.combinar(iconos_raw, fuentes_raw);

				})
				.catch(function () {
					//console.log(res)
				})
				.finally(function () {

					bz.completado = true;

				});

			

		};

		// Si es un logo compartido 
		if (landingResolve && landingResolve.logoCompartido || landingResolve.paginaCategoria) {
			bz.solicitarElementos();
		}

		bz.preAvanzar = function (logo) {
			bz.logoSeleccionado = bz.logos.indexOf(logo);
			bz.avanzar();
		};

		bz.avanzar = function () {


			var logoSeleccionado = angular.copy(bz.logos[bz.logoSeleccionado]);

			if(logoSeleccionado.idLogo){
				logoSeleccionado.icono.svg = bz.base64.encode(logoSeleccionado.cargado); 

			}

			var datos = {
				status: true,
				datos: {
					logo: logoSeleccionado,
					texto: bz.datos.nombre,
					categoria: logoSeleccionado.icono.categorias_idCategoria,
					colores: [logoSeleccionado.colores[0], logoSeleccionado.colores[logoSeleccionado.random]]
				}
			};

			$state.go("editor", datos);

		};

		bz.comprarLogo = function (svg, colores, logo, idLogo, v) {

			if(disenadorService.autorizado()) {
				return;
			}

			bz.datosComprar = {
				logo: svg,
				idLogo: idLogo,	
				noun: logo.icono.idElemento,
				idCategoria: bz.datos.categoria.icono,
				tipo: "Logo y nombre",
				fuentes: {
					principal: logo.fuente.idElemento
				},
				colores: {
					fondo: colores[1],
					icono: colores[0],
					nombre: colores[0]
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


		bz.preGuardarLogo = function (logo) {

			if(disenadorService.autorizado()) {
				return;
			}

			if (logo.idLogo) {
				return;
			}

			if (!clientesService.autorizado()) {

				$rootScope.mostrarModalLogin = true;
				$rootScope.callbackLogin = false;
				return;
			}

			bz.guardarLogo(logo.cargado, logo.icono.idElemento, "Logo y nombre", bz.datos.categoria.icono, logo.fuente.idElemento)

				.then(function (res) {

					var indiceLogo = bz.logos.indexOf(logo);

					bz.logos[indiceLogo].idLogo = res;

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Su logo ha sido guardado con exito!",
							clase: "success"
						}
					}));
				})
				.catch(function () {
					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Un error ha ocurrido",
							clase: "danger"
						}
					}));
				});

		};

		bz.completadoGuardar = true;

		
		bz.guardarLogo = function (logo, noun, tipoLogo, idCategoria, idFuentePrincipal) {

			var defered = $q.defer();
			var promise = defered.promise;

			if (bz.completadoGuardar) {

				bz.completadoGuardar = false;
				
				logosService.guardarLogo(bz.base64.encode(logo), noun, tipoLogo, idCategoria, idFuentePrincipal)

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
		bz.compartirPorEmail = function (email, logo, valido) {

			if(disenadorService.autorizado()) {
				return;
			}

			if (!clientesService.autorizado()) {

				$rootScope.mostrarModalLogin = true;
				$rootScope.callbackLogin = false;
				return;
			}

			if (valido && bz.completadoCompartir) {

				bz.completadoCompartir = false;

				var defered = $q.defer();
				var emailPromise = defered.promise;

				if (!logo.idLogo) {
					
					bz.guardarLogo(logo.cargado, logo.icono.idElemento, "Logo y nombre", bz.datos.categoria.icono, logo.fuente.idElemento)
						.then(function (res) {
							logo.idLogo = res;
							var url = bz.compartirPorEmailUrl();

							logosService.enviarPorEmail(logo.idLogo, email, url)
								.then(function () {
									$mdToast.show($mdToast.base({
										args: {
											mensaje: "Su logo ha sido enviado!",
											clase: "success"
										}
									}));

								})
								.catch(function () {
									$mdToast.show($mdToast.base({
										args: {
											mensaje: "Un error ha ocurrido",
											clase: "danger"
										}
									}));
								})
								.finally(function () {
									defered.resolve();
								});

						})
						.catch(function () {
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Un error ha ocurrido",
									clase: "danger"
								}
							}));
							defered.resolve();
						});

				} else {
					var url = bz.compartirPorEmailUrl();
					logosService.enviarPorEmail(logo.idLogo, email, url)
						.then(function () {
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Su logo ha sido enviado!",
									clase: "success"
								}
							}));

						})
						.catch(function () {
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Un error ha ocurrido",
									clase: "danger"
								}
							}));
						})
						.finally(function () {
							defered.resolve();
						});


				}


				emailPromise.finally(function () {
					bz.completadoCompartir = true;
				});


			}
		};

		/* Etiquetas */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.etiquetasFunciones = etiquetasService;

		etiquetasService.listarEtiquetas().then(function (res) {
			bz.etiquetas = etiquetasService.loadEtiquetas(res.data);
		}).catch(function () {
			//console.log(res)
		});

	}]);