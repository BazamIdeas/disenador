angular.module("administrador")

    .controller('planesController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'administrarService', 'paisesValue', 'monedasValue', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, administrarService, paisesValue, monedasValue, notificacionService) {

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

        bz.mostrarPlanes = false;
        bz.mostrarImpuestos = false;

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
            administrarService.bloquearPlan(bz.bloquearPlanDatos).then(function (res) {
                bz.planes[index].status = bz.bloquearPlanDatos.status;
                bz.bloquearPlanDatos = {};
            }).catch(function (res) {
                console.log(res)
            })
        }


        /***************************/
        /********IMPUESTOS**********/
        /***************************/

        bz.listarImpuestos = function () {
            bz.vista = 0;
            administrarService.listarImpuestos().then(function (res) {
                bz.impuestos = res;

            }).catch(function (res) {
                notificacionService.mensaje(res.data.msg);
            })
        }

        bz.agregarImpuesto = function (datos, validacion) {
            angular.forEach(bz.impuestos, function (valor) {
                if (valor.localidad == datos.localidad) {
                    validacion = false;
                    bz.localidadVal = 'Esta Localidad Ya esta en uso';
                }
            });

            if (validacion) {

                administrarService.agregar(opcion, datos).then(function (res) {

                    bz.impuestos.push(datos);
                    bz.nuevoImpuesto = {};
                    notificacionService.mensaje('Peticion Realizada!');
                    bz.localidadVal = ' ';

                }).catch(function (res) {
                    console.log(res)
                })
            }
        }

        bz.modificarImp = function (datos, validacion) {
            if (validacion) {
                administrarService.modificar(datos).then(function (res) {
                    bz.impuestos[bz.index].impuesto = datos.impuesto;
                    document.getElementById('nombreimpuesto').reset();
                    notificacionService.mensaje('Peticion Realizada.');
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                })
            }
        }

        bz.borrarImpuesto = function (id, index) {
            administrarService.borrarImpuesto(id).then(function (res) {
                bz.impuestos.splice(index, 1);
                notificacionService.mensaje('Impuesto Borrado!');
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }


        /* FUNCION MOSTRAR */

        bz.mostrar = function (opcion, datos, index) {
            if (opcion == 'nombrePlan') {
                bz.vista = 5;
                bz.index = index;
                bz.modificarNombrePlan.idplan = datos;
            } else if (opcion == 'nuevoPrecioPlan') {
                bz.nuevoPrecioPlan.idplan = datos;
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
            } else if (opcion == 'impuesto') {
                bz.index = index;
                bz.modificarImpuesto.localidad = datos;
                bz.vista = 6;
            }
        }

    }])