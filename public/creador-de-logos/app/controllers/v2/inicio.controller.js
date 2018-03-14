angular.module("disenador-de-logos")

	.controller("inicioController", ["categoriasService", "preferenciasService", "elementosService", "$stateParams", "$q", "$scope", "$state", "crearLogoFactory", "clientesService", "$mdToast", "$timeout", "logosService", "$base64", function (categoriasService, preferenciasService, elementosService, $stateParams, $q, $scope, $state, crearLogoFactory, clientesService, $mdToast, $timeout, logosService, $base64) {

		var bz = this;

		bz.base64 = $base64;

		bz.datos = {
			nombre: "Mi logo",
			preferencias: [],
			categoria: {
				icono: "",
				fuente: ""
			},
			tags: [],

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

		/*

		preferenciasService.listaPreferencias().then(function (res) {

			angular.forEach(res, function (valor) {
				valor.valor = 2;
				bz.datos.preferencias.push(valor);

			});

		});

        

		bz.botonesTipo = [{
			nombre: "Logo y nombre",
			activo: true
		}, {
			nombre: "Tipografico",
			activo: true
		}, {
			nombre: "Solo nombre",
			activo: true
		}];

        */


		bz.completado = true;

		bz.solicitarElementos = function (inicial) {

			if (bz.datosForm.$valid && bz.completado) {

				bz.completado = false;
				/*
				bz.datosIconos = {
					categoria: bz.datos.categoria.icono,
					preferencias: bz.datos.preferencias,
					tipo: "ICONO",
					limit: 4,
					ids: bz.iconos
				};
				*/
				var promesaIconos = inicial ? elementosService.listarIniciales(inicial,bz.datos.categoria.icono, bz.iconos, 4) : elementosService.listarIconosSegunTags(bz.datos.tags);
				var promesaFuentes = elementosService.listaFuentesSegunPref(bz.datos.categoria.fuente, bz.datos.preferencias, 4);

				$q.all([
					promesaIconos,
					promesaFuentes
				])
					.then(function (res) {

						angular.forEach(res[0], function(icono, indice){
							bz.iconos.push(icono.idElemento);
						})

						/*
						$state.go("principal.opciones", {
							status: true
						});
						*/

						bz.combinar(res[0], res[1]);

					}).catch(function () {

						//$state.go('comenzar')

					}).finally(function () {

						bz.completado = true;

					});

			}

		};

       
/*

		bz.asignarTipo = function (tipoLogo, iniciales) {

			var inicial = iniciales ? bz.datos.nombre.charAt(0) : false;

			angular.forEach(bz.botonesTipo, function (valor, llave) {

				if (bz.botonesTipo[llave].nombre != tipoLogo.nombre) {

					bz.botonesTipo[llave].activo = false;

				} else {

					bz.botonesTipo[llave].activo = true;
				}

			});

			bz.solicitarElementos(inicial);
		};
*/


		bz.combinar = function (iconos, fuentes) {


			var logos = crearLogoFactory(iconos, fuentes);

			//var logos = crearLogoFactory([iconos[0], iconos[1], iconos[2], iconos[3], iconos[4]], [fuentes[0], fuentes[1], fuentes[2], fuentes[3], fuentes[4]]);

			var cantidadLogos = logos.length;
			
			while(cantidadLogos){

				var indiceRandom = Math.floor(Math.random() * (cantidadLogos - 1)) + 0 

				bz.logos.push(logos[indiceRandom])
				logos.splice(indiceRandom, 1)
				cantidadLogos--
			}
			
			

/*
			$state.go("principal.combinaciones", {
				status: true
			});
*/
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
/*

		bz.seleccionarFuenteCategoria = function (idCategoria) {
			var fuenteNombre = "futura-heavy";

			angular.forEach(bz.categoriasPosibles.fuentes, function (fuenteCategoria) {
				if (fuenteCategoria.idCategoria == idCategoria) {

					fuenteNombre = fuenteCategoria.nombreCategoria;
				}
			});

			return fuenteNombre;
		};



		////////////////////
		////prediseñados////
		////////////////////


		logosService.mostrarDestacados()
			.then(function (res) {

				bz.aprobados = res;

			})
			.catch(function () {

			})
			.finally(function () {

				if (!bz.aprobados.length) {

					logosService.mostrarAprobados()
						.then(function (res) {

							bz.aprobados = res;

						})
						.catch(function () {

						})
						.finally(function () {

						});

				}

			});

		bz.completadoCarga = true;

		bz.cargarMas = function (logo) {

			if (bz.completadoCarga) {

				bz.completadoCarga = false;

				var idLogo = logo.destacados ? false : logo.idLogo;

				logosService.mostrarAprobados(idLogo).then(function (res) {

					angular.forEach(res, function (valor) {

						bz.aprobados.push(valor);
                        
					});

				}).catch(function () {

				}).finally(function () {

					bz.completadoCarga = true;

				});

			}

		};

		bz.buscarAtributo = function (lista, objetivo) {

			var idFuente = null;

			angular.forEach(lista, function (atributo) {

				if (atributo.clave == objetivo) {

					idFuente = atributo.valor;

				}

			});

			return idFuente;
		};

		bz.preAvanzarPredisenado = function(indiceLogo){
			bz.predisenadoSeleccionado = indiceLogo;

			if (!clientesService.autorizado()) {

				bz.mostrarModalLogin = true;
				bz.callback = bz.avanzarPredisenado;

			} else{

				bz.avanzarPredisenado();

			}

		};

		bz.avanzarPredisenado = function (indiceLogo) {
		
			var aprobado = null;

			angular.forEach(bz.aprobados, function (valor) {

				if (valor.idLogo == bz.predisenadoSeleccionado) {
					aprobado = valor;
				}

			});

			if (aprobado) {
				$state.go("editor", {
					status: true,
					datos: {
						logo: {
							icono: {
								idElemento: aprobado.elementos_idElemento,
								svg: aprobado.logo
							}
						},
						idLogoPadre: aprobado.idLogo,
						fuentes: {
							principal: bz.buscarAtributo(aprobado.atributos, "principal"),
							eslogan: bz.buscarAtributo(aprobado.atributos, "eslogan")
						}
					}
				});
			}

			

		}; 
         */
	}]);
