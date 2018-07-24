angular.module("disenador-de-logos")

	.controller("editorController", ["$scope", "$base64", "categoriasService", "logosService", "clientesService", "historicoResolve", "$rootScope", "$mdToast", "elementosService", "$q", "pedidosService", "fontService", "etiquetasService", "disenadorService", function ($scope, $base64, categoriasService, logosService, clientesService, historicoResolve, $rootScope, $mdToast, elementosService, $q, pedidosService, fontService, etiquetasService, disenadorService) {

		var bz = this;

		bz.base64 = $base64;
		bz.cuadricula = false;
		bz.contenedores = {
			busquedaIconos: false,
			borradores: false,
			fuentes: false
		};

		bz.colorFondo = historicoResolve.colores ? historicoResolve.colores[1] : "rgb(243, 243, 243)";
		bz.colorFondoAnterior = bz.colorFondo;
		bz.colorTexto = historicoResolve.colores ? historicoResolve.colores[0] : "#000";
		bz.colorEslogan = "#000";
		bz.colorIcono = historicoResolve.colores ? historicoResolve.colores[0] : "#000";
		bz.svgFinal = "";
		bz.disenador = {
			searchText: ""
		};

		bz.datosDisenador = {
			etiquetasSeleccionadas: []
		};


		bz.jqueryScrollbarOptions = {};

		bz.logo = historicoResolve.logo;

		bz.categoriaIcono = historicoResolve.idCategoria;

		if (!historicoResolve.idLogoGuardado && !historicoResolve.idLogoPadre) { //si no es un logo guardado

			bz.logo.texto = historicoResolve.texto;
			bz.categoria = historicoResolve.logo.icono.categorias_idCategoria;

		} else if (historicoResolve.idLogoGuardado) { // si es un logo previamente guardado

			bz.logo.idLogo = historicoResolve.idLogoGuardado;

		} else if (historicoResolve.idLogoPadre) {

			bz.idLogoPadre = historicoResolve.idLogoPadre;

		}

		/* CATEGORIAS EXISTENTES */

		bz.categoriasPosibles = [];

		categoriasService.listaCategorias("ICONO").then(function (res) {

			angular.forEach(res, function (valor) {

				bz.categoriasPosibles.push(valor);

			});

		});

		categoriasService.listaCategorias("FUENTE")
			.then(function (res) {
				bz.fuentesCategorias = res;
			})
			.catch(function () { 
				
			});


		bz.categoriasHijasPosibles = [];

		categoriasService.listarCategoriasElementosHijas()
			.then(function(res){
				bz.categoriasHijasPosibles = res;
			})
			.catch(function(){

			})


		elementosService.listarFuentes().then(function (res) {

			bz.fuentes = res;

			fontService.agregarGeneral(bz.fuentes);

			if (historicoResolve.idLogoGuardado || historicoResolve.idLogoPadre) { // si es un logo previamente guardado

				angular.forEach(bz.fuentes, function (valor) {

					if (valor.idElemento == historicoResolve.fuentes.principal) {

						bz.logo.fuente = {
							url: valor.url,
							nombre: valor.nombre
						};

					}

					if (valor.idElemento == historicoResolve.fuentes.eslogan) {

						bz.logo.fuenteEslogan = {
							url: valor.url,
							nombre: valor.nombre
						};

						bz.esloganActivo = true;

					}

				});

			}

		});

		bz.preGuardarLogo = function (logo, noun, tipoLogo, idCategoria, regresar) {

			var clienteAutorizado = clientesService.autorizado();
			var disenadorAutorizado = disenadorService.autorizado();

			// Verificar si el usuario que esta logueado
			if (!clienteAutorizado && !disenadorAutorizado) {

				$rootScope.mostrarModalLogin = true;
				$rootScope.callback = false;
				return;
			}

			if (disenadorAutorizado) {
				bz.mostrarFormDisenador = true;
				return;
			}
			
			bz.guardarLogo(logo, noun, tipoLogo, idCategoria, regresar);
		};

		bz.completadoGuardar = true;

		bz.guardarLogo = function (logo, noun, tipoLogo, idCategoria, regresar) {
			console.log(idCategoria)

			var defered = $q.defer();
			var promise = defered.promise;

			if (bz.completadoGuardar) {

				bz.completadoGuardar = false;

				var fuentesId = {
					principal: null,
					eslogan: null
				};

				angular.forEach(bz.fuentes, function (fuente) {

					if (bz.logo.fuente && (bz.logo.fuente.url == fuente.url)) {

						fuentesId.principal = fuente.idElemento;

					}

					if (bz.logo.fuenteEslogan && (bz.logo.fuenteEslogan.url == fuente.url)) {

						fuentesId.eslogan = fuente.idElemento;

					}
				});

				if (!bz.logo.idLogo) { //si nunca se ha guardado este logo

					logosService.guardarLogo(bz.base64.encode(logo), noun, tipoLogo, idCategoria, fuentesId.principal, fuentesId.eslogan)

						.then(function (res) {

							bz.logo.idLogo = res;

							if (!regresar) {
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Su logo ha sido guardado con exito!",
										clase: "success"
									}
								}));
							} else {
								defered.resolve(res);
							}

						}).catch(function (res) {

							if (!regresar) {
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Un error ha ocurrido",
										clase: "danger"
									}
								}));
							} else {
								defered.reject(res);
							}

						}).finally(function () {

							bz.completadoGuardar = true;

						});
				} else { //si es un logo guardado

					logosService.modificarLogo(bz.base64.encode(logo), bz.logo.idLogo, fuentesId.principal, fuentesId.eslogan)
						.then(function (res) {

							if (!regresar) {
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Su logo ha sido guardado con exito!",
										clase: "success"
									}
								}));
							} else {
								return defered.resolve(res);
							}

						}).catch(function (res) {

							if (!regresar) {
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Un error ha ocurrido",
										clase: "danger"
									}
								}));
							} else {
								defered.reject(res);
							}

						}).finally(function () {

							bz.completadoGuardar = true;

						});

				}
			}

			return promise;

		};


		/****** Guardar Logo del Disenador  ******/
		bz.guardarLogoDisenador = function (logo, noun, tipoLogo, idCategoria, tags, alt) {
			

			if (!bz.completadoGuardar || !bz.disenadorGuardarForm.$valid) {
				return;
			}

			if(!tags.length) return;

			bz.completadoGuardar = false;

			var fuentesId = {
				principal: "",
				eslogan: ""
			};

			angular.forEach(bz.fuentes, function (fuente) {

				if (bz.logo.fuente && (bz.logo.fuente.url == fuente.url)) {

					fuentesId.principal = fuente.idElemento;

				}

				if (bz.logo.fuenteEslogan && (bz.logo.fuenteEslogan.url == fuente.url)) {

					fuentesId.eslogan = fuente.idElemento;

				}
			});

			logosService.guardarLogo(bz.base64.encode(logo), noun, tipoLogo, idCategoria, fuentesId.principal, fuentesId.eslogan, tags, alt).then(function (etiquetasGuardadas) {

				if (etiquetasGuardadas) {

					angular.forEach(etiquetasGuardadas, function (element) {
						bz.etiquetas.push({ _id: element._id, traducciones: [{ valor: element.tag, _lowername: element.tag.toLowerCase() } ]});
					})

					bz.etiquetas = etiquetasService.loadEtiquetas(bz.etiquetas);
				}

				$mdToast.show($mdToast.base({
					args: {
						mensaje: "Enviaste un logo a revision!",
						clase: "success"
					}
				}));

			}).catch(function (e) {

				console.log(e)
				$mdToast.show($mdToast.base({
					args: {
						mensaje: "Un error ha ocurrido",
						clase: "danger"
					}
				}));


			}).finally(function () {

				bz.completadoGuardar = true;

			});

		}


		bz.activarCuadricula = function () {

			bz.cuadricula = !bz.cuadricula;

			if (bz.cuadricula) {
				bz.colorFondoAnterior = bz.colorFondo;
				bz.colorFondo = 'transparent';
			} else {
				bz.colorFondo = bz.colorFondoAnterior;
			}

		};

		bz.buscarPlanes = function () {

			if (disenadorService.autorizado()) {
				return;
			}

			$rootScope.$broadcast("editor:planes", true);

		};

		$scope.$on("directiva:planes", function (evento, datos) {

			var idFuente;
			var idFuenteEslogan;

			angular.forEach(bz.fuentes, function (valor) {

				if (valor.url == bz.logo.fuente.url) {

					idFuente = valor.idElemento;

				}

				if (bz.logo.fuenteEslogan && (valor.url == bz.logo.fuenteEslogan.url)) {

					idFuenteEslogan = valor.idElemento;
				}

			});

			bz.datosComprar = {
				logo: datos.svg,
				idLogo: null,
				noun: bz.logo.icono.idElemento,
				idCategoria: bz.categoria,//FIXME: UNDEFINED
				tipo: "Logo y nombre",
				fuentes: {
					principal: idFuente,
					eslogan: idFuenteEslogan
				},
				colores: datos.colores,
				planes: bz.planes,
				moneda: bz.moneda,
				editor: true
			};

			/*if (bz.idLogoPadre) {
				bz.datosComprar.idPadre = bz.idLogoPadre;
			}*/

			if (bz.logo.idLogo) {
				bz.datosComprar.idLogo = bz.logo.idLogo;
			}

			bz.abrirPlanes = true;

		});


		/////////////////////////////////////
		//////////CAMBIO DE COLOR////////////
		/////////////////////////////////////

		bz.cambioColor = function (color, objetivo) {

			$rootScope.$broadcast("editor:color", {
				color: color,
				objetivo: objetivo
			});

		};



		/////////////////////////////////////
		//////////CAMBIO DE TEXTO////////////
		/////////////////////////////////////        

		bz.cambioTexto = function (texto, eslogan) {

			$rootScope.$broadcast("editor:texto", {
				texto: texto,
				eslogan: eslogan
			});

		};

		bz.verificarEslogan = function (eslogan) {
			if (eslogan === "") {
				bz.esloganActivo = false;
				bz.logo.fuenteEslogan = null;
				$rootScope.$broadcast("editor:eliminarEslogan");
			}
		};

		bz.quitarEsloganDefault = function (eslogan) {
			if (eslogan === "Mi eslogan aquí") {
				bz.logo.eslogan = "";

				bz.cambioTexto("", true);
			}
		};



		/////////////////////////////////////
		/////////CAMBIO DE FUENTE////////////
		///////////////////////////////////// 

		bz.cambioFuente = function (fuente, objetivo) {

			$rootScope.$broadcast("editor:fuente", {
				fuente: angular.copy(fuente),
				objetivo: objetivo
			});

		};

		/////////////////////////////////////
		////////CAMBIO DE PROPIEDAS//////////
		///////////////////////////////////// 

		bz.cambioPropiedad = function (propiedad, eslogan) {

			$rootScope.$broadcast("editor:propiedad", {
				propiedad: propiedad,
				eslogan: eslogan
			});

		};

		/////////////////////////////////////
		/////////CAMBIO DE TAMAÑO////////////
		///////////////////////////////////// 

		bz.cambioTamano = function (objetivo, accion) {

			$rootScope.$broadcast("editor:tamano", {
				objetivo: objetivo,
				accion: accion
			});

		};

		/////////////////////////////////////////////////////////////////////////
		////Disparar el guardado de un svg como copia de comparacion/////////////
		/////////////////////////////////////////////////////////////////////////

		bz.comparaciones = [];

		bz.realizarComparacion = function () {

			$rootScope.$broadcast("editor:comparar", true);

		};

		$scope.$on("directiva:comparar", function (evento, valor) {

			if (bz.comparaciones.length <= 10) {
				bz.comparaciones.push(valor);
			}

		});

		bz.removerComparacion = function (comparacion) {

			var indice = bz.comparaciones.indexOf(comparacion);
			bz.comparaciones.splice(indice, 1);
		};

		//////////////////////////////////////////
		///////////CAMBIAR ORIENTACION////////////
		//////////////////////////////////////////


		bz.cambiarOrientacion = function (orientacion) {

			$rootScope.$broadcast("editor:orientacion", orientacion);

		};


		/*//////////////////////////////////////
		///////CAMBIAR TABS EN SELECCION////////
		////////////////////////////////////////

		$scope.$on("directiva:tabs", function (evento, valor) {
			console.log(valor)
			bz.menuSwitch = valor;

		});*/

		////////////////////////////////////////
		///////BUSCAR Y REEMPLAZAR ICONO////////
		////////////////////////////////////////

		bz.iconos = [];

		bz.completadoBuscar = true;

		/* Etiquetas */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.etiquetasFunciones = etiquetasService;

		etiquetasService.listarEtiquetas()
			.then(function (res) {
				bz.etiquetas = etiquetasService.loadEtiquetas(res.data);
				//console.log('etiquetas cargadas', bz.etiquetas)
			})
			.catch(function () { });

		bz.etiquetasSeleccionadas = [];

		bz.buscarIconos = function (idCategoria, valido) {

			bz.iconosForm.$setSubmitted();

			if (valido && bz.completadoBuscar) {

				bz.completadoBuscar = false;

				var tags = [];
				var iconos = [];

				angular.forEach(bz.etiquetasSeleccionadas, function (valor) {
					tags[valor.traducciones[0].valor] = 0;
				});

				

				//FIXME: Revisar
				if (bz.iconos.length > 0) {
					angular.forEach(bz.iconos, function (valor) {
						iconos.push(valor.idElemento);
					});
				}

				bz.cerrarContenedores();
				bz.contenedores.busquedaIconos = true;
				//FIXME: Revisar

				elementosService.listarIconosSegunTags(tags).then(function (res) {
					bz.iconos = [];
					bz.iconos = res;

				}).catch(function (res) {
					//console.log(res);
				}).finally(function () {
					bz.completadoBuscar = true;
				});
				/*
				categoriasService.listaCategoriasElementos(idCategoria, "ICONO")
					.then(function (res) {
						bz.iconos = [];
						bz.iconos = res;
					}).finally(function () {
						bz.completadoBuscar = true;
					});
					*/
			}

		};



		bz.reemplazarIcono = function (icono) {

			bz.logo.icono = icono;
			$rootScope.$broadcast("editor:reemplazar", bz.base64.decode(icono.svg));

		};

		$scope.$on("directiva:restaurarEslogan", function (evento, datos) {

			if (datos.accion) {

				var fuenteElegida = null;

				angular.forEach(bz.fuentes, function (valor) {

					if (valor.nombre == datos.fuente.nombre) {

						fuenteElegida = {
							nombre: valor.nombre,
							url: valor.url
						};
					}

				});

				bz.logo.fuenteEslogan = fuenteElegida;
				bz.esloganActivo = true;
			} else {
				bz.logo.eslogan = "";
				bz.logo.fuenteEslogan = null;
				bz.esloganActivo = false;
			}
		});



		bz.agregarEslogan = function () {

			bz.logo.eslogan = "Mi eslogan aquí";
			bz.logo.fuenteEslogan = bz.logo.fuente;

			$rootScope.$broadcast("editor:agregarEslogan", {
				eslogan: bz.logo.eslogan,
				fuente: bz.logo.fuenteEslogan
			});

			bz.esloganActivo = true;

		};

		//////////////////////////////////////////
		////////RESTAURAR COMPARACIONES///////////
		//////////////////////////////////////////

		bz.restaurarComparacion = function (comparacion) {

			$rootScope.$broadcast("editor:restaurar", comparacion);

		};

		/*
		$scope.$on("sesionExpiro", function () {

			$state.go("inicio");

		});
		*/

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

		bz.abrirContenedor = function (contenedor, noCerrar) {

			if (!noCerrar && bz.contenedores[contenedor]) return bz.contenedores[contenedor] = false;

			bz.cerrarContenedores(contenedor);

			bz.contenedores[contenedor] = true;
		};

		bz.cerrarContenedores = function (contenedor) {

			$scope.$broadcast("editor:cerrarColorPickers", true);

			angular.forEach(bz.contenedores, function (el, k) {
				if (contenedor == k) return;
				bz.contenedores[k] = false;
			});
		};

	}]);