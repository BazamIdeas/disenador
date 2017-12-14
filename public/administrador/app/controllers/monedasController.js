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
            monedasService.listarMonedas().then(function (res) {
                bz.monedas = res.data;
            })
        }

        bz.listarMonedas(true);


        bz.guardarMoneda = function (datos, v) {
            if (v) {
                monedasService.guardarMoneda(datos).then(function (res) {
                    if (res == undefined) {
                        return notificacionService.mensaje('La moneda ya existe.');
                    }
                    datos.idMoneda = res.data.result;
                    bz.monedas.push(datos);
                    return notificacionService.mensaje('Registro Exitoso.');
                })
            }
        }

        bz.modificarMoneda = function (datos, v) {
            console.log(datos)
            if (v) {
                monedasService.modificarMoneda(datos).then(function (res) {
                    console.log(res)
                    bz.monedas[bz.index] = datos;
                })
            }
        }

        bz.borrarMoneda = function (id, index) {
            datos = {
                idMoneda: id
            }
            monedasService.borrarMoneda(datos).then(function (res) {
                bz.monedas.splice(index, 1);
                console.log(res)
            })
        }


        /*  PASARELAS */


        bz.listarPasarelas = function () {
            bz.listaP = !bz.listaP;
            pasarelasService.listarPasarelas().then(function (res) {
                bz.pasarelas = res.data;
            })
        }

        bz.listarPasarelaMonedas = function (id) {
            bz.acciones = 6;
            bz.quitarMoneda.idPasarela = id;
            pasarelasService.pasarelaMonedas(id).then(function (res) {
                bz.pasarelasMonedas = res.data;
            })
        }

        bz.guardarPasarela = function (datos, v) {
            if (v) {
                pasarelasService.guardarPasarela(datos).then(function (res) {
                    if (res == undefined){
                        return notificacionService.mensaje('La pasarela ya existe.');
                    }
                    datos.idPasarela = res.data.insertId;
                    bz.pasarelas.push(datos);
                    notificacionService.mensaje('Registro Exitoso.');
                })
            }
        }

        bz.modificarPasarela = function (datos, v) {
            if (v) {
                pasarelasService.modificarPasarela(datos).then(function (res) {
                    bz.pasarelas[bz.index] = datos;
                    notificacionService.mensaje('Modificacion Exitosa.');
                })
            }
        }

        bz.borrarPasarela = function (datos, index) {
            pasarelasService.borrarPasarela(datos).then(function (res) {
                bz.pasarelas.splice(index, 1);
                console.log(res)
            })
        }

        bz.asignarMoneda = function (datos) {
            pasarelasService.asignarMoneda(datos).then(function (res) {
                if(res == undefined){
                    return notificacionService.mensaje('La moneda seleccionada ya esta asignada.');      
                }
                notificacionService.mensaje('Asignación Exitosa.');
            })
        }

        bz.desasignarMoneda = function (id, index) {
            bz.quitarMoneda.idMoneda = id;
            pasarelasService.desasignarMoneda(bz.quitarMoneda).then(function (res) {
                bz.pasarelasMonedas.splice(index, 1);
                notificacionService.mensaje('Moneda Desasignada.');
            })
        }


    }])