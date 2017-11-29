angular.module("administrador")

    .controller('elementosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'iconoFuente', 'categoriasService', 'notificacionService', "SweetAlert", function ($state, $mdSidenav, $mdDialog, $scope, iconoFuente, categoriasService, notificacionService, SweetAlert) {

        var bz = this;

        /* objeto datos vacios */
        bz.registroFuente = {};
        bz.registroIcono = {};
        bz.listar = {};

        bz.nuevaFuente = function (datos) {
            iconoFuente.nuevaFuente(datos).then(function (res) {
                SweetAlert.swal("Genial", "Fuente Agregada!", "success");
            }).catch(function (res) {
                console.log(res)
            })
        }

        bz.nuevoIcono = function (datos) {
            iconoFuente.nuevoIcono(datos).then(function (res) {
                SweetAlert.swal("Genial", 'Icono Agregado', "success");
            }).catch(function (res) {
                console.log(res)
            })
        }

        bz.listado = function (tipo) {
            bz.listar.tipo = tipo;

            iconoFuente.listar(bz.listar).then(function (res) {
                bz.elementos = res.data;
                console.log(res)
            }).catch(function (res) {
                console.log(res)
            })
        }

        bz.categorias = [];
        bz.preferencias = [];

        categoriasService.listarCategorias().then(function (res) {
            angular.forEach(res.data, function (valor, llave) {
                bz.categorias.push(valor);
            })
        })

        categoriasService.listarPreferencias().then(function (res) {
            angular.forEach(res.data, function (valor, llave) {
                valor.valor = 2;
                bz.preferencias.push(valor);
            })
            bz.registroFuente.datoPrefe = bz.preferencias;
            bz.registroIcono.datoPrefe = bz.preferencias;
            bz.listar.preferencias = bz.preferencias;
        })
    }])