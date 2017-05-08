angular.module("disenador-de-logos")

/* header */

.controller('headerController', ["$state", 'Auth', function ($state, Auth) {

    var bz = this;

    bz.autorizado = Auth.$getAuth();

    Auth.$onAuthStateChanged(function (firebaseUser) {
        bz.autorizado = firebaseUser;
    });


}])
