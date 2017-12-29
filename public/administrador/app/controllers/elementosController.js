angular.module("administrador")

    .controller('elementosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'iconoFuente', 'categoriasService', 'notificacionService', "SweetAlert", function ($state, $mdSidenav, $mdDialog, $scope, iconoFuente, categoriasService, notificacionService, SweetAlert) {

        var bz = this;

        /* objeto datos vacios */
        bz.registroFuente = {};
        bz.registroIcono = {};
        bz.modificar = {};
        bz.listar = {};

        bz.mostrar = function (tipo) {
            if (tipo == 'ICONO') {
                bz.rIcono = !bz.rIcono;
                return bz.listarCategorias(tipo);
            }
            bz.rFuente = !bz.rFuente;
            bz.listarCategorias(tipo);
        }


        bz.nuevaFuente = function (datos) {
            bz.valMulFonts = true;
            if (bz.regFmArchivos) {
                return bz.subidaMasiva(datos);
            } else {
                iconoFuente.nuevaFuente(datos).then(function (res) {
                    SweetAlert.swal("Genial", "Fuente Agregada!", "success");
                    datos.idElemento = res.data.insertId;
                    datos.tipo = 'FUENTE';
                    bz.valMulFonts = false;
                }).catch(function (res) {
                    console.log(res)
                })
            }
        }

        bz.nuevoIcono = function (datos) {
            bz.valMulIcons = true;
            if (bz.regImArchivos) {
                return bz.subidaMasiva(datos);
            } else {
                iconoFuente.nuevoIcono(datos).then(function (res) {
                    datos.idElemento = res.data.insertId;
                    datos.tipo = 'ICONO';
                    SweetAlert.swal("Genial", 'Icono Agregado', "success");
                    bz.valMulIcons = false;
                }).catch(function (res) {
                    console.log(res)
                })
            }
        }

        bz.subidaMasiva = function (datos) {
            iconoFuente.subidaMasiva(datos).then(function (res) {
                SweetAlert.swal("Genial", "Datos Agregados!", "success");
                bz.valMulFonts = false;
                bz.valMulIcons = false;
            }).catch(function (res) {
                console.log(res)
            })
        }

        bz.listado = function (tipo) {
            bz.listar.tipo = tipo;

            iconoFuente.listar(bz.listar).then(function (res) {
                bz.elementos = res.data;
            }).catch(function (res) {
                console.log(res)
            })
        }

        bz.categorias = [];
        bz.preferencias = [];

        bz.listarCategorias = function (tipoCategoria) {
            bz.tipoListado = tipoCategoria;
            datos = {
                tipo: tipoCategoria
            }
            categoriasService.listarCategorias(datos).then(function (res) {
                if (res == undefined) {
                    bz.categorias = [];
                    bz.elementos = [];
                    return notificacionService.mensaje('No hay categorias.');
                }
                bz.categorias = res.data;
            })
        }


        categoriasService.listarPreferencias().then(function (res) {
            angular.forEach(res.data, function (valor, llave) {
                valor.valor = 2;
                bz.preferencias.push(valor);
            })
            bz.registroFuente.datoPrefe = bz.preferencias;
            bz.registroIcono.datoPrefe = bz.preferencias;
            bz.modificar.preferencias = bz.preferencias;
            bz.listar.preferencias = bz.preferencias;
        })

        bz.mostrarModificar = function (index) {
            bz.mod = true;
            bz.modificarElemento.idElemento = bz.elementos[index].idElemento;
        }

        bz.modificarElemento = function (datos) {
            iconoFuente.modificarPreferencias(datos).then(function (res) {
                bz.mod = false;
                SweetAlert.swal("Genial", res.data.result, "success");
            }).catch(function (res) {
                console.log(res)
            })
        }
    }])