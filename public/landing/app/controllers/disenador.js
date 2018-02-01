angular.module("landing")

.controller('disenadoresController', ['clientesService', function (clientesService) {

    var bz = this;
    bz.disenadores = [];

    bz.verificarBase64 = function (cadena) {
        
        return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(cadena);
    }

}])
