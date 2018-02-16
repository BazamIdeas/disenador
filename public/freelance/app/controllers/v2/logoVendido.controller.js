angular.module("disenador-de-logos")

    /* Editor */

    .controller('logoVendidoController', ["arrayToJsonMetasFactory", "logoValido", "$scope", "$base64", "$filter", function (arrayToJsonMetasFactory, logoValido, $scope, $base64, $filter) {

        var bz = this;

        bz.base64 = $base64;

        bz.logo = logoValido;
        
        if(bz.logo.atributos){
             bz.logo.atributos = arrayToJsonMetasFactory(bz.logo.atributos);
        }
       

        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
