angular.module("disenador-de-logos")

/* Comenzar */

.controller('comenzarController', ["categoriasService", "preferenciasService", "$mdSidenav", '$stateParams', function (categoriasService, preferenciasService, $mdSidenav, $stateParams) {

    var bz = this;

    bz.datos = {

        preferencias: []
    }
    
    bz.datos.nombre = $stateParams.nombreLogo;

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

    bz.iconos = [ {
        tipo: 'ICONO Y NOMBRE',
        descripcion: 'Un logo con gran impacto compuestos por su tipografía o texto y una imagen o símbolo.',
        enviar:'ICONO'
    },{
        tipo: 'TIPOGRAFICO',
        descripcion: 'Una forma facil de recordar en el centro de su logo.',
        enviar:'TIPOGRAFICO'
    }, {
        tipo: 'INICIAL Y NOMBRE',
        descripcion: 'Una letra como el elemento principal de su logo.',
        enviar:'INICIAL'
    }]

    bz.selectA = function (index , tipo) {
        bz.datos.tipo = tipo; 
    }

    /*----XXX -----*/



    this.mostrar = 1;

}])
