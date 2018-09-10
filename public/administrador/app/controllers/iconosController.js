angular.module("administrador")

    .controller("iconosController", ["$state", "$scope", "clientesService", "$rootScope", "inconsSearchByTag", "$base64", function ($state, $scope, clientesService, $rootScope, inconsSearchByTag, $base64) {

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

        bz.solicitarElementosMONGO = function () {

            if (bz.findingMONGO) {
                return;
            }

            if(!bz.etiquetasSeleccionadasMongo.length) return;

            bz.findingMONGO = true;

            var tags = [bz.etiquetasSeleccionadasMongo[0].traducciones[0].valor];

            inconsSearchByTag.listarIconosMONGO(tags, bz.idsExcluidosMONGO).then(function (res) {
                if (res.iconos.length) {
                    bz.iconosMONGO = res.iconos;
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
               
                if(ele.seleccionado){
                    var iconToImport = {
                        svg : $base64.decode(ele.svg),
                        idNoun: ele.idElemento
                    };
    
                    bz.nounIcons.push(iconToImport);
                }

            });

            var idTag = bz.etiquetasSeleccionadas[0]._id;

            //return console.log(idTag, bz.nounIcons);

            inconsSearchByTag.importar(idTag, bz.nounIcons).then(function(res){
                console.log(res)
            }).finally(function(){
                bz.peticion = false;
            });
        };

    }]);