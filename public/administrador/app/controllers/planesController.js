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
                    bz.localidadVal = '';
                }).catch(function (res) {
                    console.log(res)
                })
            }
        }

        bz.agregarPrecioPlan = function (datos, validacion){
            if(bz.preciosPlan.length > 0){
                angular.forEach(bz.monedas, function (valor) {
                    if (valor.idMoneda == datos.idMoneda) {
                        return notificacionService.mensaje('Moneda esta en uso!');
                    }
                });
            }else{
                if (validacion) {
                    administrarService.agregarPrecioPlan(datos).then(function (res) {
                        document.getElementById('nuevoPrecioPlan').reset();
                        bz.nuevoPrecioPlan = {};
                        bz.vista = 0;
                        notificacionService.mensaje('Peticion Realizada!');
                    }).catch(function (res) {
                        console.log(res)
                    })
                }
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
            datos.idPlan = datos.planes_idPlan;
            administrarService.modificarPrecioPlan(datos).then(function (res) {
                notificacionService.mensaje('Peticion Realizada.');
                bz.modfire = 'no';
            }).catch(function (res) {
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
                }).catch(function (res) {
                })
                bz.vista = 3;
            } else if (opcion == 'preciosPlan') {
                bz.preciosPlan = [];
                administrarService.listarPreciosPlan(datos).then(function (res) {
                    if (res == undefined) {
                        notificacionService.mensaje('Este plan no posee precios.');
                    }else{
                        bz.preciosPlan = res.data;
                        console.log(res)
                    }
                    bz.vista = 4;
                }).catch(function (res) {
                    console.log(res)
                    bz.vista = 4;
                })
            }
        }

    }])