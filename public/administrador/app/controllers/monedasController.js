angular.module("administrador")

    .controller('monedasController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'iconoFuente', 'categoriasService', 'Upload', 'notificacionService', 'monedasService', 'pasarelasService', 'monedasValue', function ($state, $mdSidenav, $mdDialog, $scope, iconoFuente, categoriasService, Upload, notificacionService, monedasService, pasarelasService, monedasValue) {

        var bz = this;

        /*DATOS*/
        bz.nuevaMoneda = {};
        bz.editarMoneda = {};
        bz.nuevaPasarela = {};
        bz.editarPasarela = {};
        bz.monedasPasarela = {};
        bz.quitarMoneda = {};
        bz.ponerMoneda = {};
        bz.almacenDeMonedas = monedasValue;

        bz.mostrar = function(opcion, index){
            bz.index = index;
            if(opcion == 'editarMoneda'){
                bz.acciones = 2;
                bz.editarMoneda = bz.monedas[index];
            }else if(opcion == 'editarPasarela'){
                bz.acciones = 4; 
                bz.editarPasarela = bz.pasarelas[index];
            } else if (opcion == 'asignar') {
                bz.acciones = 5;
                bz.ponerMoneda.idPasarela = bz.pasarelas[index].idPasarela;
            }
        }

        bz.listarMonedas = function (v) {
            if(!v){
                bz.listaM = !bz.listaM;
            }

            bz.peticion = true;

            monedasService.listarMonedas().then(function (res) {
                bz.monedas = res.data;
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.listarMonedas(true);


        bz.guardarMoneda = function (datos, v) {
            if (v) {
                bz.peticion = true;

                monedasService.guardarMoneda(datos).then(function (res) {
                    if (res == undefined) {
                        return notificacionService.mensaje('La moneda ya existe.');
                    }
                    datos.idMoneda = res.data.result;
                    bz.monedas.push(datos);
                    return notificacionService.mensaje('Registro Exitoso.');
                }).finally(function () {
                    bz.peticion = false;
                })
            }
        }

        bz.modificarMoneda = function (datos, v) {
            if (v) {
                bz.peticion = true;
                monedasService.modificarMoneda(datos).then(function (res) {
                    bz.monedas[bz.index] = datos;
                }).finally(function () {
                    bz.peticion = false;
                })
            }
        }

        bz.borrarMoneda = function (id, index) {
            var datos = {
                idMoneda: id
            }
            bz.peticion = true;
            monedasService.borrarMoneda(datos).then(function (res) {
                bz.monedas.splice(index, 1);
            }).finally(function () {
                bz.peticion = false;
            })
        }


        /*  PASARELAS */


        bz.listarPasarelas = function () {
            bz.peticion = true;
            bz.listaP = !bz.listaP;
            pasarelasService.listarPasarelas().then(function (res) {
                bz.pasarelas = res.data;
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.listarPasarelaMonedas = function (id) {
            bz.peticion = true;
            bz.acciones = 6;
            bz.quitarMoneda.idPasarela = id;
            pasarelasService.pasarelaMonedas(id).then(function (res) {
                if(res != undefined){
                    bz.pasarelasMonedas = res.data;
                }
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.guardarPasarela = function (datos, v) {
            if (v) {
                bz.peticion = true;
                pasarelasService.guardarPasarela(datos).then(function (res) {
                    if (res == undefined){
                        return notificacionService.mensaje('La pasarela ya existe.');
                    }
                    datos.idPasarela = res.data.insertId;
                    bz.pasarelas.push(datos);
                    notificacionService.mensaje('Registro Exitoso.');
                }).finally(function () {
                    bz.peticion = false;
                })
            }
        }

        bz.modificarPasarela = function (datos, v) {
            if (v) {
                bz.peticion = true;
                pasarelasService.modificarPasarela(datos).then(function (res) {
                    bz.pasarelas[bz.index] = datos;
                    bz.editarPasarela = {};
                    notificacionService.mensaje('Modificacion Exitosa.');
                }).finally(function () {
                    bz.peticion = false;
                })
            }
        }

        bz.borrarPasarela = function (datos, index) {
            bz.peticion = true;
            pasarelasService.borrarPasarela(datos).then(function (res) {
                bz.pasarelas.splice(index, 1);
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.asignarMoneda = function (datos) {
            bz.peticion = true;
            pasarelasService.asignarMoneda(datos).then(function (res) {
                if(res == undefined){
                    return notificacionService.mensaje('La moneda seleccionada ya esta asignada.');      
                }
                notificacionService.mensaje('Asignación Exitosa.');
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.desasignarMoneda = function (id, index) {
            bz.peticion = true;
            bz.quitarMoneda.idMoneda = id;
            pasarelasService.desasignarMoneda(bz.quitarMoneda).then(function (res) {
                bz.pasarelasMonedas.splice(index, 1);
                notificacionService.mensaje('Moneda Desasignada.');
            }).finally(function () {
                bz.peticion = false;
            })
        }


    }])