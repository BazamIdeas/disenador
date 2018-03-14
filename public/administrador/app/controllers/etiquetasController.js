angular.module("administrador")

	.controller("etiquetasController", ["$state", "$mdSidenav", "$scope", "administrarService", "notificacionService", "$base64", "etiquetasService", "etiquetasService", "categoriasService", function ($state, $mdSidenav, $scope, administrarService, notificacionService, $base64, etiquetasService, etiquetasService, categoriasService) {

		var bz = this;

		/* ETIQUETAS */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.querySearch = etiquetasService.querySearch;
		bz.etiquetasParaVincular = [];
		bz.transformChip = etiquetasService.transformChip;
		bz.idiomas = ['ESP', 'ENG', 'POR'];
		bz.guardarEtiquetas = [];
		bz.guardarEtiquetasIconos = {
			etiquetas: [],
			iconos: []
		};

		bz.logos = [];

		/* DATOS */
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
		bz.listarCategorias();

		bz.iconos = [];

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
				bz.etiquetas = res.data;
				bz.etiquetasParaVincular = etiquetasService.loadEtiquetas(res.data);
				$scope.etiqm = true;
			}).catch(function (res) {
				console.log(res)
			}).finally(function () {
				bz.peticion = false;
			})
		};

		bz.listarEtiquetas();

		/* GUARDAR */

		bz.guardarEtiqueta = function (datos, v) {

			if (!v) return notificacionService.mensaje('Rellene todos los campos por favor');
			bz.peticion = true;

			etiquetasService.guardarEtiqueta({
				etiquetas: datos
			}).then(function (res) {

				if (res == undefined) return;

				for (let i = 0; i < res.data.length; i++) {
					traducciones = [];

					angular.forEach(datos[i].traducciones, function (valor) {
						traducciones.push({
							idioma: {
								codigo: valor.idioma
							},
							valor: valor.valor
						})
					})

					bz.etiquetas.push({
						_id: res.data[i],
						traducciones: traducciones
					})
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

			datos._ids = datos.etiquetas.map(function (et) {
				et = et._id;
				return et;
			});

			bz.iconos = [];
			bz.searchText = null;

			etiquetasService.guardarEtiquetaIconos(datos).then(function (res) {

				if (res == undefined) return;
				bz.guardarEtiquetaIconos = [];
				console.log(res)
				return notificacionService.mensaje('Logos Vinculados')

			}).finally(function () {
				bz.peticion = false;
			})
		}

		/* BLOQUEAR */

		bz.borrarEtiqueta = function (id, index) {

			bz.peticion = true;

			etiquetasService.borrarEtiqueta(id).then(function (res) {

				if (res == undefined) return;
				return bz.etiquetas.splice(index, 1)

			}).finally(function () {
				bz.peticion = false;
			})
		}

		/* ACTUALIZAR */

		bz.actualizarEtiqueta = {
			funcion: function (params, v) {
				if (!v) return notificacionService.mensaje('Rellene todos los campos por favor')

				etiquetasService.actualizarEtiqueta({
					_id: params._id,
					etiqueta: params
				}).then(function (res) {

					if (res == undefined) return;

				}).finally(function () {
					bz.peticion = false;
				})
			},
			datos: {}
		}

		bz.incrementarEtiquetas = function (eliminar) {

			if (!eliminar) {
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

			} else if (bz.guardarEtiquetas.length > 1) {
				return bz.guardarEtiquetas.pop();
			};


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