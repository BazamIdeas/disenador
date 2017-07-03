angular.module("disenador-de-logos")

/* Administras logo */

.controller('administrarController', ['$scope', '$stateParams', '$state', 'LS', '$base64', 'logosService', '$window', function ($scope, $stateParams, $state, LS, $base64, logosService, $window) {

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

    if ($stateParams.datos) {
        this.definirInfo($state.current.name, $stateParams.datos);
        this.datosEstadoAnterior = $stateParams.datos;

    } else if (LS.obtener($state.current.name)) {

        this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
    } else {
        $state.go('dashboard');
    }

    bz.info = this.datosEstadoAnterior;


    bz.medidas = [{
        ancho: 300
    }, {
        ancho: 400
    }, {
        ancho: 500
    }];

    this.elementos = [];

    /* EFECTO HOVER */

    this.efectoHover = function (indice, valor) {
        if (!this.elementos[indice]) {
            this.elementos[indice] = valor;
            this.medidas[indice].mostrar = true;
        } else {
            delete this.elementos[indice];
            this.medidas[indice].mostrar = false;
        }
    }

    bz.descargarL = function (indice, idLogo, ancho) {
        
        bz.medidas[indice].progreso = true;

        logosService.descargarLogo(idLogo, ancho).then(function (res) {

            bz.url = res.data.svg;
            bz.url = bz.url.replace('public/', '');
            bz.medidas[indice].url = 'http://' + location.host + '/' + bz.url;

            if (bz.medidas[indice].url) {
                bz.medidas[indice].progreso = false;
                bz.medidas[indice].estado = true;

                var logo = document.getElementById('logoD' + indice);

                var link = document.createElement('a');

                link.setAttribute('download', bz.url);
                link.setAttribute('href', bz.medidas[indice].url);
                link.innerHTML = 'Descargar';

                logo.appendChild(link);
            }

            // $window.location.href = bz.url;
            // $window.open(bz.url, "_blank");

        }).catch(function (res) {
            console.log(res);
        })
    }



}])
