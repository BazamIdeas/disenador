angular.module("administrador")

    .controller('paisesController', ['$scope', 'notificacionService', 'monedasService', 'paisesService', 'paisesValue', function ($scope, notificacionService, monedasService, paisesService, paisesValue) {

        var bz = this;

        /*DATOS*/
        bz.nuevoPais = {};
        bz.editarPais = {};
        bz.monedasPasarela = {};
        bz.quitarMoneda = {};
        bz.ponerMoneda = {};
        bz.paisesLista = [];

        angular.forEach(paisesValue, function (value, key) {
            bz.paisesLista.push({
                iso: key,
                moneda: value
            });
        });


        monedasService.listarMonedas().then(function (res) {
            bz.monedas = res.data;

            angular.forEach(bz.monedas, function (value) {
                if (value.moneda == 'USD') {
                    bz.nuevoPais.idMoneda = value.idMoneda;
                }
            });
        });

        bz.listarPaises = function () {
            bz.peticion = true;
            bz.listaP = !bz.listaP;
            paisesService.listarPaises().then(function (res) {
                bz.paises = res.data;
            }).catch(function () {
                notificacionService.mensaje('No hay paises registrados.');
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.listarPaises();

        bz.guardarPais = function (datos, v) {

            datos.iso = datos.pais.iso
            datos.moneda = datos.pais.iso
            datos.nombre = datos.pais.moneda

            if (!v) return;
            bz.peticion = true;
            paisesService.guardarPais(datos).then(function (res) {
                if (res == undefined) return notificacionService.mensaje('El pais ya existe.');

                datos.idPais = res.data.insertId;
                bz.paises.push(datos);
                bz.nuevoPais = {};
                return notificacionService.mensaje('El pais ha si añadido.');
            }).finally(function () {
                bz.peticion = false;
            })

        }

        bz.modificarPais = function (datos, v) {
            if (!v) return;
            bz.peticion = true;
            paisesService.modificarPais(datos).then(function () {
                notificacionService.mensaje('Modificación Exitosa.');
            }).finally(function () {
                bz.peticion = false;
            })

        }

        bz.borrarPais = function (datos, index) {
            bz.peticion = true;
            paisesService.borrarPais(datos).then(function () {
                bz.monedas.splice(index, 1);
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.listarPaisMonedas = function (id) {
            bz.peticion = true;
            bz.acciones = 4;
            bz.quitarMoneda.idPais = id;
            paisesService.paisMonedas(id).then(function (res) {
                if (res != undefined) return bz.paisMonedas = res.data;

            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.asignarMoneda = function (datos, v) {
            if (!v) return notificacionService.mensaje('Rellene los campos de forma correcta!');

            bz.peticion = true;
            paisesService.asignarMoneda(datos).then(function (res) {
                if (res == undefined) return notificacionService.mensaje('La moneda seleccionada ya esta asignada.');

                notificacionService.mensaje('Asignación Exitosa.');
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.desasignarMoneda = function (id, index) {

            bz.peticion = true;
            bz.quitarMoneda.idMoneda = id;
            paisesService.desasignarMoneda(bz.quitarMoneda).then(function (res) {
                bz.paisMonedas.splice(index, 1);
                notificacionService.mensaje('Moneda Desasignada.');
            }).finally(function () {
                bz.peticion = false;
            })
        }

    }])