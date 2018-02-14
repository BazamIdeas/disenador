angular.module("administrador")

    .controller('usuarioController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'clientesServiceAdmin', 'clientesService', 'SweetAlert', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, clientesServiceAdmin, clientesService, SweetAlert, notificacionService) {

        var bz = this;
        bz.loaderMostrar = true;
        bz.usuarios = [];

        bz.actual = clientesService.autorizado().nombre

        /* LISTAR TODOS LOS CLIENTES */

        bz.listarU = function () {
            bz.mostrarU = !bz.mostrarU;

            clientesServiceAdmin.listarUsuarios().then(function (res) {
                bz.loaderMostrar = false;
                bz.usuarios = res.data;
            }).catch(function (res) {
                notificacionService.mensaje(res);
            });
        };

        bz.listarU()

        /* objeto datos vacios */
        this.datos = {

            registrar: {},
            modificar: {}

        };

        /* REGISTRAR ADMINISTRADOR */

        bz.registrarU = function (datos, validado) {
            if (validado) {
                bz.loaderCargando = true;
                clientesService.registrar(datos).then(function (res) {
                        bz.loaderCargando = false;
                        SweetAlert.swal("Genial", "Registro Exitoso!", "success");
                        document.getElementById("formularioRegistro").reset();
                    })
                    .catch(function (res) {
                        bz.loaderCargando = false;
                        notificacionService.mensaje(res);
                    })
            }
        };

        /* MODIFICAR UN USUARIO */

        bz.modificarUsuario = function (id, nombre, index) {

            bz.mostrarMo = !bz.mostrarMo;
            bz.uMod = nombre;
            bz.idUsuario = id;

            bz.datos.modificar.idUsuario = id;

            bz.index = index;

        };

        bz.modificarU = function (datos, validado) {
            if (validado) {
                clientesService.modificarU(datos).then(function (res) {
                    bz.loaderCargando = false;
                    bz.usuarios[bz.index].nombreUser = datos.nombreUser;
                    bz.uMod = datos.nombreUser;
                    notificacionService.mensaje('Modificacion Exitosa!');
                    document.getElementById("formularioModificar").reset();
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                    bz.loaderCargando = false;
                });
            }
        };

        bz.eliminarU = function (id, index) {
            clientesServiceAdmin.borrarUsuario(id).then(function (res) {
                SweetAlert.swal("Eliminado", "", "error");
                bz.usuarios.splice(index, 1);
            }).catch(function (res) {
                notificacionService.mensaje(res);
            });
        };


    }])