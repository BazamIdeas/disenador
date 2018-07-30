angular.module("administrador")

    .controller('categoriasController', ['$scope', 'categoriasService', 'notificacionService', function ($scope, categoriasService, notificacionService) {

        var bz = this;

        /* objeto datos vacios */

        bz.datos = {
            modCategoria: {},
            nuevaCategoria: {},
            modPreferencia: {},
            nuevaPreferencia: {}
        };

        /* LISTAR */

        bz.listarCategorias = function (tipoCategoria) {
            bz.peticion = true;
            bz.opcionesCategorias = null;
            bz.cats = [];
            categoriasService.listarCategorias({
                tipo: tipoCategoria
            }).then(function (res) {

                if (res == undefined) return notificacionService.mensaje('No hay categorias.');
                bz.cats = res.data;

            }).catch(function (res) {
                notificacionService.mensaje(res);
            }).finally(function () {
                bz.peticion = false;
            })
        }
        
        bz.mostrarC = true;
        bz.f = true;

/*         categoriasService.listarPreferencias().then(function (res) {
            bz.prefs = res.data;
        }).catch(function (res) {
            notificacionService.mensaje(res);
        }).finally(function () {
            bz.peticion = false;
        })
 */

        /* MODIFICAR */

        bz.modificarElemento = function (datos, opcion, v) {
            if (!v) return notificacionService.mensaje('Rellene los campos de forma correcta!');

            if (opcion == 'categoria') {
                bz.peticion = true;
                categoriasService.modificarCategoria(datos).then(function () {
                    notificacionService.mensaje('Modificacion Exitosa');
                    bz.cats[bz.elementoActivoIndex].nombreCategoria = datos.nombreCategoria;
                    bz.modNombre = datos.nombreCategoria;
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                }).finally(function () {
                    bz.peticion = false;
                })
            } else {
                bz.peticion = true;
                categoriasService.modificarPreferencia(datos).then(function () {
                    notificacionService.mensaje("Modificación Exitosa!");
                    bz.prefs[bz.elementoActivoIndex].nombre1 = datos.nombre1;
                    bz.prefs[bz.elementoActivoIndex].nombre2 = datos.nombre2;
                    bz.modNombre = datos.nombre1 + ' y ' + datos.nombre2;
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                }).finally(function () {
                    bz.peticion = false;
                })
            }
        }

        /* CREAR */

        bz.crear = function (datos, opcion, v) {
            if (!v) return notificacionService.mensaje('Rellene los campos de forma correcta!');

            if (opcion == 'categoria') {
                bz.peticion = true;
                categoriasService.nuevaCategoria(datos).then(function (res) {
                    notificacionService.mensaje('Registro Existoso');
                    datos.idCategoria = res.data.insertId;
                    bz.cats.push(datos);
                    bz.datos.nuevaCategoria = {};
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                }).finally(function () {
                    bz.peticion = false;
                })
            } else {
                bz.peticion = true;
                categoriasService.nuevaPreferencia(datos).then(function (res) {
                    notificacionService.mensaje('Registro Exitoso!');
                    datos.idPreferencia = res.data.insertId;
                    bz.prefs.push(datos);
                    bz.datos.nuevaPreferencia = {};
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                }).finally(function () {
                    bz.peticion = false;
                })
            }
        }

        /* ELIMINAR 

        bz.eliminar = function (id, opcion, index) {
            if (opcion == 'categoria') {
                bz.peticion = true;
                categoriasService.eliminarCategoria(id).then(function (res) {
                    notificacionService.mensaje('Eliminada!');
                    bz.cats.splice(index, 1);
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                }).finally(function () {
                    bz.peticion = false;
                })
            } else {
                bz.peticion = true;
                categoriasService.eliminarPreferencia(id).then(function (res) {
                    notificacionService.mensaje('Eliminada!');
                    bz.prefs.splice(index, 1);
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                }).finally(function () {
                    bz.peticion = false;
                })
            }
        }

        */

    }])