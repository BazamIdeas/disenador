angular.module("administrador")

    .controller('categoriasController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'categoriasService', 'SweetAlert', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, categoriasService, SweetAlert, notificacionService) {

        var bz = this;
        
        bz.opcionesCategorias = 0;
        bz.cats = [];
        bz.prefs = [];

        /* objeto datos vacios */

        this.datos = {
            modCategoria: {},
            nuevaCategoria: {},
            modPreferencia: {},
            nuevaPreferencia: {}
        };

        /* LISTAR */

        bz.listarCategorias = function (tipoCategoria) {
            bz.cats = [];
            var datos = {
                tipo: tipoCategoria
            }
            categoriasService.listarCategorias(datos).then(function (res) {
                if (res == undefined) {
                    return notificacionService.mensaje('No hay categorias.');
                }
                bz.cats = res.data;

            })
        }

        bz.listarPreferencias = function () {

            bz.prefs = [];
            categoriasService.listarPreferencias().then(function (res) {
                bz.prefs = res.data;
            })

        }

        bz.listarPreferencias();

        /* MODIFICAR */

        bz.modificarEm = function (id, opcion, index, nombre, nombre2) {

            bz.elementoActivoIndex = index;

            if (opcion == 'categoria') {
                bz.opcionesCategorias = 1;
                bz.datos.modCategoria.idCategoria = id;
                bz.modNombre = nombre;
            } else {
                bz.opcionesCategorias = 2;
                bz.datos.modPreferencia.idPreferencia = id;
                bz.modNombre = {
                    nombre1: nombre,
                    nombre2: nombre2
                };
            }

            bz.mostrarOpciones = !bz.mostrarOpciones;

        }

        bz.modificarElemento = function (datos, opcion) {

            if (opcion == 'categoria') {
                categoriasService.modificarCategoria(datos).then(function (res) {
                        notificacionService.mensaje('Modificacion Exitosa');
                        bz.cats[bz.elementoActivoIndex].nombreCategoria = datos.nombreCategoria;
                        bz.modNombre = datos.nombreCategoria;
                    })
                    .catch(function (res) {
                        notificacionService.mensaje(res);
                    })
            } else {
                categoriasService.modificarPreferencia(datos).then(function (res) {
                        notificacionService.mensaje("Modificación Exitosa!");
                        bz.prefs[bz.elementoActivoIndex].nombre1 = datos.nombre1;
                        bz.prefs[bz.elementoActivoIndex].nombre2 = datos.nombre2;
                        bz.modNombre = datos.nombre1 + ' y ' + datos.nombre2;
                    })
                    .catch(function (res) {
                        notificacionService.mensaje(res);
                    })
            }
        }

        /* CREAR */

        bz.crear = function (datos, opcion) {
            if (opcion == 'categoria') {
                categoriasService.nuevaCategoria(datos).then(function (res) {
                        notificacionService.mensaje('Registro Existoso');
                        datos.idCategoria = res.data.insertId;
                        bz.cats.push(datos);
                        bz.datos.nuevaCategoria = {};
                    })
                    .catch(function (res) {
                        notificacionService.mensaje(res);
                    })
            } else {
                categoriasService.nuevaPreferencia(datos).then(function (res) {
                        notificacionService.mensaje('Registro Exitoso!');
                        datos.idPreferencia = res.data.insertId;
                        bz.prefs.push(datos);
                        bz.datos.nuevaPreferencia = {};
                    })
                    .catch(function (res) {
                        notificacionService.mensaje(res);
                    })
            }
        }

        /* ELIMINAR */

        bz.eliminar = function (id, opcion, index) {
            if (opcion == 'categoria') {
                categoriasService.eliminarCategoria(id).then(function (res) {
                        notificacionService.mensaje('Eliminada!');
                        bz.cats.splice(index, 1);
                        bz.listar('categoria');
                    })
                    .catch(function (res) {
                        notificacionService.mensaje(res);
                    })
            } else {
                categoriasService.eliminarPreferencia(id).then(function (res) {
                        notificacionService.mensaje('Eliminada!');
                        bz.prefs.splice(index, 1);
                        bz.listar('preferencia');
                    })
                    .catch(function (res) {
                        notificacionService.mensaje(res);
                    })
            }
        }

        bz.mostrarCat = function () {
            bz.mostrarC = !bz.mostrarC;
            bz.f = bz.mostrarC ? true : false;
        }

    }])