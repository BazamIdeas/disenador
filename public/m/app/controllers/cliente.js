angular.module("disenador-de-logos")


    /* Cliente */

    .controller('clienteController', ['$scope', "$stateParams", 'logosService', '$state', 'LS', '$base64', 'currentAuth', '$window', "SweetAlert", "$http", "clientesService", function ($scope, $stateParams, logosService, $state, LS, $base64, currentAuth, $window, SweetAlert, $http, clientesService) {

        var bz = this;



        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }

        bz.codificar = function (icono) {

            return $base64.encode(icono);

        }

        /* LOCAL STORAGE */

        this.definirInfo = function (llave, datos) {
            return LS.definir(llave, datos);
        }

        if ($stateParams) {
            this.definirInfo($state.current.name, $stateParams);
            this.datosEstadoAnterior = $stateParams;

        } else if (LS.obtener($state.current.name)) {

            this.datosEstadoAnterior = angular.fromJson(LS.obtener($state.current.name));
        } else {
            $state.go('opciones');
        }


        /* LISTAR LOGOS */

        bz.mostrarG = function () {
            logosService.mostrarGuardados().then(function (res) {
                bz.lGuardados = res.data;

            }).catch(function (res) {
                bz.notifyG = true;
            })
        }

        bz.mostrarC = function () {
            logosService.mostrarComprados().then(function (res) {
                bz.lComprados = res.data;

            }).catch(function (res) {
                bz.notifyC = true;
            })
        }

        bz.mostrarG();
        bz.mostrarC();


        this.datosComprados = [];
        this.datosGuardados = [];

        /* EFECTO HOVER */

        this.efectoHoverG = function (indice, valor) {
            if (!this.datosGuardados[indice]) {
                this.datosGuardados[indice] = valor;
                this.lGuardados[indice].mostrar = true;
            } else {
                delete this.datosGuardados[indice];
                this.lGuardados[indice].mostrar = false;
            }
        }

        /* EFECTO HOVER */

        this.efectoHoverC = function (indice, valor) {

            if (!this.datosComprados[indice]) {
                this.datosComprados[indice] = valor;
                this.lComprados[indice].mostrar = true;
            } else {
                delete this.datosComprados[indice];
                this.lComprados[indice].mostrar = false;
            }
        }

        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('login');

        });



}])
