angular.module("administrador")

    .controller('planesController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'administrarService', 'paisesValue', 'monedasValue', 'notificacionService', 'monedasService', function ($state, $mdSidenav, $mdMenu, $scope, administrarService, paisesValue, monedasValue, notificacionService, monedasService) {

        var bz = this;

        /* DATOS */
        bz.impuestos = [];
        bz.planes = [];
        bz.nuevoPlan = {};
        bz.modificarNombrePlan = {};
        bz.modificarPrecioPlan = {};
        bz.nuevoPrecioPlan = {};
        bz.nuevoImpuesto = {};
        bz.planDetalles = {};
        bz.vista = 0;
        bz.bloquearPlanDatos = {};
        bz.preciosPlan = [];
        bz.monedas = monedasValue;
        bz.paises = paisesValue;

        /* FUNCION PARA LISTAR PLANES Y IMPUESTOS */

        monedasService.listarMonedas().then(function (res) {
            bz.monedas = res.data;
        })

        /***************************/
        /**********PLANES***********/
        /***************************/

        bz.listarPlanes = function () {
            administrarService.listarPlanes().then(function (res) {
                bz.listaP = !bz.listaP;
                bz.planes = res;
                for (i = 0; i < bz.planes.length; i++) {
                    if (bz.planes[i].status == 1) {
                        bz.planes[i].estado = true;
                    } else {
                        bz.planes[i].estado = false;
                    }
                };
            }).catch(function (res) {
                notificacionService.mensaje(res.data.msg);
            })

        }

        bz.agregarPlan = function (datos, validacion) {
            angular.forEach(bz.planes, function (valor) {
                if (valor.plan == datos.plan) {
                    validacion = false;
                    bz.localidadVal2 = 'Esta Nombre Ya esta en uso';
                }
            });

            if (validacion) {

                administrarService.agregarPlan(datos).then(function (res) {
                    datos.status = 1;
                    datos.estado = true;
                    bz.planes.push(datos);
                    bz.nuevoPlan = {};

                    notificacionService.mensaje('Peticion Realizada!');
                    bz.localidadVal = ' ';
                }).catch(function (res) {
                    console.log(res)
                })
            }
        }

        bz.agregarPrecioPlan = function (datos, validacion) {
            if (validacion) {
                administrarService.agregarPrecioPlan(datos).then(function (res) {
                    document.getElementById('nuevoPrecioPlan').reset();
                    bz.nuevoPrecioPlan = {};
                    bz.vista = 0;
                    notificacionService.mensaje('Peticion Realizada!');
                    bz.localidadVal = ' ';
                }).catch(function (res) {
                    console.log(res)
                })
            }
        }

        bz.modificarNombreP = function (datos, validacion) {
            if (validacion) {
                administrarService.modificarNombrePlan(datos).then(function (res) {
                    bz.planes[bz.index].plan = datos.plan;
                    document.getElementById('nombrePlan').reset();
                    notificacionService.mensaje('Peticion Realizada.');
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                })
            }
        }

        bz.modificarPrecioPlan = function (datos) {
            administrarService.modificarPrecioPlan(datos).then(function (res) {
                console.log(res)
                notificacionService.mensaje('Peticion Realizada.');
            }).catch(function (res) {
                console.log(res)
                notificacionService.mensaje(res);
            })
        }

        bz.bloquearPlan = function (opcion, id, index) {
            bz.bloquearPlanDatos.idplan = id;
            if (opcion == 'bloquear') {
                bz.bloquearPlanDatos.status = 0;
                bz.planes[index].estado = false;
            } else if (opcion == 'desbloquear') {
                bz.bloquearPlanDatos.status = 1;
                bz.planes[index].estado = true;
            }

            datos = {
                idPlan: id
            }
            administrarService.bloquearPlan(datos).then(function (res) {
                bz.planes[index].status = bz.bloquearPlanDatos.status;
                bz.bloquearPlanDatos = {};
            }).catch(function (res) {
                console.log(res)
            })
        }


        /* FUNCION MOSTRAR */

        bz.mostrar = function (opcion, datos, index) {
            if (opcion == 'nombrePlan') {
                bz.vista = 5;
                angular.forEach(bz.planes, function (valor) {
                    if (valor.idPlan == datos) {
                        bz.modificarNombrePlan = valor;
                    }
                });
            } else if (opcion == 'nuevoPrecioPlan') {
                bz.nuevoPrecioPlan.idPlan = datos;
                bz.vista = 3;
            } else if (opcion == 'preciosPlan') {
                bz.preciosPlan = [];
                administrarService.listarPreciosPlan(datos).then(function (res) {
                    if (res.data) {
                        bz.preciosPlan = res.data;
                    }
                    bz.vista = 4;
                }).catch(function (res) {
                    console.log(res)
                    bz.vista = 4;
                })
            }
        }

    }])