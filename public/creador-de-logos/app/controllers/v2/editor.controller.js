angular.module("disenador-de-logos")

	.controller("editorController", ["$scope", "$stateParams", "$state", "$base64", "categoriasService", "logosService", "clientesService", "historicoResolve", "$rootScope", "$mdToast", "$timeout", "elementosService", function ($scope, $stateParams, $state, $base64, categoriasService, logosService, clientesService, historicoResolve, $rootScope, $mdToast, $timeout, elementosService) {

		var bz = this;

		bz.base64 = $base64;
		bz.cuadricula = false;
		bz.borradores = false;
		bz.preview = false;
		bz.busquedaIconos = false;
		bz.colorFondo = "rgb(236,239,240)";
		bz.colorTexto = historicoResolve.color || "#000";
		bz.colorEslogan = historicoResolve.color || "#000";
		bz.colorIcono = historicoResolve.color || "#000";

		bz.jqueryScrollbarOptions = {};

		bz.logo = historicoResolve.logo;

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


		elementosService.listarFuentes().then(function (res) {

			bz.fuentes = res;
            
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



		bz.completadoGuardar = true;

		bz.guardarLogo = function (logo, tipoLogo, idElemento) {

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
					logosService.guardarLogo(bz.base64.encode(logo), tipoLogo, idElemento, fuentesId.principal, fuentesId.eslogan, bz.idLogoPadre)
                    
						.then(function (res) {
							bz.logo.idLogo = res;
                        
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Su logo ha sido guardado con exito!",
									clase: "success"
								}
							}));


						}).catch(function () {

							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Un error ha ocurrido",
									clase: "danger"
								}
							}));

						}).finally(function () {

							bz.completadoGuardar = true;

						});
				} else { //si es un logo guardado

					logosService.modificarLogo(bz.base64.encode(logo), bz.logo.idLogo, fuentesId.principal, fuentesId.eslogan)
						.then(function () {

							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Su logo ha sido guardado con exito!",
									clase: "success"
								}
							}));


						}).catch(function () {

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
			}

		};


		bz.activarCuadricula = function () {

			bz.cuadricula = !bz.cuadricula;

		};

		bz.mostrarBorradores = function () {

			if (bz.borradores) {

				bz.borradores = false;

			} else {

				bz.preview = false;
				bz.busquedaIconos = false;
				bz.borradores = true;

			}

		};

		bz.mostrarPreviews = function () {

			if (bz.preview) {

				bz.preview = false;

			} else {

				bz.preview = true;
				bz.busquedaIconos = false;
				bz.borradores = false;

			}

		};

		bz.buscarPlanes = function () {

			$rootScope.$broadcast("editor:planes", true);

		};

		$scope.$on("directiva:planes", function (evento, datos) {

			var idFuente = null;
			var idFuenteEslogan = null;

			angular.forEach(bz.fuentes, function (valor) {

				if (valor.url == bz.logo.fuente.url) {

					idFuente = valor.idElemento;

				}

				if (bz.logo.fuenteEslogan && (valor.url == bz.logo.fuenteEslogan.url)) {

					idFuenteEslogan = valor.idElemento;
				}

			});

			var datosComprar = {
				logo: datos.svg,
				idElemento: bz.logo.icono.idElemento,
				tipo: "Logo y nombre",
				fuentes: {
					principal: idFuente,
					eslogan: idFuenteEslogan
				},
				colores: datos.colores 
			};

			if (bz.idLogoPadre) {
				datosComprar.idPadre = bz.idLogoPadre;
			}

			$state.go("planes", {
				status: true,
				datos: datosComprar
			});

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


		$timeout(function(){
			$rootScope.$broadcast("editor:color", {
				color: historicoResolve.color,
				objetivo: "texto"
			});
		}, 10)

		/////////////////////////////////////
		//////////CAMBIO DE TEXTO////////////
		/////////////////////////////////////        

		bz.cambioTexto = function (texto, eslogan) {

			$rootScope.$broadcast("editor:texto", {
				texto: texto,
				eslogan: eslogan
			});

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


		////////////////////////////////////////
		///////BUSCAR Y REEMPLAZAR ICONO////////
		////////////////////////////////////////

		bz.iconos = [];

		bz.completadoBuscar = true;

		bz.buscarIconos = function (idCategoria, valido) {

			bz.iconosForm.$setSubmitted();

			if (valido) {

				bz.completadoBuscar = false;


				bz.borradores = false;
				bz.preview = false;
				bz.busquedaIconos = true;


				categoriasService.listaCategoriasElementos(idCategoria, "ICONO")
					.then(function (res) {
						bz.iconos = res;
					}).finally(function () {
						bz.completadoBuscar = true;
					});
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


		$scope.$on("sesionExpiro", function () {

			$state.go("principal.comenzar");

		});

	}]);
