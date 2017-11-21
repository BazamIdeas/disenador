angular.module("disenador-de-logos")

    /* Planes*/

    .controller('planesController', ['$scope', 'planesService', 'ipService', '$rootScope', 'LS', '$stateParams', '$state', 'clientesService', '$q', "historicoResolve", function ($scope, planesService, ipService, $rootScope, LS, $stateParams, $state, clientesService, $q, historicoResolve) {

        var bz = this;

        /* LOCAL STORAGE */
        /*
        this.definirInfo = function (llave, datos) {
            return LS.definir(llave, datos);
        }

        if ($stateParams.logo) {
            this.definirInfo($state.current.name, $stateParams);
            this.datosEstadoAnterior = $stateParams;

        } else if (LS.obtener($state.current.name)) {

            this.datosEstadoAnterior = angular.fromJson(LS.obtener($state.current.name));
        } else {
            $state.go('editor');
        }
        
        */

        bz.datos = {
            planes: [],
            moneda: "USD",
            monedas: [],
            pedido: historicoResolve
        }

        bz.listarPlanes = function () {
            planesService.listar().then(function (res) {

                var planes_usa = [];

                angular.forEach(res, function (valor, llave) {

                    if (valor.isoPais == bz.datos.isoPais) {

                        bz.datos.planes.push(valor);

                    }

                    if (valor.isoPais == "US") {

                        planes_usa.push(valor);

                    }

                })

                if (!bz.datos.planes.length) {

                    bz.datos.planes = planes_usa;

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



        /*
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


*/



        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('login');

        });



    }])
