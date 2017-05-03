angular.module("disenador-de-logos")

/* Comenzar */

.controller('comenzarController', ["categoriasService", "preferenciasService", "$mdSidenav", function (categoriasService, preferenciasService, $mdSidenav) {

    var bz = this;


    bz.datos = {

        preferencias: []
    }

    /*------ CORREGIR --------*/

    bz.cambiarMenu = function (lugar) {

        return $mdSidenav('right').toggle();
    }


    bz.categoriasPosibles = [];

    bz.preferencias = [];

    categoriasService.listaCategorias.then(function (res) {

        angular.forEach(res.data, function (valor, llave) {

            bz.categoriasPosibles.push(valor);


        })

    })

    preferenciasService.listaPreferencias.then(function (res) {

        angular.forEach(res.data, function (valor, llave) {
            valor.valor = 2;
            bz.datos.preferencias.push(valor);


        })

    })




    /*----XXX -----*/



    this.mostrar = 1;

}])