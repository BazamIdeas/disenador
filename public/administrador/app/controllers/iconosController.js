angular.module("administrador")

    .controller("iconosController", ["$state", "$scope", "clientesService", "$rootScope", "inconsSearchByTag", function ($state, $scope, clientesService, $rootScope, inconsSearchByTag) {

        var bz = this;

        /* Etiquetas */

        bz.selectedItem = null;
        bz.searchText = null;
        bz.etiquetasFunciones = inconsSearchByTag;
        bz.datos = { etiquetasSeleccionadas: [] };
        
        bz.solicitarElementos = function(){

        };

        /**
         * Solicitar elementos
         */

        bz.completado = true;
        bz.idsExcluidos = [];

        var tags_saltos = {};
        

        bz.solicitarElementosNoun = function () {

            if (!bz.completado) {
                return;
            }

            bz.completado = false;

            angular.forEach(tags_saltos, function (tag_salto, indexSalto) {

                var remover_tag = true;

                angular.forEach(bz.datos.etiquetasSeleccionadas, function (tag) {

                    if (indexSalto == tag.traducciones[0].valor) {
                        remover_tag = false;
                    }

                });

                if (remover_tag) {
                    delete tags_saltos[indexSalto];
                }

            });

            angular.forEach(bz.datos.etiquetasSeleccionadas, function (tag) {

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
                        bz.idsExcluidos.push(ele.idLogo);
                        bz.iconos.unshift(ele);
                    });
                }
            }).catch(function () {
                //console.log(res)
            }).finally(function () {
                bz.completado = true;
            });

        };

    }]);