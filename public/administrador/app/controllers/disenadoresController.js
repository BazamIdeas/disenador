angular.module("administrador")

	.controller("disenadoresController", ["$state", "$mdSidenav", "$scope", "administrarService", "notificacionService", "$base64", "designerService", function ($state, $mdSidenav, $scope, administrarService, notificacionService, $base64, designerService) {

		var bz = this;

		/* DATOS */

		bz.logos = [];
		bz.disenadores = [];
		bz.logosDisenador = [];
		bz.vista = 0;

		/***************************/
		/**********LOGOS***********/
		/***************************/

		bz.listarLogos = function () {
			bz.logos = [];
			bz.peticion = true;
			bz.listaL = !bz.listaL;
			designerService.listarLogos().then(function (res) {
				angular.forEach(res, function (valor) {
					if (valor.atributos) {
						if (valor.atributos.length > 0) {
							angular.forEach(valor.atributos, function (valor2) {
								if (valor2.clave == 'calificacion-admin') {
									valor.calificado = true;
								}
							});
						}
					}
				});

				bz.logos = res;
			}).finally(function () {
				bz.peticion = false;
			})
		};

		bz.aprobarLogo = function (i, datos, id) {
			bz.peticion = true;
			bz.cal = !bz.cal;
			bz.logoCalificarA = datos;

			designerService.aprobarLogo(id).then(function () {
				notificacionService.mensaje("Aprobado!");
				bz.logos[i].estado = "Aprobado";
			}).catch(function (res) {
				notificacionService.mensaje(res);
			}).finally(function () {
				bz.peticion = false;
			});
		};

		bz.borrarLogo = function (i, id, op) {
			bz.peticion = true;

			designerService.borrarLogo(id).then(function () {
				notificacionService.mensaje("No Aprobado!");

				// Si es un logo aprobado
				if (op) {
					bz.modfire = false;
					return bz.logosDisenador.splice(i, 1);
				}

				// Si no 
				bz.listaL = !bz.listaL;
				bz.logos.splice(i, 1);
				bz.logosDisenador.splice(i, 1);

			}).catch(function (res) {
				notificacionService.mensaje(res);
			}).finally(function () {
				bz.peticion = false;
			});
		};

		bz.ponerCalificacion = function (datos, v, i) {
			designerService.calificarLogo(datos).then(function () {

				// Si es un logo aprobado
				if (v) {
					/* 
					angular.forEach(bz.logos, function (valor, llave) {
						if (valor.idLogo == datos.idLogo) {
							return bz.logos.splice(llave, 1);
						}
					});
					*/
					bz.cal = false;
					return notificacionService.mensaje("Calificacion Colocada!");

				}

				// Si no
				bz.cal2 = false;
				bz.cal = false;
				bz.logosDisenador[i].calificado = true;
				notificacionService.mensaje("Calificacion Colocada!");

			}).catch(function (res) {
				notificacionService.mensaje(res);
			}).finally(function () {
				bz.peticion = false;
			});
		};

		bz.verLogo = function (logo, v) {
			bz.logoVisualizar = bz.base64(logo);
			bz.lda = v ? true : false;
			bz.modfire = false;
			bz.modInit = false;
			bz.vista = 3;
		};

		bz.mostrarPop = function () {
			bz.vista = bz.lda ? 1 : 0;
		};


		bz.destacado = function (datos) {
			bz.peticion = true;

			designerService.destacado(datos).then(function () {
				notificacionService.mensaje("Destacado!");
				bz.logos[datos.i].destacado = true;
			}).catch(function (res) {
				notificacionService.mensaje(res);
			}).finally(function () {
				bz.peticion = false;
			});
		}

		/***************************/
		/********DISEÑADORES********/
		/***************************/

		bz.listarDisenadores = function () {
			bz.disenadores = [];
			bz.peticion = true;

			bz.listaD = !bz.listaD;
			designerService.listarDisenadores().then(function (res) {
				if (res != undefined) return bz.disenadores = res;
			}).finally(function () {
				bz.peticion = false;
			})
		};

		bz.bloquearDisenador = function (id) {
			bz.peticion = true;

			designerService.bloquearDisenador(id).then(function () {
				notificacionService.mensaje("Usuario Bloqueado!");

				angular.forEach(bz.disenadores, function (valor) {
					if (valor.idCliente == id) {
						valor.bloqueado = 1;
					}
				});

			}).catch(function (res) {
				notificacionService.mensaje(res);
			}).finally(function () {
				bz.peticion = false;
			});
		};

		bz.notificarDisenador = function (idC, idF) {
			bz.peticion = true;

			var datos = {
				idCliente: idC,
				fecha: formatDate(new Date()),
				monto: 0,
				idFacturacion: idF
			};

			angular.forEach(bz.disenadores, function (valor) {
				if (valor.idCliente == idC) {
					datos.monto = valor.deuda.deuda;
				}
			});

			designerService.notificarPago(datos).then(function () {

				notificacionService.mensaje("Usuario Notificado!");

				angular.forEach(bz.disenadores, function (valor) {
					if (valor.idCliente == idC) {
						valor.deuda.deuda = 0;
					}
				});

				bz.metodoPagoi = false;

			}).catch(function (res) {

				notificacionService.mensaje(res);
			}).finally(function () {
				bz.peticion = false;
			});
		};


		bz.mostrar = function (opcion, index, id) {

			if (opcion == "logos-designer") {
				bz.peticion = true;
				designerService.logosDisenador(id).then(function (res) {

					// Verificamos si tiene la calificacion del administrador
					angular.forEach(res, function (valor) {
						if (valor.atributos.length > 0) {
							angular.forEach(valor.atributos, function (valor2) {
								if (valor2.clave == 'calificacion-admin') {
									valor.calificado = true;
								}
							});
						}
					});

					bz.logosDisenador = res;
					bz.vista = 1;

				}).catch(function (res) {
					notificacionService.mensaje(res);
				}).finally(function () {
					bz.peticion = false;
				});

			} else if (opcion == "historial") {
				bz.peticion = true;
				designerService.historialDisenador(id).then(function (res) {
					if (res == undefined) return notificacionService.mensaje('No hay registro de pagos en la base de datos.');

					bz.vista = 2;
					bz.historialPagos = res.data;
				}).catch(function (res) {
					notificacionService.mensaje(res);
				}).finally(function () {
					bz.peticion = false;
				});

			}
		};

		/* UTILIDADES */

		bz.base64 = function (icono) {

			return $base64.decode(icono);

		};

		function formatDate(date) {
			var d = new Date(date),
				month = "" + (d.getMonth() + 1),
				day = "" + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) month = "0" + month;
			if (day.length < 2) day = "0" + day;

			return [year, month, day].join("-");
		}

	}]);