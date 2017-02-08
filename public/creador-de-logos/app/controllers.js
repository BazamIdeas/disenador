angular.module("disenador-de-logos")

.controller('comenzarController', [function () {

    this.datos = {}

    this.mostrar = 1;

    this.categoriasPosibles = ['Primera', 'Segunda', 'Tercera'];


}])

.controller('opcionesController', [function() {
      
    this.estado = false;
    
    this.modoSeleccionado = 'md-scale';
      
}]);
