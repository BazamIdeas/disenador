angular.module("administrador")

	.controller("etiquetasController", ["$state", "$scope", "notificacionService", "$base64", "etiquetasService", "categoriasService", "idiomasService", "$q", function ($state, $scope, notificacionService, $base64, etiquetasService, categoriasService, idiomasService, $q) {

		var bz = this;

		/* DATOS */

		bz.base64 = $base64;
		bz.iconos = [];
		bz.selectedItem = null;
		bz.searchText = null;
		bz.querySearch = etiquetasService.querySearch;
		bz.transformChip = etiquetasService.transformChip;
		bz.etiquetasParaVincular = [];
		bz.guardarEtiquetas = [];
		bz.actualizarEtiquetaDatos = {};
		bz.guardarEtiquetasIconos = {
			etiquetas: [],
			iconos: []
		};
		bz.logos = [];

		/* Traer datos iniciales */

		bz.promesas = [idiomasService.listarIdiomas(), categoriasService.listarCategorias({
			tipo: 'ICONO'
		})]

		bz.peticion = true;

		$q.all(bz.promesas).then(function (res) {
			bz.idiomas = res[0];
			bz.cats = res[1].data;
		}).catch(function (res) {
			//console.log(res)
		}).finally(function () {
			bz.peticion = false;
		})

		etiquetasService.listarEtiquetasConIconos().then(function (res) {
			bz.etiquetas = res.data;
			console.log(res.data)
			bz.etiquetasParaVincular = etiquetasService.loadEtiquetas(res.data);

		}).catch(function (res) {
			console.log(res)
		}).finally(function () {
			bz.peticion = false;
		})

		/**********ICONOS***********/

		bz.listarIconos = function (id) {

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

		/********ETIQUETAS**********/

		/* GUARDAR */

		bz.guardarEtiqueta = function (datos, v) {

			if (!v) return notificacionService.mensaje('Rellene todos los campos por favor');
			bz.peticion = true;

			etiquetasService.guardarEtiqueta({
				etiquetas: datos
			}).then(function (res) {

				if (res == undefined) return notificacionService.mensaje('No se ha podido guardar las etiquetas.');

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

				return notificacionService.mensaje('Etiquetas Agregadas.')

			}).finally(function () {
				bz.peticion = false;
			})
		}

		/* VINCULAR ETIQUETAS A ICONOS */

		bz.guardarEtiquetaIconos = function (datos, v) {
			bz.peticion = true;

			angular.forEach(bz.logos, (valor) => {
				if (valor.on != undefined && valor.on === true) {
					bz.iconos.push(valor.idElemento);
					valor.on = false;
				}
			});

			if (bz.iconos.length == 0) return notificacionService.mensaje('Seleccione algun icono por favor')

			datos.iconos = bz.iconos;

			datos._ids = [];

			angular.forEach(datos.etiquetas, function (et) {
				datos._ids.push(et._id)
			})

			bz.iconos = [];

			bz.searchText = null;

			etiquetasService.guardarEtiquetaIconos(datos).then(function (res) {

				if (res == undefined) return notificacionService.mensaje('No se ha podido vincular las etiquetas.');
				bz.guardarEtiquetaIconos = [];
				return notificacionService.mensaje('Logos Vinculados');

			}).finally(function () {
				bz.peticion = false;
			})
		}

		/* BLOQUEAR */

		bz.borrarEtiqueta = function (id, index) {

			bz.peticion = true;

			etiquetasService.borrarEtiqueta(id).then(function (res) {

				if (res == undefined) return notificacionService.mensaje('No se ha podido borrar la etiqueta.');
				bz.etiquetas.splice(index, 1);
				return notificacionService.mensaje('Etiqueta Borrada');

			}).finally(function () {
				bz.peticion = false;
			})
		}

		/* ACTUALIZAR */

		bz.actualizarEtiqueta = function (params, v) {
			if (!v) return notificacionService.mensaje('Rellene todos los campos por favor');

			etiquetasService.actualizarEtiqueta({
				_id: params._id,
				etiqueta: params
			}).then(function (res) {

				if (res == undefined) return;
				notificacionService.mensaje('Etiqueta Actualizada!');

			}).finally(function () {
				bz.peticion = false;
			})
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
				bz.actualizarEtiquetaDatos = params.datosEtiqueta;

				var etiqueta = angular.toJson(params.datosEtiqueta.traducciones);

				angular.forEach(bz.idiomas, function (valor, key) {
					if (!etiqueta.includes(valor.codigo)) {
						bz.actualizarEtiquetaDatos.traducciones.push({
							idioma: valor,
							valor: ''
						});
					}
				})

			} else if (params.op == 'asignar-etiqueta') {
				if (params.ce) {
					bz.asignarEtiqueta = false;
					return bz.acciones = 0;
				}
				bz.asignarEtiqueta = !bz.asignarEtiqueta;
				bz.acciones = 3;
			}
		}

	}]);