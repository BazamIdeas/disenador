angular.module('administrador')

    .controller('iconosController', ['$state', '$scope', 'clientesService', '$rootScope', 'inconsSearchByTag', '$base64', 'etiquetasService', 'notificacionService', function ($state, $scope, clientesService, $rootScope, inconsSearchByTag, $base64, etiquetasService, notificacionService) {

        var bz = this;
        bz.base64 = $base64;

        /* Etiquetas */

        bz.selectedItem = null;
        bz.searchText = null;
        bz.etiquetasFunciones = inconsSearchByTag;
        bz.etiquetasSeleccionadas = [];
        bz.etiquetasSeleccionadasMongo = [];

        /**
         * Solicitar elementos NOUN
         */

        bz.completado = true;
        bz.idsExcluidos = [];
        bz.nounIcons = [];

        var tags_saltos = {};
        

        bz.solicitarElementosNoun = function () {

            if (bz.findingNOUN) {
                return;
            }

            if(!bz.etiquetasSeleccionadas.length) return;

            bz.findingNOUN = true;

            angular.forEach(tags_saltos, function (tag_salto, indexSalto) {

                var remover_tag = true;

                angular.forEach(bz.etiquetasSeleccionadas, function (tag) {

                    if (indexSalto == tag.traducciones[0].valor) {
                        remover_tag = false;
                    }

                });

                if (remover_tag) {
                    delete tags_saltos[indexSalto];
                }

            });

            angular.forEach(bz.etiquetasSeleccionadas, function (tag) {

                var tag_existe = tags_saltos[tag.traducciones[0].valor];

                if (tag_existe === undefined) {
                    tags_saltos[tag.traducciones[0].valor] = 0;
                }

            });

            inconsSearchByTag.listarIconosSegunTags(tags_saltos).then(function (res) {
                if (res.iconos.length) {
                    tags_saltos = res.tags;
                    bz.iconos = [];

                    res.iconos.forEach(function (ele) {
                        bz.idsExcluidos.push(ele.idElemento);
                        bz.iconos.unshift(ele);
                        
                    });
                }
            }).catch(function () {
                //console.log(res)
            }).finally(function () {
                bz.findingNOUN = false;
            });

        };

        
        /**
         * Solicitar elementos MONGO
         */

        bz.iconosMONGO = [];
        bz.BusquedaAnterior = '';

        bz.solicitarElementosMONGO = function () {

            if (!bz.etiquetasSeleccionadasMongo.length) return;
            
            bz.busquedaActual = bz.etiquetasSeleccionadasMongo[0].traducciones[0].valor;

            if (bz.busquedaActual  != bz.BusquedaAnterior ){
                bz.iconosMONGO = [];
            }

            bz.BusquedaAnterior =  bz.busquedaActual;

            if (bz.findingMONGO) {
                return;
            }

            if(!bz.etiquetasSeleccionadasMongo.length) return;

            bz.findingMONGO = true;

            var tags = [bz.BusquedaAnterior];

            inconsSearchByTag.listarIconosMONGO(tags, bz.idsExcluidosMONGO).then(function (res) {
                if (res.iconos.length) {

                    angular.forEach(res.iconos, function(element) {
                        element.seleccionado = false;
                        bz.iconosMONGO.unshift(element);
                    });
                    
                    bz.idsExcluidosMONGO = res.idsIconos;
                }
            }).catch(function () {
                //console.log(res)
            }).finally(function () {
                bz.findingMONGO = false;
            });

        };

        bz.importar = function(){

            if (bz.peticion) {
                return;
            }

            bz.nounIcons = [];

            bz.peticion = true;

            bz.iconos.forEach(function (ele) {
               
                if(ele.seleccionado != undefined && ele.seleccionado){

                    var agregar = true;

                    for (var i = 0; i < bz.idsExcluidosMONGO.length; i++) {
                        var element = bz.idsExcluidosMONGO[i];
                        
                        if (element == ele.idElemento){
                            agregar = false;
                        }
                    }

                    if(agregar) {
                        var iconToImport = {
                            svg : ele.svg,
                            idNoun: parseInt(ele.idElemento)
                        };
        
                        bz.nounIcons.push(iconToImport);
                    }

                    ele.seleccionado = false;

                }

            });

            var idTag = bz.etiquetasSeleccionadasMongo[0]._id;

            //return console.log(idTag, bz.nounIcons);

            inconsSearchByTag.importar(idTag, bz.nounIcons).then(function(res){
                if(res.insertedCount > 0){
                    angular.forEach(bz.nounIcons, function(ele){
                        bz.iconosMONGO.unshift({idNoun: ele.idNoun,svg:ele.svg});
                        bz.idsExcluidosMONGO.push(ele.idNoun);
                    });
                    return notificacionService.mensaje('Iconos agregados');
                }
            }).catch(function(res){
                if (res == 'svg too large'){
                    bz.iconos = [];

                    return notificacionService.mensaje('Svg demasiado pesado');
                }
            }).finally(function(){
                bz.peticion = false;
            });
        };

        bz.desvincularIconos = function(){

            var desvincularIcons = [];

			angular.forEach(bz.iconosMONGO, function(valor,key) {

				if (valor.seleccionado != undefined && valor.seleccionado == true) {
                    desvincularIcons.push(valor.idNoun);
                    bz.iconosMONGO.splice(key, 1);
                    valor.seleccionado = false;
                }
                
            });
            
			if (desvincularIcons.length == 0) return notificacionService.mensaje('Seleccione algun icono por favor');

            var datos = {
                _id: bz.etiquetasSeleccionadasMongo[0]._id,
                idIcono: desvincularIcons
            };

            etiquetasService.desvincularIconos(datos).then(function(res){

                if (res == undefined) return notificacionService.mensaje('No se ha podido desvincular los iconos.');
                
				return notificacionService.mensaje('Iconos desvinculados');
            });
        };

        bz.limpiarBusqueda = function(option){
            if (option == 'mgo'){
                bz.etiquetasSeleccionadasMongo = [];
                bz.iconosMONGO = [];
            }else{
                bz.etiquetasSeleccionadas = [];
                bz.iconos = [];
            }
        }

    }]);