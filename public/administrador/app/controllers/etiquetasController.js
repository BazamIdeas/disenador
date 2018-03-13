angular.module("administrador")

	.controller("etiquetasController", ["$state", "$mdSidenav", "$scope", "administrarService", "notificacionService", "$base64", "etiquetasService", "etiquetasService", "categoriasService", function ($state, $mdSidenav, $scope, administrarService, notificacionService, $base64, etiquetasService, etiquetasService, categoriasService) {

		var bz = this;

		/* ETIQUETAS */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.querySearch = etiquetasService.querySearch;
		bz.etiquetasParaVincular = etiquetasService.loadEtiquetas();
		bz.transformChip = etiquetasService.transformChip;
		bz.idiomas = ['ESP', 'ENG', 'POR'];
		bz.guardarEtiquetas = [];
		bz.guardarEtiquetasIconos = {
			etiquetas: [],
			iconos: []
		};

		/* DATOS */

		bz.logos = [];
		bz.cats = [];
		bz.base64 = $base64;
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
		bz.iconos = [];

		bz.listarCategorias();

		/***************************/
		/**********LOGOS***********/
		/***************************/

		bz.listarLogos = function (id) {

			if (bz.logos.length > 0) {
				angular.forEach(bz.logos, (valor) => {
					if (valor.on != undefined && valor.on === true) {
						bz.iconos.push(valor.idElemento);
					}
				});
			}

			datos = {
				idCategoria: id,
				tipo: 'ICONO'
			};

			bz.logos = [];
			bz.peticion = true;

			etiquetasService.listarLogos(datos).then(function (res) {
				bz.logos = res.data;
				bz.listaL = !bz.listaL;
			}).catch(function (res) {
				console.log(res)
			}).finally(function () {
				bz.peticion = false;
			})
		};

		/***************************/
		/********ETIQUETAS***********/
		/***************************/

		bz.listarEtiquetas = function (id) {
			bz.etiquetas = [];
			bz.peticion = true;
			etiquetasService.listarEtiquetas(datos).then(function (res) {
				bz.etiquetas = res;
			}).catch(function (res) {
				console.log(res)
			}).finally(function () {
				bz.peticion = false;
			})
		};

		bz.listarEtiquetas();

		/* GUARDAR */

		bz.guardarEtiqueta = function (datos, v) {
			//bz.peticion = true;

			if (!v) return notificacionService.mensaje('Rellene todos los campos por favor')

			return console.log(datos)

			etiquetasService.guardarEtiqueta(datos).then(function (res) {

				if (res == undefined) {
					return;
				}

			}).finally(function () {
				bz.peticion = false;
			})
		}

		/* GUARDAR Etiqueta Iconos */

		bz.guardarEtiquetaIconos = function (datos, v) {
			//bz.peticion = true;

			angular.forEach(bz.logos, (valor) => {
				if (valor.on != undefined && valor.on === true) {
					bz.iconos.push(valor.idElemento);
					valor.on = false;
				}
			});

			if (bz.iconos.length == 0) return notificacionService.mensaje('Seleccione algun icono por favor')

			datos.iconos = bz.iconos;

			console.log(datos);

			bz.iconos = [];
			datos.etiquetas = [];
			bz.searchText = null;
			return;

			etiquetasService.guardarEtiquetaIconos(datos).then(function (res) {


				if (res == undefined) {
					return;
				}

			}).finally(function () {
				bz.peticion = false;
			})
		}

		/* BLOQUEAR */

		bz.bloquearEtiqueta = function (id) {

			return;

			bz.peticion = true;

			etiquetasService.bloquearEtiqueta(id).then(function (res) {

				if (res == undefined) {
					return;
				}

			}).finally(function () {
				bz.peticion = false;
			})
		}

		/* ACTUALIZAR */

		bz.actualizarEtiqueta = {
			funcion: function (params, v) {
				if (!v) return notificacionService.mensaje('Rellene todos los campos por favor')

				etiquetasService.actualizarEtiqueta(params).then(function (res) {

					if (res == undefined) {
						return;
					}

				}).finally(function () {
					bz.peticion = false;
				})
			},
			datos: {}
		}

		bz.incrementarEtiquetas = function () {
			item = [];
			angular.forEach(bz.idiomas, (valor) => {
				item.push({
					idioma: valor,
					valor: ''
				});
			});
			bz.guardarEtiquetas.push({
				traducciones: item
			});
		}

		bz.mostrar = function (params) {
			if (params.op == 'traducciones') {
				bz.acciones = 2;

				/* TODO: COLOCAR MAS TRADUCCIONES 

				angular.forEach(params.datosEtiqueta.traducciones, (valor) => {
					angular.forEach(bz.idiomas, (item) => {
						if (valor.idioma != item) {
							params.datosEtiqueta.traducciones.push({
								idioma: item,
								valor: ''
							});
						}
					});
				});

				*/

				bz.actualizarEtiqueta.datos = params.datosEtiqueta;

			} else if (params.op == 'crear-etiqueta') {
				bz.incrementarEtiquetas();
				bz.acciones = 1;
			} else if (params.op == 'asignar-etiqueta') {
				if (params.ce) {
					bz.asignarEtiqueta = false;
					return bz.acciones = 0;
				}
				bz.incrementarEtiquetas();
				bz.asignarEtiqueta = !bz.asignarEtiqueta;
				bz.acciones = 3;
			}
		}

	}]);