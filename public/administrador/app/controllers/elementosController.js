angular.module("administrador")

	.controller('elementosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'iconoFuente', 'categoriasService', 'notificacionService', "SweetAlert", "$base64", "etiquetasService", "idiomasService", function ($state, $mdSidenav, $mdDialog, $scope, iconoFuente, categoriasService, notificacionService, SweetAlert, $base64, etiquetasService, idiomasService) {

		var bz = this;

		/* objeto datos vacios */
		bz.registroFuente = {};
		bz.registroIcono = {};
		bz.modificar = {};
		bz.listar = {};
		bz.categorias = [];
		bz.preferencias = [];
		bz.base64 = $base64;
		idiomasService.listarIdiomas().then(function (res) {
			bz.idiomas = res;
		})

		bz.listarCategorias = function (tipoCategoria) {
			bz.peticion = true;
			bz.tipoListado = tipoCategoria;
			var datos = {
				tipo: tipoCategoria
			}
			categoriasService.listarCategorias(datos).then(function (res) {
				if (res == undefined) {
					bz.categorias = [];
					bz.elementos = [];
					return notificacionService.mensaje('No hay categorias.');
				}
				bz.categorias = res.data;
			}).finally(function () {
				bz.peticion = false;
			})
		}

		categoriasService.listarPreferencias().then(function (res) {
			angular.forEach(res.data, function (valor) {
				valor.valor = 2;
				bz.preferencias.push(valor);
			})
			bz.registroFuente.datoPrefe = bz.preferencias;
			bz.registroIcono.datoPrefe = bz.preferencias;
			bz.modificar.preferencias = bz.preferencias;
			bz.listar.preferencias = bz.preferencias;
		})

		bz.nuevaFuente = function (datos, v) {
			if (!v) return notificacionService.mensaje('Rellene los campos de forma correcta!');

			bz.peticion = true;
			bz.valMulFonts = true;

			if (bz.regFmArchivos) return bz.subidaMasiva(datos);
			else {
				iconoFuente.nuevaFuente(datos).then(function (res) {
					SweetAlert.swal("Genial", "Fuente Agregada!", "success");
					datos.idElemento = res.data.insertId;
					datos.tipo = 'FUENTE';
					bz.valMulFonts = false;
				}).catch(function (res) {
					notificacionService.mensaje(res);
				}).finally(function () {
					bz.peticion = false;
				})
			}
		}

		bz.nuevoIcono = function (datos, v) {
			if (!v) return notificacionService.mensaje('Rellene los campos de forma correcta!');

			bz.peticion = true;
			bz.valMulIcons = true;
			if (bz.regImArchivos) return bz.subidaMasiva(datos);
			else {
				iconoFuente.nuevoIcono(datos).then(function (res) {
					datos.idElemento = res.data.insertId;
					datos.tipo = 'ICONO';
					SweetAlert.swal("Genial", 'Icono Agregado', "success");
					bz.valMulIcons = false;
				}).catch(function (res) {
					console.log(res)
				}).finally(function () {
					bz.peticion = false;
				})
			}
		}

		bz.subidaMasiva = function (datos) {
			iconoFuente.subidaMasiva(datos).then(function (res) {
				SweetAlert.swal("Genial", "Datos Agregados!", "success");
				bz.valMulFonts = false;
				bz.valMulIcons = false;
			}).catch(function (res) {
				notificacionService.mensaje(res);
			}).finally(function () {
				bz.peticion = false;
			})
		}

		bz.listado = function (tipo) {
			bz.peticion = true;
			bz.listar.tipo = tipo;

			iconoFuente.listar(bz.listar).then(function (res) {
				bz.elementos = res.data;
			}).catch(function (res) {
				notificacionService.mensaje(res);
			}).finally(function () {
				bz.peticion = false;
			})
		}

		bz.accionesMostrar = function (opcion, index) {
			if (opcion == 'modElemento') {
				bz.acciones = 3;
				bz.modificarElemento.idElemento = bz.elementos[index].idElemento;
			} else if (opcion == 'modEtiquetas') {
				bz.idIcono = bz.elementos[index].idElemento;
				etiquetasService.obtenerPorIcono(bz.elementos[index].idElemento).then(function (res) {
					bz.acciones = 4;
					if (res == undefined) return notificacionService.mensaje('Este elemento no posee etiquetas.');
					bz.etiquetasIcono = res.data;
				}).catch(function () {
					notificacionService.mensaje('Este elemento no posee etiquetas.');
				}).finally(function () {

				})

			}
		}

		bz.mostrar = function (tipo) {
			bz.mn = false;
			bz.peticion = true;
			if (tipo == 'ICONO') {
				bz.acciones = 2;
				return bz.listarCategorias(tipo);
			}
			bz.acciones = 1;
			bz.listarCategorias(tipo);
		}

		bz.modificarElemento = function (datos) {
			bz.peticion = true;
			iconoFuente.modificarPreferencias(datos).then(function (res) {
				bz.acciones = 0;
				SweetAlert.swal("Genial", res.data.result, "success");
			}).catch(function (res) {
				notificacionService.mensaje(res);
			}).finally(function () {
				bz.peticion = false;
			})
		}

		bz.desvincularEtiqueta = function (item, index) {

			bz.peticion = true;

			etiquetasService.desasignarEtiqueta(item._id, bz.idIcono).then(function (res) {

				if (res == undefined) return;

				bz.etiquetasIcono.splice(index, 1);
				notificacionService.mensaje('Etiqueta Desvinculada.');

			}).finally(function () {
				bz.peticion = false;
			})

		}

	}])