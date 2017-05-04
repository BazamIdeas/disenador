angular.module("disenador-de-logos")


/* Cliente */

.controller('clienteController', ['$scope', '$mdDialog', "$stateParams", 'currentAuth', 'logosService', '$state', 'LS', function ($scope, $mdDialog, $stateParams, currentAuth, logosService, $state, LS) {

    var bz = this;

    /* LOCAL STORAGE */

    this.definirInfo = function (llave, datos) {
        return LS.definir(llave, datos);
    }

    if ($stateParams) {
        this.definirInfo($state.current.name, $stateParams);
        this.datosEstadoAnterior = $stateParams;

    } else if (LS.obtener($state.current.name)) {

        this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
    } else {
        $state.go('opciones');
    }

    /* *************** */

    this.datos = [];
    this.estado = false;

    /* EFECTO HOVER */
    
    this.datos ={indice: '', estado: ''};

    this.efectoHover = function (indice, valor) {

        if (!this.datos[indice]) {

            this.datos.indice[indice] = valor;
            this.datos.estado = true;

        } else {

            delete this.datos.indice[indice];
            this.datos.estado = false;
        }

    }
    
    /* LISTAR LOGOS */
    
    
    bz.lGuardados;
    bz.lDescargados;
    
    bz.mostrarG = function (id) {
        logosService.mostrarGuardados(id).then(function(res){
            bz.lGuardados = res.data;
        }).catch(function(res){
            
        })
    }

    bz.mostrarD = function (id) {
        logosService.mostrarDescargables(id).then(function(res){
            bz.lDescargados = res.data;
        }).catch(function(res){
            
        })
    }
     
    bz.mostrarD(1);
    bz.mostrarG(1);



}])
