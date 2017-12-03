angular.module("disenador-de-logos")

    /* Editor */

    .controller('editorController', ['$scope', '$stateParams', '$state', 'LS', '$timeout', '$base64', '$mdSidenav', 'categoriasService', 'Socialshare', 'logosService', 'SweetAlert', '$filter', '$mdDialog', '$interval', 'clientesService', 'mockupsValue', "historicoResolve", "$rootScope", function ($scope, $stateParams, $state, LS, $timeout, $base64, $mdSidenav, categoriasService, Socialshare, logosService, SweetAlert, $filter, $mdDialog, $interval, clientesService, mockupsValue, historicoResolve, $rootScope) {

        var bz = this;


        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }

        bz.codificar = function (icono) {

            return $base64.encode(icono);

        }

        bz.borradores = false;
        bz.busquedaiconos = false;


        //////////////////////////////////////////////
        ///////////////LOCAL STORAGE//////////////////
        //////////////////////////////////////////////



        if (historicoResolve.logoModificado) { //si es un logo previamente modificado

            bz.restauracionIniciada = true;

            bz.logo = {
                icono: {
                    tipo: historicoResolve.logoModificado.tipo,
                    idElemento: historicoResolve.logoModificado.idElemento
                }
            }

        } else { //si no es logo modificado, se revisa el localStorage


            bz.datosEstadoAnterior = historicoResolve;

            bz.logo = bz.datosEstadoAnterior.logo;
            bz.logo.texto = bz.datosEstadoAnterior.texto;
            bz.logo.posicion = bz.datosEstadoAnterior.posicion;
            bz.fuentes = bz.datosEstadoAnterior.fuentes;
            bz.categoria = bz.datosEstadoAnterior.logo.icono.categorias_idCategoria;

        }

        /* *************** */

        /* MENU EDITOR */

        bz.elementosMenu = [{
            icono: 'font_download',
            nombre: 'Nombre',
            estado: 'activo'
        }, {
            icono: 'create',
            nombre: 'Slogan',
            estado: 'menu-desactivado'
        }, {
            icono: 'stars',
            nombre: 'Icono'
        }, {
            icono: 'filter',
            nombre: 'Comparaciones'
        }];

        bz.hideMenu = function () {
            l = document.querySelector('.elementos');
            l.style.display = 'none';
        }

        bz.menu = 0;
        bz.efectoClick = function (index, elemento, event) {
            if (screen.width <= 980 || document.querySelector('.elementos').style.width != 'block') {
                l = document.querySelector('.elementos');
                l.style.display = 'block';
            }

            if (event) {
                var elementosLista = document.querySelectorAll('.menu-editor .menu-link.activo');
                var elementoActual = event.currentTarget;

                for (i = 0; i < elementosLista.length; i++) {
                    elementosLista[i].classList.remove('activo');
                }
                elementoActual.classList.add('activo');
            }

            bz.menu = index;
            if (!bz.elementosMenu[index]) {
                bz.elementosMenu[index].estado = 'activo';
            } else {
                bz.elementosMenu[index].estado = false;
            }
        }

        $scope.fuente = null;
        $scope.fuentes = null;

        bz.fabEditor = false;

        bz.cambiarMenu = function (lugar) {

            return $mdSidenav('right').toggle();
        }

        bz.fondo = "blanco";

        /* CATEGORIAS EXISTENTES */

        bz.categoriasPosibles = [];
        categoriasService.listaCategorias().then(function (res) {
            angular.forEach(res, function (valor, llave) {
                bz.categoriasPosibles.push(valor);
            })
        })

        /* LOGOS */

     
        bz.gLogo = function (logo, tipoLogo, idElemento) {

   

            logosService.guardarLogo(logo, tipoLogo, idElemento).then(function (res) {

                SweetAlert.swal("Bien Hecho", "Tu logo ha sido guardado!", "success");

            })

   
        }



        /////////////////////////////////////
        //////////CAMBIO DE COLOR////////////
        /////////////////////////////////////

        bz.cambioColor = function (color, objetivo) {

            $rootScope.$broadcast("editor:color", {color: color, objetivo: objetivo});
            
        }
        
        
        /////////////////////////////////////
        //////////CAMBIO DE TEXTO////////////
        /////////////////////////////////////        
        
        bz.cambioTexto = function (texto) {
           
            $rootScope.$broadcast("editor:texto", texto);
            
        }
        
        
        /////////////////////////////////////
        /////////CAMBIO DE FUENTE////////////
        ///////////////////////////////////// 
        
        bz.cambioFuente = function (fuente) {

            $rootScope.$broadcast("editor:fuente", fuente);

        }
        
        /////////////////////////////////////
        ////////CAMBIO DE PROPIEDAS//////////
        ///////////////////////////////////// 
        
        bz.cambioPropiedad = function (propiedad) {

            $rootScope.$broadcast("editor:propiedad", propiedad);

        }
        
        /////////////////////////////////////
        /////////CAMBIO DE TAMAÑO////////////
        ///////////////////////////////////// 
        
        bz.cambioTamano = function (objetivo, accion) {

            $rootScope.$broadcast("editor:tamano", {objetivo: objetivo, accion: accion});

        }      
        
            
        
    
 
        

        /////////////////////////////////////////////////////////////////////////
        ////Disparar el guardado de un svg como copia de comparacion/////////////
        /////////////////////////////////////////////////////////////////////////

        bz.comparaciones = [];

        bz.realizarComparacion = function (valor) {
            
            bz.menu = 3;
            
            $rootScope.$broadcast("editor:comparar", true);
            
        }
        
        $scope.$on("directiva:comparar", function(evento, valor){
           
            bz.comparaciones.push(valor)
            
        })
        
        
        
        //////////////////////////////////////////
        ////////RESTAURAR COMPARACIONES///////////
        //////////////////////////////////////////

        bz.restaurarComparacion = function (comparacion) {
        
            $rootScope.$broadcast("editor:restaurar", comparacion);
            
        }
        
             
        
        /* PREVISUALIZAR */

        bz.modeloPrevisualizar = mockupsValue;

        bz.mostrarDialogo = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/views/dialogos/previsualizar.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            })
        };

        function DialogController($scope, $mdDialog, LS) {
            $scope.svgD = bz.svgFinal;
            $scope.modeloPrev = bz.modeloPrevisualizar;

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }





        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('login');

        });


    }])
