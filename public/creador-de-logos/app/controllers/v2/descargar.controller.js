angular.module("disenador-de-logos")

    /* Editor */

    .controller('descargarController', ["logoResolve", "logosService", "$state", "$scope", "$base64", function (logoResolve, logosService, $state, $scope, $base64) {

        var bz = this;
        
        bz.base64 = $base64;
        
        bz.logo = {
            id: logoResolve.id,
            logo: logoResolve.logo
        };

        if (!bz.logo.logo) {

            logosService.obtenerPorId(bz.logo.id).then(function (res) {

                bz.logo.logo = res.logo;

            }).catch(function (res) {

                $state.go("logos");

            })

        }









        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
