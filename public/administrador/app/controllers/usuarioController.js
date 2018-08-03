angular.module("administrador")

    .controller('usuarioController', ['$scope', 'clientesServiceAdmin', 'clientesService', 'SweetAlert', 'notificacionService', function ($scope, clientesServiceAdmin, clientesService, SweetAlert, notificacionService) {

        var bz = this;
        bz.loaderMostrar = true;
        bz.usuarios = [];

        bz.actual = clientesService.autorizado().nombre

        /* LISTAR TODOS LOS CLIENTES */

        bz.listarU = function () {
            bz.mostrarU = !bz.mostrarU;
            bz.peticion = true;
            clientesServiceAdmin.listarUsuarios().then(function (res) {
                bz.loaderMostrar = false;
                bz.usuarios = res.data;
            }).catch(function (res) {
                notificacionService.mensaje(res);
            }).finally(function () {
                bz.peticion = false;
            });
        };

        bz.listarU()

        /* objeto datos vacios */
        bz.datos = {
            registrar: {},
            modificar: {}
        };

        /* REGISTRAR ADMINISTRADOR */

        bz.registrarU = function (datos, validado) {
            if (!validado) return;
            bz.peticion = true;
            bz.loaderCargando = true;
            clientesService.registrar(datos).then(function (res) {
                bz.loaderCargando = false;
                SweetAlert.swal("Genial", "Registro Exitoso!", "success");
                bz.datos.registrar = {};
                datos.idUsuario = res.data.insertId
                bz.usuarios.push(datos)
            }).catch(function () {
                bz.loaderCargando = false;
            }).finally(function () {
                bz.peticion = false;
            })

        };

        /* MODIFICAR UN USUARIO */

        bz.modificarUsuario = function (id, nombre, index) {

            bz.mostrarMo = !bz.mostrarMo;
            bz.uMod = nombre;
            bz.idUsuario = id;
            bz.datos.modificar.idUsuario = id;
            bz.index = index;

        };

        bz.modificarU = function (datos, v) {
            if (!v) return;
            bz.peticion = true;
            clientesService.modificarU(datos).then(function (res) {
                bz.loaderCargando = false;
                bz.usuarios[bz.index].nombreUser = datos.nombreUser;
                bz.uMod = datos.nombreUser;
                notificacionService.mensaje('Modificacion Exitosa!');
                document.getElementById("formularioModificar").reset();
            }).catch(function (res) {
                notificacionService.mensaje(res);
                bz.loaderCargando = false;
            }).finally(function () {
                bz.peticion = false;
            });

        };

        bz.eliminarU = function (id, index) {
            bz.peticion = true;
            clientesServiceAdmin.borrarUsuario(id).then(function (res) {
                SweetAlert.swal("Eliminado", "", "error");
                bz.usuarios.splice(index, 1);
            }).catch(function (res) {
                notificacionService.mensaje(res);
            }).finally(function () {
                bz.peticion = false;
            });
        };


    }])