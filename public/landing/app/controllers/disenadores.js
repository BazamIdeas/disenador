angular.module("landing")

.controller('disenadoresController', ['clientesService', function (clientesService) {

    var bz = this;
    bz.disenadores = [];

    clientesService.listarFreelancers()
    .then(function (res) {
        bz.disenadores = res;
    })
    .catch(function () {
        
    })
    .finally(function () {
        
    })

}])
