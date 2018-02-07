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
				bz.listaL = !bz.listaL;
			}).catch(function (res) {
				notificacionService.mensaje("No existen logos por aprobar!");
				bz.listaL = false;
			});
		};

		bz.aprobarLogo = function (i, datos, id) {
			bz.cal = !bz.cal;
			bz.logoCalificarA = datos;

			designerService.aprobarLogo(id).then(function () {
				notificacionService.mensaje("Aprobado!");
				bz.logos[i].estado = "Aprobado";
			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		};

		bz.borrarLogo = function (i, id, op) {
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
				angular.forEach(bz.logosDisenador, function (valor, llave) {
					if (valor.idLogo == id) {
						return bz.logosDisenador.splice(llave, 1);
					}
				});

			}).catch(function (res) {
				notificacionService.mensaje(res);
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
			designerService.destacado(datos).then(function () {
				notificacionService.mensaje("Destacado!");
				bz.logos[datos.i].destacado = true;
			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		}

		/***************************/
		/********DISEÑADORES********/
		/***************************/

		bz.listarDisenadores = function () {
			bz.listaD = !bz.listaD;
			designerService.listarDisenadores().then(function (res) {
				bz.disenadores = res;
			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		};

		bz.bloquearDisenador = function (id) {
			angular.forEach(bz.disenadores, function (valor) {
				if (valor.idCliente == id) {
					valor.bloqueado = 1;
				}
			});
			designerService.bloquearDisenador(id).then(function () {
				notificacionService.mensaje("Usuario Bloqueado!");
			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		};

		bz.notificarDisenador = function (idC, idF) {

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

			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		};


		bz.mostrar = function (opcion, index, id) {
			if (opcion == "logos-designer") {

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
				});

			} else if (opcion == "historial") {
				bz.vista = 2;

				designerService.historialDisenador(id).then(function (res) {
					bz.historialPagos = res;
				}).catch(function (res) {
					notificacionService.mensaje(res);
				});

			} else if (opcion == "calificacion-aprobados") {
				bz.cal2 = !bz.cal2;
				bz.modfire = index;
			} else if (opcion == "o") {
				bz.mod = !bz.mod;
				bz.modfire2 = index;
			}
		};

		/* UTILIDADES */

		bz.modFun = function (id) {
			bz.modfire = id;
			bz.modInit = !bz.modInit;

		};

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

		bz.calDisenador = function (d) {
			bz.metodoPagoi = true;
			bz.datosPagar = d;
		}

	}]);