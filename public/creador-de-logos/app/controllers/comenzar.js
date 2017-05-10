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

    /* SELECT FUNCTION */

    bz.iconos = [{
        tipo: 'ICONO',
        descripcion: 'Una forma facil de recordar en el centro de su logo.'
    }, {
        tipo: 'NOMBRE',
        descripcion: 'Un logo con gran impacto compuestos por su tipografía o texto y una imagen o símbolo.'
    }, {
        tipo: 'INICIAL',
        descripcion: 'Una letra como el elemento principal de su logo.'
    }]

    bz.selectA = function (index , tipo) {
        bz.datos.tipo = tipo; 
    }

    /*----XXX -----*/



    this.mostrar = 1;

}])
