angular.module("administrador")

    .controller('monedasController', ['$scope', 'notificacionService', 'monedasService', 'pasarelasService', 'monedasValue', function ($scope, notificacionService, monedasService, pasarelasService, monedasValue) {

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

        bz.listarMonedas = function (v) {
            if (!v) return bz.listaM = !bz.listaM;
            bz.peticion = true;

            monedasService.listarMonedas().then(function (res) {
                bz.monedas = res.data;
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.listarMonedas(true);


        bz.guardarMoneda = function (datos, v) {
            if (!v) return;
            bz.peticion = true;

            monedasService.guardarMoneda(datos).then(function (res) {

                if (res == undefined) return notificacionService.mensaje('La moneda ya existe.');

                datos.idMoneda = res.data.result;
                bz.monedas.push(datos);

                return notificacionService.mensaje('Registro Exitoso.');
            }).finally(function () {
                bz.peticion = false;
            })

        }

        bz.modificarMoneda = function (datos, v) {
            if (!v) return;
            bz.peticion = true;
            monedasService.modificarMoneda(datos).then(function () {
                bz.monedas[bz.index] = datos;
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.borrarMoneda = function (id, index) {
            bz.peticion = true;
            monedasService.borrarMoneda({
                idMoneda: id
            }).then(function () {
                bz.monedas.splice(index, 1);
            }).finally(function () {
                bz.peticion = false;
            })
        }


        /*  PASARELAS */


        bz.listarPasarelas = function () {
            bz.peticion = true;
            bz.listaP = !bz.listaP;
            bz.acciones = 0;
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
                if (res != undefined) bz.pasarelasMonedas = res.data;
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.guardarPasarela = function (datos, v) {
            if (!v) return;
            bz.peticion = true;
            pasarelasService.guardarPasarela(datos).then(function (res) {
                if (res == undefined) return notificacionService.mensaje('La pasarela ya existe.');
                datos.idPasarela = res.data.insertId;
                bz.pasarelas.push(datos);
                notificacionService.mensaje('Registro Exitoso.');
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.modificarPasarela = function (datos, v) {
            if (!v) return;
            bz.peticion = true;
            pasarelasService.modificarPasarela(datos).then(function () {
                bz.pasarelas[bz.index] = datos;
                bz.editarPasarela = {};
                notificacionService.mensaje('Modificacion Exitosa.');
            }).finally(function () {
                bz.peticion = false;
            })

        }

        bz.borrarPasarela = function (datos, index) {
            bz.peticion = true;
            pasarelasService.borrarPasarela(datos).then(function () {
                bz.pasarelas.splice(index, 1);
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.asignarMoneda = function (datos, v) {
            if (!v) return notificacionService.mensaje('Rellene los campos de forma correcta!');

            bz.peticion = true;
            pasarelasService.asignarMoneda(datos).then(function (res) {
                if (res == undefined) return notificacionService.mensaje('La moneda seleccionada ya esta asignada.');

                notificacionService.mensaje('Asignación Exitosa.');
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.desasignarMoneda = function (id, index) {
            bz.peticion = true;
            bz.quitarMoneda.idMoneda = id;
            pasarelasService.desasignarMoneda(bz.quitarMoneda).then(function () {
                bz.pasarelasMonedas.splice(index, 1);
                notificacionService.mensaje('Moneda Desasignada.');
            }).finally(function () {
                bz.peticion = false;
            })
        }


    }])