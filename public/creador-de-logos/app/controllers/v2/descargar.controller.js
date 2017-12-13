angular.module("disenador-de-logos")

    /* Editor */

    .controller('descargarController', ["logoResolve", "logosService", "$state", "$scope", "$base64", function (logoResolve, logosService, $state, $scope, $base64) {

        var bz = this;
        
        bz.base64 = $base64;
        
        
        bz.formatos = [
            {nombre: "svg", ancho: 100},
            {nombre: "facebook", ancho: 100},
            {nombre: "whatsapp", ancho: 100},
            {nombre: "instagram", ancho: 100},
            {nombre: "google-plus", ancho: 100},
            {nombre: "youtube", ancho: 100},
            {nombre: "skype", ancho: 100},
            {nombre: "twitter", ancho: 100},
            {nombre: "behance", ancho: 100},
            {nombre: "blogger", ancho: 100},
            {nombre: "deviantart", ancho: 100},
            {nombre: "dribbble", ancho: 100},
            {nombre: "flickr", ancho: 100},
            {nombre: "linkedin", ancho: 100},
            {nombre: "pinterest", ancho: 100},
            {nombre: "telegram", ancho: 100},
            {nombre: "tumblr", ancho: 100},
            {nombre: "viber", ancho: 100},
            {nombre: "vimeo", ancho: 100}
        ]     
        
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
