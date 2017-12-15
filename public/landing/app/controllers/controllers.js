angular.module("landing")

/* header */

.controller('headerController', ["$state", '$mdPanel', 'SweetAlert', function ($state, $mdPanel, SweetAlert) {


}])

.controller('comienzoController', ["$state", '$mdPanel', 'SweetAlert', '$stateParams', '$window', function ($state, $mdPanel, SweetAlert, $stateParams, $window) {

    var bz = this;

    bz.enviarComenzar = function (nombreLogo) {

        bz.url = 'http://' + location.host + '/creador-de-logos#!/comenzar/?n=' + nombreLogo;

        $window.location.href = bz.url;
        // $window.open(bz.url, "_blank");
    }

}])
