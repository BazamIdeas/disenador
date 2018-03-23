angular.module("landing")

    .controller("headerController", ["navegarFactory", function (navegarFactory) {

        var bz = this;

        bz.navegar = navegarFactory;



    }]);