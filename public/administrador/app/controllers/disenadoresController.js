angular.module("administrador")

    .controller('disenadoresController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'administrarService', 'paisesValue', 'monedasValue', 'notificacionService', 'monedasService', function ($state, $mdSidenav, $mdMenu, $scope, administrarService, paisesValue, monedasValue, notificacionService, monedasService) {

        var bz = this;

        /* DATOS */
        bz.logosAprobados = [];
        bz.logosAprobar = [];
        bz.disenadores = {};
        bz.vista = 0;
        bz.monedas = monedasValue;
        bz.paises = paisesValue;
        bz.monedasDisponibles = {};

        monedasService.listarMonedas().then(function (res) {
            bz.monedas = res.data;
        })

        /***************************/
        /**********LOGOS***********/
        /***************************/

        bz.logos = function (v) {
            if(v){
                administrarService.logosAprobar().then(function (res) {

                }).catch(function (res) {
                    notificacionService.mensaje(res.data.msg);
                })
            }else{
                administrarService.logosAprobados().then(function (res) {

                }).catch(function (res) {
                    notificacionService.mensaje(res.data.msg);
                })
            }  
        }

        bz.modFun = function(i){
            bz.modfire = i;
            bz.modInit = !bz.modInit;
        }

    }])