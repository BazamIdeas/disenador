angular.module("administrador")

    .controller('planesController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'administrarService', 'paisesValue', 'monedasValue', 'notificacionService', 'monedasService', 'caracteristicasValue', function ($state, $mdSidenav, $mdMenu, $scope, administrarService, paisesValue, monedasValue, notificacionService, monedasService, caracteristicasValue) {

        var bz = this;

        /* DATOS */
        bz.impuestos = [];
        bz.planes = [];
        bz.nuevoPlan = {
            caracteristicas: caracteristicasValue
        };


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
        bz.monedasDisponibles = {};

        monedasService.listarMonedas().then(function (res) {
            bz.monedas = res.data;
        })

        /* FUNCION PARA LISTAR PLANES Y IMPUESTOS */

        /***************************/
        /**********PLANES***********/
        /***************************/

        bz.listarPlanes = function () {
            administrarService.listarPlanes().then(function (res) {
                bz.listaP = !bz.listaP;
                bz.planes = res;
                angular.forEach(bz.planes, function (valor) {
                    if (valor.status) {
                        valor.status = 1;
                    } else {
                        valor.status = 0;
                    }
                })
            }).catch(function (res) {
                notificacionService.mensaje(res.data.msg);
            })

        }

        bz.listarPlanes();

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
                    bz.planes.push(res);
                    bz.nuevoPlan = {};
                    notificacionService.mensaje('Peticion Realizada!');
                    bz.localidadVal = '';

                }).catch(function (res) {
                    notificacionService.mensaje(res);
                })
            }
        }

        bz.agregarPrecioPlan = function (datos, validacion) {

            administrarService.listarPreciosPlan(datos.idPlan).then(function (res) {
                var enuso = true;

                if (res != undefined) {
                    if (res.data.length > 0) {
                        angular.forEach(res.data, function (valor) {
                            if (valor.idMoneda == datos.idMoneda) {
                                enuso = false;
                                return notificacionService.mensaje('Moneda esta en uso!');
                            }
                        });
                    }
                }


                if (validacion && enuso) {
                    administrarService.agregarPrecioPlan(datos).then(function (res) {
                        document.getElementById('nuevoPrecioPlan').reset();
                        bz.nuevoPrecioPlan = {};
                        bz.vista = 0;
                        notificacionService.mensaje('Peticion Realizada!');
                    }).catch(function (res) {
                        notificacionService.mensaje(res);
                    })
                }

            })
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
            bz.modInit = !bz.modInit;

            datos.idPlan = datos.planes_idPlan;
            datos.idMoneda = datos.monedas_idMoneda;

            administrarService.modificarPrecioPlan(datos).then(function (res) {
                notificacionService.mensaje('Peticion Realizada.');
                console.log(res)
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.bloquearPlan = function (opcion, id) {

            bz.bloquearPlanDatos.idPlan = id;
            angular.forEach(bz.planes, function (valor) {
                if (valor.idPlan == id) {
                    valor.status = valor.status ? false : true;
                    if (valor.status) {
                        bz.bloquearPlanDatos.status = 1;
                    } else {
                        bz.bloquearPlanDatos.status = 0;
                    }
                }
            })

            administrarService.bloquearPlan(bz.bloquearPlanDatos).then(function (res) {
                bz.bloquearPlanDatos = {};
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }


        /* FUNCION MOSTRAR */

        bz.mostrar = function (opcion, datos, index) {
            if (opcion == 'nombrePlan') {
                bz.vista = 5;
                bz.index = index;
                angular.forEach(bz.planes, function (valor) {
                    if (valor.idPlan == datos) {
                        bz.modificarNombrePlan = valor;
                    }
                });
            } else if (opcion == 'nuevoPrecioPlan') {
                bz.monedasDisponibles = {};
                bz.nuevoPrecioPlan.idPlan = datos;
                administrarService.listarPreciosPlan(datos).then(function (res) {
                    if (res != undefined) {
                        bz.preciosPlan = res.data;
                    }
                })
                bz.vista = 3;
            } else if (opcion == 'preciosPlan') {
                bz.preciosPlan = [];
                administrarService.listarPreciosPlan(datos).then(function (res) {
                    if (res == undefined) {
                        return notificacionService.mensaje('Este plan no posee precios.');
                    }

                    bz.preciosPlan = res.data;
                    bz.vista = 4;
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                    bz.vista = 4;
                })
            }
        }

        bz.modFun = function (i, datos) {
            bz.modfire = i;
            bz.modInit = !bz.modInit;
            bz.planDatosPrecio = datos;
        }

    }])