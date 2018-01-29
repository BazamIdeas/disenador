angular.module("landing")

/* header */


.controller('terminosController', ['$window', function ($window) {

    var bz = this;

    bz.enviarComenzar = function (nombreLogo) {

        bz.url = 'http://' + location.host + '/creador-de-logos#!/comenzar/?n=' + nombreLogo;

        $window.location.href = bz.url;
        // $window.open(bz.url, "_blank");
    }

}])
