angular.module("administrador")

    .controller('idiomasController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'Upload', 'notificacionService', "idiomasService", "monedasValue", function ($state, $mdSidenav, $mdDialog, $scope, Upload, notificacionService, idiomasService, monedasValue) {

        var bz = this;

        bz.nuevoIdioma = {};
        bz.editarIdioma = {};
        bz.idiomasDisponibles = monedasValue;

        idiomasService.listarIdiomas().then(function (res) {
            bz.idiomas = res;
            bz.listaM = !bz.listaM;
        })

        bz.guardarIdioma = function (datos, v) {
            if (!v) return notificacionService.mensaje('Verifique los campos del formulario')
            idiomasService.guardarIdioma(datos).then(function (res) {
                datos._id = res.insertId;
                bz.idiomas.push(datos);
                bz.nuevoIdioma = {};
            })
        }

        bz.modificarIdioma = function (datos, v) {
            if (!v) return notificacionService.mensaje('Verifique los campos del formulario')
            idiomasService.modificarIdioma(datos).then(function (res) {
                notificacionService.mensaje('Modificado')
            })
        }

        bz.borrarIdioma = function (id, i) {
            idiomasService.borrarIdioma(id).then(function (res) {
                notificacionService.mensaje('Eliminado')
                bz.idiomas.splice(i, 1);
            })
        }

        bz.mostrar = function (params) {
            if (params.op == 'editar') {
                bz.acciones = 2;
                bz.editarIdioma = params.item;
            }
        }

    }])