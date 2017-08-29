angular.module("disenador-de-logos")

    /* Planes*/

    .controller('planesController', ['$scope', 'planesService', 'ipService', '$rootScope', function ($scope, planesService, ipService, $rootScope) {

        var bz = this;

        bz.datos = {
            planes: [],
            filtros:{}
        }

        bz.listarPlanes = function () {
            planesService.listar().then(function (res) {
                for (i = 0; i < res.length; i++) {
                    if (res[i].isoPais == bz.datos.isoPais) {
                        bz.datos.planes.push(res[i]);
                    }
                }
            }).catch(function (res) {
                console.log(res)
            })
        }
        

        ipService.obtenerDatos().then(function (res) {
            bz.datos.isoPais = res.countryCode;

            if(bz.datos.isoPais){
                bz.listarPlanes();
            }
        })

    }])