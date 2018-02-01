angular.module("administrador")

    .controller('paisesController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'iconoFuente', 'categoriasService', 'Upload', 'notificacionService', 'monedasService', 'paisesService', function ($state, $mdSidenav, $mdDialog, $scope, iconoFuente, categoriasService, Upload, notificacionService, monedasService, paisesService) {

        var bz = this;

        /*DATOS*/
        bz.nuevoPais= {};
        bz.editarPais = {};
        bz.monedasPasarela = {};
        bz.quitarMoneda = {};
        bz.ponerMoneda = {};


        monedasService.listarMonedas().then(function (res) {
            bz.monedas = res.data;
        })

        bz.mostrar = function (opcion, id) {
            if (opcion == 'editarPais') {

                angular.forEach(bz.paises, function (valor) {
                    if(valor.idPais == id){
                        bz.editarPais = valor;
                        bz.editarPais.id = id;
                    }
                })
                bz.acciones = 2;

            } else if (opcion == 'asignar') {

                angular.forEach(bz.paises, function (valor) {
                    if (valor.idPais == id) {
                        bz.ponerMoneda.idPais = valor.idPais;
                    }
                })
                bz.acciones = 3;
            }
        }

        bz.listarPaises = function () {
            bz.listaP = !bz.listaP;
            paisesService.listarPaises().then(function (res) {
                bz.paises = res.data;
            }).catch(function(){
                notificacionService.mensaje('No hay paises registrados.');
            })
        }

        bz.listarPaises();

        bz.guardarPais = function (datos, v) {
            if (v) {
                paisesService.guardarPais(datos).then(function (res) {
                    if (res == undefined) {
                        return notificacionService.mensaje('El pais ya existe.');
                    }
                    datos.idPais = res.data.insertId;
                    bz.paises.push(datos);
                    return notificacionService.mensaje('El pais ha si añadido.');
                })
            }
        }

        bz.modificarPais = function (datos, v) {
            if (v) {
                paisesService.modificarPais(datos).then(function (res) {
                    notificacionService.mensaje('Modificación Exitosa.');
                })
            }
        }

        bz.borrarPais = function (datos, index) {
            paisesService.borrarPais(datos).then(function (res) {
                bz.monedas.splice(index, 1);
            })
        }

        bz.listarPaisMonedas = function (id) {
            bz.acciones = 4;
            bz.quitarMoneda.idPais = id;
            paisesService.paisMonedas(id).then(function (res) {
                bz.paisMonedas = res.data;
            })
        }

        bz.asignarMoneda = function (datos) {
            paisesService.asignarMoneda(datos).then(function (res) {
                notificacionService.mensaje('Asignación Exitosa.');
            })
        }

        bz.desasignarMoneda = function (id, index) {
            bz.quitarMoneda.idMoneda = id;
            paisesService.desasignarMoneda(bz.quitarMoneda).then(function (res) {
                bz.paisMonedas.splice(index, 1);
                notificacionService.mensaje('Moneda Desasignada.');
            })
        }

    }])