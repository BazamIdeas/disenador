angular.module("disenador-de-logos")
    .controller("papeleriaController", ["$base64", "$scope", "$stateParams", function ($base64, $scope, $stateParams) {

        var bz = this;

        bz.base64 = $base64;

        if ($stateParams.id){
            bz.idLogo = $stateParams.id;
        }

        bz.categoriasModelos = [{
            nombre: 'folletos'
        }, {
            nombre: 'cartas'
        }, {
            nombre: 'dipticos'
        }]

        bz.modelos = [{
            img: '/assets/images/mockups/sobre.jpg',
            nombre: 'Prueba'
        }, {
            img: '/assets/images/mockups/sobre.jpg',
            nombre: 'Prueba'
        }, {
            img: '/assets/images/mockups/sobre.jpg',
            nombre: 'Prueba'
            }, {
                img: '/assets/images/mockups/sobre.jpg',
                nombre: 'Prueba'
            }, {
                img: '/assets/images/mockups/sobre.jpg',
                nombre: 'Prueba'
            }, {
                img: '/assets/images/mockups/sobre.jpg',
                nombre: 'Prueba'
            }, {
                img: '/assets/images/mockups/sobre.jpg',
                nombre: 'Prueba'
            }, {
                img: '/assets/images/mockups/sobre.jpg',
                nombre: 'Prueba'
            }, {
                img: '/assets/images/mockups/sobre.jpg',
                nombre: 'Prueba'
            }]

    }]);