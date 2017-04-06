angular.module("administrador")

/* header */

.controller('headerController', ["$state", "$mdSidenav", "$mdDialog", function ($state, $mdSidenav, $mdMenu) {

    var bz = this;
    
    

}])

.controller('sidenavController', ["$state", "$mdSidenav", "$mdDialog", function ($state, $mdSidenav, $mdDialog) {

    var bz = this;

    bz.cambiarMenu = function (lugar) {

        return $mdSidenav('left').toggle();
    }

}])

.controller('dashboardController', ["$state", "$mdSidenav", function ($state, $mdSidenav) {

    var bz = this;

}])
