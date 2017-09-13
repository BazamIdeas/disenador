angular.module("disenador-de-logos")

    /* Planes*/

    .controller('planesController', ['$scope', 'planesService', 'ipService', '$rootScope', 'LS', '$stateParams', '$state', 'clientesService', function ($scope, planesService, ipService, $rootScope, LS, $stateParams, $state, clientesService) {

        var bz = this;

        /* LOCAL STORAGE */

        this.definirInfo = function (llave, datos) {
            return LS.definir(llave, datos);
        }

        if ($stateParams.logo) {
            this.definirInfo($state.current.name, $stateParams);
            this.datosEstadoAnterior = $stateParams;

        } else if (LS.obtener($state.current.name)) {

            this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
        } else {
            $state.go('editor');
        }

        bz.datos = {
            planes: [],
            moneda: "USD",
            monedas: [],
            pedido: this.datosEstadoAnterior
        }

        bz.listarPlanes = function () {
            planesService.listar().then(function (res) {
                for (i = 0; i < res.length; i++) {
                    if (res[i].isoPais == bz.datos.isoPais) {
                        bz.datos.planes.push(res[i]);
                    }
                }
            }).catch(function (res) {
                console.log(res)
            })
        }


        ipService.obtenerDatos().then(function (res) {
            bz.datos.isoPais = res.countryCode;

            if (bz.datos.isoPais) {
                bz.listarPlanes();
            }
        })

        bz.autorizado = clientesService.autorizado();

        bz.realizarPedido = function (idPrecio, localidad) {
            bz.datos.pedido.idPrecio = idPrecio;
            bz.datos.pedido.localidad = localidad;

            $state.go('metodo', {
                logo: bz.datos.pedido.logo,
                tipoLogo: bz.datos.pedido.tipoLogo,
                localidad: bz.datos.pedido.localidad,
                idElemento: bz.datos.pedido.idElemento,
                idPrecio: bz.datos.pedido.idPrecio,
            });
        }

    }])