angular.module("administrador")

    .controller('disenadoresController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'administrarService', 'paisesValue', 'monedasValue', 'notificacionService', 'monedasService', '$base64', 'designerService', function ($state, $mdSidenav, $mdMenu, $scope, administrarService, paisesValue, monedasValue, notificacionService, monedasService, $base64, designerService) {

        var bz = this;

        /* DATOS */

        bz.logos = [];
        bz.disenadores = [];
        bz.vista = 0;
        bz.monedas = monedasValue;
        bz.paises = paisesValue;
        bz.monedasDisponibles = {};

        /***************************/
        /**********LOGOS***********/
        /***************************/

        bz.listarLogos = function () {
            designerService.listarLogos().then(function (res) {
                bz.logos = res;
                bz.listaL = !bz.listaL;
            }).catch(function (res) {
                notificacionService.mensaje('No existen logos por aprobar!');
                bz.listaL = false;
                // bz.listarDisenadores();
            })
        }

        bz.listarLogos();

        bz.aprobarLogo = function (i, id) {
            bz.cal = !bz.cal;
            bz.element = i;

            designerService.aprobarLogo(id).then(function (res) {
                notificacionService.mensaje('Aprobado!');
                bz.logos[i].estado = 'Aprobado';
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.borrarLogo = function (i, id) {
            designerService.borrarLogo(id).then(function (res) {
                notificacionService.mensaje('No Aprobado!');
                bz.logos.splice(i, 1);
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.ponerCalificacion = function (datos) {
            designerService.calificarLogo(datos).then(function (res) {

                bz.cal2 = !bz.cal2;
                bz.cal = !bz.cal;
                notificacionService.mensaje('Calificacion Colocada!');
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.verLogo = function (logo, v) {
            bz.logoVisualizar = logo;
            bz.lda = v ? true : false;
            bz.modfire = false;
            bz.modInit = false;
            bz.vista = 3;
        }

        bz.mostrarPop = function () {
            bz.vista = bz.lda ? 1 : 0;
        }

        /***************************/
        /********DISEÑADORES********/
        /***************************/

        bz.listarDisenadores = function (v) {
            bz.listaD = !bz.listaD;
            designerService.listarDisenadores(datos).then(function (res) {
                bz.disenadores = res;
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.bloquearDisenador = function (id) {
            designerService.bloquearDisenador(id).then(function (res) {
                notificacionService.mensaje('Usuario Bloqueado!');
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.notificarDisenador = function (idC) {

            datos = {
                id: idC,
                fecha: formatDate(new Date()),
                monto: 0
            }

            angular.forEach(bz.disenadores, function (valor, llave) {
                if (valor.idCliente == idC) {
                    datos.monto = valor.deuda.deuda;
                }
            })

            designerService.notificarPago(datos).then(function (res) {
                notificacionService.mensaje('Usuario Notificado!');
                console.log(res)
            }).catch(function (res) {
                notificacionService.mensaje(res);
                console.log(res)
            })
        }


        bz.mostrar = function (opcion, index, id) {
            if (opcion == 'logos-designer') {
                bz.modfire = index;

                designerService.logosDisenador(id).then(function (res) {
                    bz.logosDisenador = res;
                    bz.vista = 1;
                    console.log(res)
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                })

            } else if (opcion == 'historial') {
                bz.vista = 2;
                designerService.historialDisenador(id).then(function (res) {
                    bz.historialPagos = res;
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                })

            } else if (opcion == 'calificacion-aprobados') {
                bz.cal2 = !bz.cal2;
                bz.modfire = index;
            }
        }

        /* UTILIDADES */

        bz.modFun = function (i) {
            bz.modfire = i;
            bz.modInit = !bz.modInit;
        }

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }

    }])