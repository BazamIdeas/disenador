angular.module("administrador")

	.controller("etiquetasController", ["$state", "$mdSidenav", "$scope", "administrarService", "notificacionService", "$base64", "etiquetasService", "etiquetasService", "categoriasService", "idiomasService", "$q", function ($state, $mdSidenav, $scope, administrarService, notificacionService, $base64, etiquetasService, etiquetasService, categoriasService, idiomasService, $q) {

		var bz = this;

		/* ETIQUETAS */
		bz.guardarTraducciones = {

		};
		bz.base64 = $base64;
		bz.iconos = [];
		bz.selectedItem = null;
		bz.searchText = null;
		bz.querySearch = etiquetasService.querySearch;
		bz.etiquetasParaVincular = [];
		bz.transformChip = etiquetasService.transformChip;
		bz.guardarEtiquetas = [];
		bz.guardarEtiquetasIconos = {
			etiquetas: [],
			iconos: []
		};
		bz.logos = [];
		bz.promesas = [idiomasService.listarIdiomas(), categoriasService.listarCategorias({
			tipo: 'ICONO'
		}), etiquetasService.listarEtiquetas()]

		bz.peticion = true;

		$q.all(bz.promesas).then(function (res) {
			bz.idiomas = res[0];
			bz.cats = res[1].data;
			bz.etiquetas = res[2].data;
			bz.etiquetasParaVincular = etiquetasService.loadEtiquetas(res[2].data);

		}).catch(function (res) {
			console.log(res)
		}).finally(function () {
			bz.peticion = false;
		})

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
						idioma: valor.codigo,
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
				bz.actualizarEtiqueta.datos = params.datosEtiqueta;

			} else if (params.op == 'crear-etiqueta') {
				bz.incrementarEtiquetas();
				bz.acciones = 1;
			} else if (params.op == 'asignar-etiqueta') {
				if (params.ce) {
					bz.asignarEtiqueta = false;
					return bz.acciones = 0;
				}
				bz.asignarEtiqueta = !bz.asignarEtiqueta;
				bz.acciones = 3;
			}
		}

		bz.obtenerTraducciones = function (idioma, traducciones) {
			var texto = {};
			angular.forEach(traducciones, function (traduccion) {
				if (idioma.codigo == traduccion.idioma.codigo) {
					texto = traduccion
				}
			})
			return texto;
		}

	}]);